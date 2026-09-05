-- Internal helpers live in a schema not exposed to the PostgREST API.
CREATE SCHEMA private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO authenticated;

CREATE OR REPLACE FUNCTION private.get_sequential_season_number(p_player_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql STABLE SECURITY INVOKER SET search_path = public AS $$
DECLARE
  v_season_number INTEGER;
  v_expected INTEGER := 1;
BEGIN
  FOR v_season_number IN
    SELECT DISTINCT season_number
    FROM public.player_seasons
    WHERE player_id = p_player_id
    ORDER BY season_number
  LOOP
    IF v_season_number = v_expected THEN
      v_expected := v_expected + 1;
    ELSIF v_season_number > v_expected THEN
      EXIT;
    END IF;
  END LOOP;

  RETURN v_expected;
END;
$$;

CREATE OR REPLACE FUNCTION private.assert_authenticated()
RETURNS UUID
LANGUAGE plpgsql STABLE SECURITY INVOKER SET search_path = public AS $$
DECLARE
  v_user_id UUID := (SELECT auth.uid());
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  RETURN v_user_id;
END;
$$;

CREATE OR REPLACE FUNCTION private.assert_player_owned(p_player_id UUID)
RETURNS VOID
LANGUAGE plpgsql STABLE SECURITY INVOKER SET search_path = public AS $$
BEGIN
  PERFORM private.assert_authenticated();

  IF NOT public.player_belongs_to_user(p_player_id) THEN
    RAISE EXCEPTION 'Player not found';
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION private.validate_season_stats_json(p_stats JSONB)
RETURNS VOID
LANGUAGE plpgsql IMMUTABLE SET search_path = public AS $$
BEGIN
  IF p_stats IS NULL OR jsonb_typeof(p_stats) <> 'object' THEN
    RAISE EXCEPTION 'Stats payload must be a JSON object';
  END IF;

  IF NOT (
    p_stats ?& ARRAY[
      'appearances',
      'goals',
      'assists',
      'cleanSheets',
      'yellowCards',
      'redCards',
      'averageRating'
    ]
  ) THEN
    RAISE EXCEPTION 'Stats payload is missing required fields';
  END IF;

  IF (p_stats->>'appearances')::INTEGER < 0
    OR (p_stats->>'goals')::INTEGER < 0
    OR (p_stats->>'assists')::INTEGER < 0
    OR (p_stats->>'cleanSheets')::INTEGER < 0
    OR (p_stats->>'yellowCards')::INTEGER < 0
    OR (p_stats->>'redCards')::INTEGER < 0
  THEN
    RAISE EXCEPTION 'Stats values cannot be negative';
  END IF;

  IF (p_stats->>'averageRating')::NUMERIC(3,1) NOT BETWEEN 0 AND 10 THEN
    RAISE EXCEPTION 'Average rating must be between 0 and 10';
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION private.insert_season_stats(
  p_player_id UUID,
  p_player_season_id UUID,
  p_player_club_id UUID,
  p_stats JSONB
)
RETURNS VOID
LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
BEGIN
  PERFORM private.assert_player_owned(p_player_id);

  IF NOT EXISTS (
    SELECT 1 FROM public.player_seasons
    WHERE id = p_player_season_id AND player_id = p_player_id
  ) THEN
    RAISE EXCEPTION 'Invalid season for player';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.player_clubs
    WHERE id = p_player_club_id AND player_id = p_player_id
  ) THEN
    RAISE EXCEPTION 'Invalid club for player';
  END IF;

  PERFORM private.validate_season_stats_json(p_stats);

  INSERT INTO public.player_season_stats (
    player_id,
    player_season_id,
    player_club_id,
    appearances,
    goals,
    assists,
    clean_sheets,
    yellow_cards,
    red_cards,
    average_rating
  ) VALUES (
    p_player_id,
    p_player_season_id,
    p_player_club_id,
    (p_stats->>'appearances')::INTEGER,
    (p_stats->>'goals')::INTEGER,
    (p_stats->>'assists')::INTEGER,
    (p_stats->>'cleanSheets')::INTEGER,
    (p_stats->>'yellowCards')::INTEGER,
    (p_stats->>'redCards')::INTEGER,
    (p_stats->>'averageRating')::NUMERIC(3,1)
  );
