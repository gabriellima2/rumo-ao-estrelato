-- security_invoker views run as the querying role and need grants on views and base tables.
-- RLS still enforces row-level access.
GRANT USAGE ON SCHEMA public TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

GRANT SELECT ON public.players_enriched TO authenticated;
GRANT SELECT ON public.player_seasons_enriched TO authenticated;
GRANT SELECT ON public.player_moments_enriched TO authenticated;
