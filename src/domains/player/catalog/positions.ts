export const PlayerPositions = {
	GK: 'GK',

	RB: 'RB',
	LB: 'LB',
	CB: 'CB',

	RWB: 'RWB',
	LWB: 'LWB',

	CDM: 'CDM',
	CM: 'CM',
	CAM: 'CAM',

	RM: 'RM',
	LM: 'LM',

	RW: 'RW',
	LW: 'LW',

	CF: 'CF',
	ST: 'ST',
} as const

export type PlayerPosition =
	(typeof PlayerPositions)[keyof typeof PlayerPositions]

export const PLAYER_POSITION_LABELS: Record<PlayerPosition, string> = {
	[PlayerPositions.GK]: 'Goleiro',

	[PlayerPositions.RB]: 'Lateral Direito',
	[PlayerPositions.LB]: 'Lateral Esquerdo',
	[PlayerPositions.CB]: 'Zagueiro',

	[PlayerPositions.RWB]: 'Ala Direito',
	[PlayerPositions.LWB]: 'Ala Esquerdo',

	[PlayerPositions.CDM]: 'Volante',
	[PlayerPositions.CM]: 'Meio-campista Central',
	[PlayerPositions.CAM]: 'Meia Atacante',

	[PlayerPositions.RM]: 'Meia Direito',
	[PlayerPositions.LM]: 'Meia Esquerdo',

	[PlayerPositions.RW]: 'Ponta Direita',
	[PlayerPositions.LW]: 'Ponta Esquerda',

	[PlayerPositions.CF]: 'Centroavante',
	[PlayerPositions.ST]: 'Segundo Atacante',
} as const

export const getPlayerPositionLabel = (playerPosition: PlayerPosition) =>
	PLAYER_POSITION_LABELS[playerPosition]