END;
$$;

CREATE OR REPLACE FUNCTION private.insert_season_achievements(
  p_player_id UUID,
  p_player_season_id UUID,
  p_player_club_id UUID,
  p_achievements JSONB
)
RETURNS VOID
LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
DECLARE
  v_achievement JSONB;
  v_name TEXT;
  v_achievement_type public.achievement_type;
  v_competition_type public.competition_type;
BEGIN
  PERFORM private.assert_player_owned(p_player_id);

  IF NOT EXISTS (
    SELECT 1 FROM public.player_seasons
    WHERE id = p_player_season_id AND player_id = p_player_id
  ) THEN
    RAISE EXCEPTION 'Invalid season for player';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.player_clubs
    WHERE id = p_player_club_id AND player_id = p_player_id
  ) THEN
    RAISE EXCEPTION 'Invalid club for player';
  END IF;

  IF p_achievements IS NULL OR jsonb_typeof(p_achievements) <> 'array' THEN
    RAISE EXCEPTION 'Achievements payload must be a JSON array';
  END IF;

  IF jsonb_array_length(p_achievements) > 50 THEN
    RAISE EXCEPTION 'Achievements payload exceeds maximum of 50 items';
  END IF;

  FOR v_achievement IN SELECT value FROM jsonb_array_elements(p_achievements)
  LOOP
    v_name := trim(v_achievement->>'name');

    IF v_name IS NULL OR char_length(v_name) < 1 OR char_length(v_name) > 120 THEN
      RAISE EXCEPTION 'Achievement name must be between 1 and 120 characters';
    END IF;

    IF v_achievement->>'achievementType' IS NULL THEN
      RAISE EXCEPTION 'Achievement type is required';
    END IF;

    v_achievement_type := (v_achievement->>'achievementType')::public.achievement_type;

    IF v_achievement_type = 'competition' THEN
      IF v_achievement->>'competitionType' IS NULL THEN
        RAISE EXCEPTION 'Competition type is required for competition achievements';
      END IF;

      v_competition_type := (v_achievement->>'competitionType')::public.competition_type;
    ELSE
      IF v_achievement->>'competitionType' IS NOT NULL THEN
        RAISE EXCEPTION 'Competition type must be omitted for individual awards';
      END IF;

      v_competition_type := NULL;
    END IF;

    INSERT INTO public.player_achievements (
      player_id,
      player_season_id,
      player_club_id,
      name,
      achievement_type,
      competition_type
    ) VALUES (
      p_player_id,
      p_player_season_id,
      p_player_club_id,
      v_name,
      v_achievement_type,
      v_competition_type
    );
  END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION private.get_system_moment_type_id(p_slug TEXT)
RETURNS UUID
LANGUAGE plpgsql STABLE SECURITY INVOKER SET search_path = public AS $$
DECLARE
  v_type_id UUID;
BEGIN
  SELECT id INTO v_type_id
  FROM public.player_moment_types
  WHERE is_system = true AND slug = p_slug;

  IF v_type_id IS NULL THEN
    RAISE EXCEPTION 'System moment type "%" not found', p_slug;
  END IF;

  RETURN v_type_id;
END;
$$;

-- Public RPCs: SECURITY INVOKER so RLS remains the primary safety net.
CREATE OR REPLACE FUNCTION public.create_player_career(
  p_first_name  TEXT,
  p_last_name   TEXT,
  p_gender      public.gender,
  p_country_id  UUID,
  p_position    public.player_position,
  p_club_name   TEXT
)
RETURNS TABLE (player_id UUID, club_id UUID, season_id UUID)
LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
DECLARE
  v_user_id UUID;
  v_player_id UUID;
  v_club_id UUID;
  v_season_id UUID;
