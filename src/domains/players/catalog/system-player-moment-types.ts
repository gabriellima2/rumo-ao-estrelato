import type { PlayerMomentTypeDTO } from '../dtos/player-moment-types-dto'

export const SYSTEM_PLAYER_MOMENT_TYPES: Array<PlayerMomentTypeDTO> = [
	{
		id: 'system-trophy',
		name: 'Troféu',
		icon: 'Trophy',
		color: '#2563EB',
		isSystem: true,
	},
	{
		id: 'system-goal',
		name: 'Gol',
		icon: 'CircleDot',
		color: '#16A34A',
		isSystem: true,
	},
	{
		id: 'system-debut',
		name: 'Estreia',
		icon: 'Star',
		color: '#D97706',
		isSystem: true,
	},
	{
		id: 'system-injury',
		name: 'Lesão',
		icon: 'HeartPulse',
		color: '#DC2626',
		isSystem: true,
	},
	{
		id: 'system-contract',
		name: 'Contrato',
		icon: 'FileSignature',
		color: '#7C3AED',
		isSystem: true,
	},
]
