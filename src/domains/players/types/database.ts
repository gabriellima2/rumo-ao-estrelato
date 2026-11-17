import type { Database } from '@/integrations/supabase/database.types'

export type Country = Database['public']['Tables']['countries']['Row']
export type CountryOption = Pick<Country, 'id' | 'code' | 'name'>
export type PlayerEnriched =
	Database['public']['Views']['players_enriched']['Row']
export type PlayerClub = Database['public']['Tables']['player_clubs']['Row']
export type PlayerSeasonEnriched =
	Database['public']['Views']['player_seasons_enriched']['Row']
export type PlayerSeasonStats =
	Database['public']['Tables']['player_season_stats']['Row']
export type PlayerAchievement =
	Database['public']['Tables']['player_achievements']['Row']
export type PlayerMomentEnriched =
	Database['public']['Views']['player_moments_enriched']['Row']
export type PlayerMomentType = {
	id: string
	name: string
	icon: string
	color: string
	is_system: boolean
	is_selectable: boolean
}