BEGIN
  v_user_id := private.assert_authenticated();

  IF char_length(trim(p_first_name)) < 1 OR char_length(trim(p_first_name)) > 40 THEN
    RAISE EXCEPTION 'First name must be between 1 and 40 characters';
  END IF;

  IF char_length(trim(p_last_name)) < 1 OR char_length(trim(p_last_name)) > 60 THEN
    RAISE EXCEPTION 'Last name must be between 1 and 60 characters';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.countries WHERE id = p_country_id) THEN
    RAISE EXCEPTION 'Invalid country';
  END IF;

  IF char_length(trim(p_club_name)) < 2 OR char_length(trim(p_club_name)) > 60 THEN
    RAISE EXCEPTION 'Club name must be between 2 and 60 characters';
  END IF;

  INSERT INTO public.players (user_id, country_id, first_name, last_name, gender, position)
  VALUES (
    v_user_id,
    p_country_id,
    trim(p_first_name),
    trim(p_last_name),
    p_gender,
    p_position
  )
  RETURNING id INTO v_player_id;

  INSERT INTO public.player_clubs (player_id, name)
  VALUES (v_player_id, trim(p_club_name))
  RETURNING id INTO v_club_id;

  INSERT INTO public.player_seasons (player_id, player_club_id, title, season_number, stint_index, is_current)
  VALUES (v_player_id, v_club_id, 'Temporada 1', 1, 1, true)
  RETURNING id INTO v_season_id;

  RETURN QUERY SELECT v_player_id, v_club_id, v_season_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.finalize_season(
  p_season_id       UUID,
  p_stats           JSONB,
  p_achievements    JSONB,
  p_stayed_at_club  BOOLEAN,
  p_new_club_name   TEXT DEFAULT NULL
)
RETURNS TABLE (new_season_id UUID)
LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
DECLARE
  v_season public.player_seasons%ROWTYPE;
  v_player_club_id UUID;
  v_new_club_id UUID;
  v_new_season_id UUID;
  v_next_season_number INTEGER;
BEGIN
  PERFORM private.assert_authenticated();

  SELECT * INTO v_season
  FROM public.player_seasons
  WHERE id = p_season_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Season not found';
  END IF;

  PERFORM private.assert_player_owned(v_season.player_id);

  IF NOT v_season.is_current THEN
    RAISE EXCEPTION 'Season is already finalized';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.player_season_stats
    WHERE player_season_id = p_season_id
  ) THEN
    RAISE EXCEPTION 'Season stats already recorded';
  END IF;

  IF p_stayed_at_club THEN
    IF p_new_club_name IS NOT NULL AND char_length(trim(p_new_club_name)) > 0 THEN
      RAISE EXCEPTION 'New club name must not be provided when staying at the current club';
    END IF;
  ELSIF p_new_club_name IS NULL OR char_length(trim(p_new_club_name)) < 2 OR char_length(trim(p_new_club_name)) > 60 THEN
    RAISE EXCEPTION 'New club name must be between 2 and 60 characters when leaving the current club';
  END IF;

  v_player_club_id := v_season.player_club_id;

  IF NOT p_stayed_at_club THEN
    INSERT INTO public.player_clubs (player_id, name)
    VALUES (v_season.player_id, trim(p_new_club_name))
    RETURNING id INTO v_new_club_id;

    v_player_club_id := v_new_club_id;
  END IF;

  PERFORM private.insert_season_stats(
    v_season.player_id,
    v_season.id,
    v_season.player_club_id,
    p_stats
  );

  PERFORM private.insert_season_achievements(
    v_season.player_id,
    v_season.id,
    v_season.player_club_id,
    p_achievements
  );

  UPDATE public.player_seasons
  SET is_current = false
  WHERE id = p_season_id;

  v_next_season_number := private.get_sequential_season_number(v_season.player_id);

  INSERT INTO public.player_seasons (
    player_id, player_club_id, title, season_number, stint_index, is_current
  ) VALUES (
    v_season.player_id,
    v_player_club_id,
    'Temporada ' || v_next_season_number,
    v_next_season_number,
    1,
    true
  )
  RETURNING id INTO v_new_season_id;

  RETURN QUERY SELECT v_new_season_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.transfer_season(
  p_season_id     UUID,
  p_stats         JSONB,
  p_achievements  JSONB,
  p_new_club_name TEXT
)
RETURNS TABLE (new_season_id UUID)
LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
DECLARE
  v_season public.player_seasons%ROWTYPE;
  v_new_club_id UUID;
  v_new_season_id UUID;
  v_next_stint_index INTEGER;
  v_transfer_type_id UUID;
