ALTER TABLE public.player_moment_types
  ADD COLUMN is_selectable BOOLEAN NOT NULL DEFAULT true;

UPDATE public.player_moment_types
SET is_selectable = false
WHERE slug = 'transfer';