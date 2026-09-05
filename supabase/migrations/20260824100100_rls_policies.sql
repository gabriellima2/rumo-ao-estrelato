CREATE OR REPLACE FUNCTION public.player_belongs_to_user(p_player_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.players
    WHERE id = p_player_id AND user_id = (SELECT auth.uid())
  );
$$;

REVOKE ALL ON FUNCTION public.player_belongs_to_user(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.player_belongs_to_user(UUID) TO authenticated;

ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_season_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_moment_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "countries_select_authenticated" ON public.countries
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "players_select_own" ON public.players
  FOR SELECT TO authenticated USING (user_id = (SELECT auth.uid()));

CREATE POLICY "players_insert_own" ON public.players
  FOR INSERT TO authenticated WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "players_update_own" ON public.players
  FOR UPDATE TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "players_delete_own" ON public.players
  FOR DELETE TO authenticated USING (user_id = (SELECT auth.uid()));

CREATE POLICY "player_clubs_all_own" ON public.player_clubs
  FOR ALL TO authenticated
  USING (public.player_belongs_to_user(player_id))
  WITH CHECK (public.player_belongs_to_user(player_id));

CREATE POLICY "player_seasons_all_own" ON public.player_seasons
  FOR ALL TO authenticated
  USING (public.player_belongs_to_user(player_id))
  WITH CHECK (public.player_belongs_to_user(player_id));

CREATE POLICY "player_season_stats_all_own" ON public.player_season_stats
  FOR ALL TO authenticated
  USING (public.player_belongs_to_user(player_id))
  WITH CHECK (public.player_belongs_to_user(player_id));

CREATE POLICY "player_achievements_all_own" ON public.player_achievements
  FOR ALL TO authenticated
  USING (public.player_belongs_to_user(player_id))
  WITH CHECK (public.player_belongs_to_user(player_id));

CREATE POLICY "player_moments_all_own" ON public.player_moments
  FOR ALL TO authenticated
  USING (public.player_belongs_to_user(player_id))
  WITH CHECK (public.player_belongs_to_user(player_id));

CREATE POLICY "player_moment_types_select" ON public.player_moment_types
  FOR SELECT TO authenticated
  USING (is_system = true OR user_id = (SELECT auth.uid()));

CREATE POLICY "player_moment_types_insert_own" ON public.player_moment_types
  FOR INSERT TO authenticated
  WITH CHECK (is_system = false AND user_id = (SELECT auth.uid()));

CREATE POLICY "player_moment_types_update_own" ON public.player_moment_types
  FOR UPDATE TO authenticated
  USING (is_system = false AND user_id = (SELECT auth.uid()))
  WITH CHECK (is_system = false AND user_id = (SELECT auth.uid()));

CREATE POLICY "player_moment_types_delete_own" ON public.player_moment_types
  FOR DELETE TO authenticated
  USING (is_system = false AND user_id = (SELECT auth.uid()));

-- Enforce referential consistency beyond FK checks (player_id must match related rows).
CREATE OR REPLACE FUNCTION public.enforce_player_child_consistency()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public AS $$
BEGIN
  IF TG_TABLE_NAME IN ('player_season_stats', 'player_achievements', 'player_moments') THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.player_seasons
      WHERE id = NEW.player_season_id AND player_id = NEW.player_id
    ) THEN
      RAISE EXCEPTION 'player_season_id does not belong to player_id';
    END IF;
  END IF;

  IF TG_TABLE_NAME IN ('player_season_stats', 'player_achievements') THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.player_clubs
      WHERE id = NEW.player_club_id AND player_id = NEW.player_id
    ) THEN
      RAISE EXCEPTION 'player_club_id does not belong to player_id';
    END IF;
  END IF;

  IF TG_TABLE_NAME = 'player_moments' THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.player_moment_types
      WHERE id = NEW.player_moment_type_id
        AND (is_system = true OR user_id = (SELECT auth.uid()))
    ) THEN
      RAISE EXCEPTION 'Invalid or inaccessible moment type';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER player_season_stats_consistency
  BEFORE INSERT OR UPDATE ON public.player_season_stats
  FOR EACH ROW EXECUTE FUNCTION public.enforce_player_child_consistency();

CREATE TRIGGER player_achievements_consistency
  BEFORE INSERT OR UPDATE ON public.player_achievements
  FOR EACH ROW EXECUTE FUNCTION public.enforce_player_child_consistency();

CREATE TRIGGER player_moments_consistency
  BEFORE INSERT OR UPDATE ON public.player_moments
  FOR EACH ROW EXECUTE FUNCTION public.enforce_player_child_consistency();
