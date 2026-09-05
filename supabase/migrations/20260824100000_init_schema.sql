CREATE TYPE public.gender AS ENUM ('male', 'female');

CREATE TYPE public.player_position AS ENUM (
  'GK', 'RB', 'LB', 'CB', 'RWB', 'LWB',
  'CDM', 'CM', 'CAM', 'RM', 'LM', 'RW', 'LW', 'CF', 'ST'
);

CREATE TYPE public.achievement_type AS ENUM ('competition', 'individual_award');

CREATE TYPE public.competition_type AS ENUM (
  'league', 'state', 'national_cup', 'league_cup', 'super_cup',
  'continental', 'international', 'other'
);

CREATE TABLE public.countries (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code       CHAR(2) NOT NULL UNIQUE,
  name       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.players (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  country_id    UUID NOT NULL REFERENCES public.countries(id) ON DELETE RESTRICT,
  first_name    TEXT NOT NULL CHECK (char_length(first_name) BETWEEN 1 AND 40),
  last_name     TEXT NOT NULL CHECK (char_length(last_name) BETWEEN 1 AND 60),
  gender        public.gender NOT NULL,
  position      public.player_position NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.player_clubs (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id  UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  name       TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 60),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.player_seasons (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id      UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  player_club_id UUID NOT NULL REFERENCES public.player_clubs(id) ON DELETE RESTRICT,
  title          TEXT NOT NULL,
  season_number  INTEGER NOT NULL CHECK (season_number >= 1),
  stint_index    INTEGER NOT NULL DEFAULT 1 CHECK (stint_index >= 1),
  is_current     BOOLEAN NOT NULL DEFAULT false,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.player_season_stats (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id        UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  player_season_id UUID NOT NULL UNIQUE REFERENCES public.player_seasons(id) ON DELETE CASCADE,
  player_club_id   UUID NOT NULL REFERENCES public.player_clubs(id) ON DELETE RESTRICT,
  appearances      INTEGER NOT NULL DEFAULT 0 CHECK (appearances >= 0),
  goals            INTEGER NOT NULL DEFAULT 0 CHECK (goals >= 0),
  assists          INTEGER NOT NULL DEFAULT 0 CHECK (assists >= 0),
  clean_sheets     INTEGER NOT NULL DEFAULT 0 CHECK (clean_sheets >= 0),
  yellow_cards     INTEGER NOT NULL DEFAULT 0 CHECK (yellow_cards >= 0),
  red_cards        INTEGER NOT NULL DEFAULT 0 CHECK (red_cards >= 0),
  average_rating   NUMERIC(3,1) NOT NULL DEFAULT 0 CHECK (average_rating BETWEEN 0 AND 10),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.player_achievements (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id         UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  player_season_id  UUID NOT NULL REFERENCES public.player_seasons(id) ON DELETE CASCADE,
  player_club_id    UUID NOT NULL REFERENCES public.player_clubs(id) ON DELETE RESTRICT,
  name              TEXT NOT NULL CHECK (char_length(name) >= 1),
  achievement_type  public.achievement_type NOT NULL,
  competition_type  public.competition_type,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT competition_type_required CHECK (
    (achievement_type = 'competition' AND competition_type IS NOT NULL)
    OR (achievement_type = 'individual_award' AND competition_type IS NULL)
  )
);

CREATE TABLE public.player_moment_types (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug       TEXT UNIQUE,
  user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  icon       TEXT NOT NULL,
  color      TEXT NOT NULL,
  is_system  BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT system_or_user_owned CHECK (
    (is_system = true AND user_id IS NULL AND slug IS NOT NULL)
    OR (is_system = false AND user_id IS NOT NULL AND slug IS NULL)
  )
);

CREATE TABLE public.player_moments (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id             UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  player_season_id      UUID NOT NULL REFERENCES public.player_seasons(id) ON DELETE CASCADE,
  player_moment_type_id UUID NOT NULL REFERENCES public.player_moment_types(id),
  title                 TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 80),
  description           TEXT CHECK (description IS NULL OR char_length(description) <= 500),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX player_seasons_unique_stint
  ON public.player_seasons (player_id, season_number, stint_index);

CREATE UNIQUE INDEX player_seasons_one_current_per_logical_season
  ON public.player_seasons (player_id, season_number)
  WHERE is_current = true;

CREATE INDEX players_user_id_idx ON public.players (user_id);
CREATE INDEX players_country_id_idx ON public.players (country_id);
CREATE INDEX countries_code_idx ON public.countries (code);
CREATE INDEX player_clubs_player_id_idx ON public.player_clubs (player_id);
CREATE INDEX player_seasons_player_id_idx ON public.player_seasons (player_id);
CREATE INDEX player_moments_season_id_idx ON public.player_moments (player_season_id);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER players_updated_at
  BEFORE UPDATE ON public.players
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE VIEW public.players_enriched
WITH (security_invoker = true) AS
SELECT
  p.*,
  c.code AS country_code,
  c.name AS country_name
FROM public.players p
JOIN public.countries c ON c.id = p.country_id;

CREATE VIEW public.player_seasons_enriched
WITH (security_invoker = true) AS
SELECT
  ps.*,
  pc.name AS player_club_name
FROM public.player_seasons ps
JOIN public.player_clubs pc ON pc.id = ps.player_club_id;

CREATE VIEW public.player_moments_enriched
WITH (security_invoker = true) AS
SELECT
  pm.*,
  pmt.name  AS player_moment_type_name,
  pmt.icon  AS player_moment_type_icon,
  pmt.color AS player_moment_type_color
FROM public.player_moments pm
JOIN public.player_moment_types pmt ON pmt.id = pm.player_moment_type_id;

GRANT SELECT ON public.players_enriched TO authenticated;
GRANT SELECT ON public.player_seasons_enriched TO authenticated;
GRANT SELECT ON public.player_moments_enriched TO authenticated;

-- security_invoker views query base tables as the current role; table grants are required.
-- RLS still enforces row-level access.
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
