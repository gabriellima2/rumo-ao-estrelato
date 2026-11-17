export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export type Database = {
	public: {
		Tables: {
			countries: {
				Row: {
					id: string
					code: string
					name: string
					created_at: string
				}
				Insert: {
					id?: string
					code: string
					name: string
					created_at?: string
				}
				Update: {
					id?: string
					code?: string
					name?: string
					created_at?: string
				}
				Relationships: []
			}
			players: {
				Row: {
					id: string
					user_id: string
					country_id: string
					first_name: string
					last_name: string
					gender: Database['public']['Enums']['gender']
					position: Database['public']['Enums']['player_position']
					created_at: string
					updated_at: string
				}
				Insert: {
					id?: string
					user_id: string
					country_id: string
					first_name: string
					last_name: string
					gender: Database['public']['Enums']['gender']
					position: Database['public']['Enums']['player_position']
					created_at?: string
					updated_at?: string
				}
				Update: {
					id?: string
					user_id?: string
					country_id?: string
					first_name?: string
					last_name?: string
					gender?: Database['public']['Enums']['gender']
					position?: Database['public']['Enums']['player_position']
					created_at?: string
					updated_at?: string
				}
				Relationships: [
					{
						foreignKeyName: 'players_country_id_fkey'
						columns: ['country_id']
						isOneToOne: false
						referencedRelation: 'countries'
						referencedColumns: ['id']
					},
				]
			}
			player_clubs: {
				Row: {
					id: string
					player_id: string
					name: string
					created_at: string
				}
				Insert: {
					id?: string
					player_id: string
					name: string
					created_at?: string
				}
				Update: {
					id?: string
					player_id?: string
					name?: string
					created_at?: string
				}
				Relationships: [
					{
						foreignKeyName: 'player_clubs_player_id_fkey'
						columns: ['player_id']
						isOneToOne: false
						referencedRelation: 'players'
						referencedColumns: ['id']
					},
				]
			}
			player_seasons: {
				Row: {
					id: string
					player_id: string
					player_club_id: string
					title: string
					season_number: number
					stint_index: number
					is_current: boolean
					created_at: string
				}
				Insert: {
					id?: string
					player_id: string
					player_club_id: string
					title: string
					season_number: number
					stint_index?: number
					is_current?: boolean
					created_at?: string
				}
				Update: {
					id?: string
					player_id?: string
					player_club_id?: string
					title?: string
					season_number?: number
					stint_index?: number
					is_current?: boolean
					created_at?: string
				}
				Relationships: [
					{
						foreignKeyName: 'player_seasons_player_id_fkey'
						columns: ['player_id']
						isOneToOne: false
						referencedRelation: 'players'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'player_seasons_player_club_id_fkey'
						columns: ['player_club_id']
						isOneToOne: false
						referencedRelation: 'player_clubs'
						referencedColumns: ['id']
					},
				]
			}
			player_season_stats: {
				Row: {
					id: string
					player_id: string
					player_season_id: string
					player_club_id: string
					appearances: number
					goals: number
					assists: number
					clean_sheets: number
					yellow_cards: number
					red_cards: number
					average_rating: number
					created_at: string
				}
				Insert: {
					id?: string
					player_id: string
					player_season_id: string
					player_club_id: string
					appearances?: number
					goals?: number
					assists?: number
					clean_sheets?: number
					yellow_cards?: number
					red_cards?: number
					average_rating?: number
					created_at?: string
				}
				Update: {
					id?: string
					player_id?: string
					player_season_id?: string
					player_club_id?: string
					appearances?: number
					goals?: number
					assists?: number
					clean_sheets?: number
					yellow_cards?: number
					red_cards?: number
					average_rating?: number
					created_at?: string
				}
				Relationships: [
					{
						foreignKeyName: 'player_season_stats_player_id_fkey'
						columns: ['player_id']
						isOneToOne: false
						referencedRelation: 'players'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'player_season_stats_player_season_id_fkey'
						columns: ['player_season_id']
						isOneToOne: true
						referencedRelation: 'player_seasons'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'player_season_stats_player_club_id_fkey'
						columns: ['player_club_id']
						isOneToOne: false
						referencedRelation: 'player_clubs'
						referencedColumns: ['id']
					},
				]
			}
			player_achievements: {
				Row: {
					id: string
					player_id: string
					player_season_id: string
					player_club_id: string
					name: string
					achievement_type: Database['public']['Enums']['achievement_type']
					competition_type:
						Database['public']['Enums']['competition_type'] | null
					created_at: string
				}
				Insert: {
					id?: string
					player_id: string
					player_season_id: string
					player_club_id: string
					name: string
					achievement_type: Database['public']['Enums']['achievement_type']
					competition_type?:
						Database['public']['Enums']['competition_type'] | null
					created_at?: string
				}
				Update: {
					id?: string
					player_id?: string
					player_season_id?: string
					player_club_id?: string
					name?: string
					achievement_type?: Database['public']['Enums']['achievement_type']
					competition_type?:
						Database['public']['Enums']['competition_type'] | null
					created_at?: string
				}
				Relationships: [
					{
						foreignKeyName: 'player_achievements_player_id_fkey'
						columns: ['player_id']
						isOneToOne: false
						referencedRelation: 'players'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'player_achievements_player_season_id_fkey'
						columns: ['player_season_id']
						isOneToOne: false
						referencedRelation: 'player_seasons'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'player_achievements_player_club_id_fkey'
						columns: ['player_club_id']
						isOneToOne: false
						referencedRelation: 'player_clubs'
						referencedColumns: ['id']
					},
				]
			}
			player_moment_types: {
				Row: {
					id: string
					slug: string | null
					user_id: string | null
					name: string
					icon: string
					color: string
					is_system: boolean
					is_selectable: boolean
					created_at: string
				}
				Insert: {
					id?: string
					slug?: string | null
					user_id?: string | null
					name: string
					icon: string
					color: string
					is_system?: boolean
					is_selectable?: boolean
					created_at?: string
				}
				Update: {
					id?: string
					slug?: string | null
					user_id?: string | null
					name?: string
					icon?: string
					color?: string
					is_system?: boolean
					is_selectable?: boolean
					created_at?: string
				}
				Relationships: []
			}
			player_moments: {
				Row: {
					id: string
					player_id: string
					player_season_id: string
					player_moment_type_id: string
					title: string
					description: string | null
					created_at: string
				}
				Insert: {
					id?: string
					player_id: string
					player_season_id: string
					player_moment_type_id: string
					title: string
					description?: string | null
					created_at?: string
				}
				Update: {
					id?: string
					player_id?: string
					player_season_id?: string
					player_moment_type_id?: string
					title?: string
					description?: string | null
					created_at?: string
				}
				Relationships: [
					{
						foreignKeyName: 'player_moments_player_id_fkey'
						columns: ['player_id']
						isOneToOne: false
						referencedRelation: 'players'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'player_moments_player_season_id_fkey'
						columns: ['player_season_id']
						isOneToOne: false
						referencedRelation: 'player_seasons'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'player_moments_player_moment_type_id_fkey'
						columns: ['player_moment_type_id']
						isOneToOne: false
						referencedRelation: 'player_moment_types'
						referencedColumns: ['id']
					},
				]
			}
		}
		Views: {
			players_enriched: {
				Row: {
					id: string
					user_id: string
					country_id: string
					first_name: string
					last_name: string
					gender: Database['public']['Enums']['gender']
					position: Database['public']['Enums']['player_position']
					created_at: string
					updated_at: string
					country_code: string
					country_name: string
				}
				Relationships: []
			}
			player_seasons_enriched: {
				Row: {
					id: string
					player_id: string
					player_club_id: string
					title: string
					season_number: number
					stint_index: number
					is_current: boolean
					created_at: string
					player_club_name: string
				}
				Relationships: []
			}
			player_moments_enriched: {
				Row: {
					id: string
					player_id: string
					player_season_id: string
					player_moment_type_id: string
					title: string
					description: string | null
					created_at: string
					player_moment_type_name: string
					player_moment_type_icon: string
					player_moment_type_color: string
				}
				Relationships: []
			}
		}
		Functions: {
			create_player_career: {
				Args: {
					p_first_name: string
					p_last_name: string
					p_gender: Database['public']['Enums']['gender']
					p_country_id: string
					p_position: Database['public']['Enums']['player_position']
					p_club_name: string
				}
				Returns: {
					player_id: string
					club_id: string
					season_id: string
				}[]
			}
			finalize_season: {
				Args: {
					p_season_id: string
					p_stats: Json
					p_achievements: Json
					p_stayed_at_club: boolean
					p_new_club_name?: string
				}
				Returns: {
					new_season_id: string
				}[]
			}
			transfer_season: {
				Args: {
					p_season_id: string
					p_stats: Json
					p_achievements: Json
					p_new_club_name: string
				}
				Returns: {
					new_season_id: string
				}[]
			}
		}
		Enums: {
			gender: 'male' | 'female'
			player_position:
				| 'GK'
				| 'RB'
				| 'LB'
				| 'CB'
				| 'RWB'
				| 'LWB'
				| 'CDM'
				| 'CM'
				| 'CAM'
				| 'RM'
				| 'LM'
				| 'RW'
				| 'LW'
				| 'CF'
				| 'ST'
			achievement_type: 'competition' | 'individual_award'
			competition_type:
				| 'league'
				| 'state'
				| 'national_cup'
				| 'league_cup'
				| 'super_cup'
				| 'continental'
				| 'international'
				| 'other'
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}