BEGIN
  PERFORM private.assert_authenticated();

  IF p_new_club_name IS NULL OR char_length(trim(p_new_club_name)) < 2 OR char_length(trim(p_new_club_name)) > 60 THEN
    RAISE EXCEPTION 'New club name must be between 2 and 60 characters';
  END IF;

  SELECT * INTO v_season
  FROM public.player_seasons
  WHERE id = p_season_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Season not found';
  END IF;

  PERFORM private.assert_player_owned(v_season.player_id);

  IF NOT v_season.is_current THEN
    RAISE EXCEPTION 'Season cannot be transferred';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.player_season_stats
    WHERE player_season_id = p_season_id
  ) THEN
    RAISE EXCEPTION 'Season stats already recorded';
  END IF;

  SELECT COALESCE(MAX(stint_index), 0) + 1 INTO v_next_stint_index
  FROM public.player_seasons
  WHERE player_id = v_season.player_id
    AND season_number = v_season.season_number;

  PERFORM private.insert_season_stats(
    v_season.player_id,
    v_season.id,
    v_season.player_club_id,
    p_stats
  );

  PERFORM private.insert_season_achievements(
    v_season.player_id,
    v_season.id,
    v_season.player_club_id,
    p_achievements
  );

  INSERT INTO public.player_clubs (player_id, name)
  VALUES (v_season.player_id, trim(p_new_club_name))
  RETURNING id INTO v_new_club_id;

  UPDATE public.player_seasons
  SET is_current = false
  WHERE id = p_season_id;

  INSERT INTO public.player_seasons (
    player_id, player_club_id, title, season_number, stint_index, is_current
  ) VALUES (
    v_season.player_id,
    v_new_club_id,
    v_season.title,
    v_season.season_number,
    v_next_stint_index,
    true
  )
  RETURNING id INTO v_new_season_id;

  v_transfer_type_id := private.get_system_moment_type_id('transfer');

  INSERT INTO public.player_moments (
    player_id, player_season_id, player_moment_type_id, title
  ) VALUES (
    v_season.player_id,
    v_new_season_id,
    v_transfer_type_id,
    'Transferência para ' || trim(p_new_club_name)
  );

  RETURN QUERY SELECT v_new_season_id;
END;
$$;

-- Allow authenticated users to call private helpers from public RPCs (not exposed via API).
ALTER DEFAULT PRIVILEGES IN SCHEMA private REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA private TO authenticated;

-- Expose only user-facing RPCs via the Supabase API.
REVOKE ALL ON FUNCTION public.create_player_career(TEXT, TEXT, public.gender, UUID, public.player_position, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.finalize_season(UUID, JSONB, JSONB, BOOLEAN, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.transfer_season(UUID, JSONB, JSONB, TEXT) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.create_player_career(TEXT, TEXT, public.gender, UUID, public.player_position, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.finalize_season(UUID, JSONB, JSONB, BOOLEAN, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.transfer_season(UUID, JSONB, JSONB, TEXT) TO authenticated;
