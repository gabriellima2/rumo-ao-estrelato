import z from 'zod'
import type { SelectOption } from './select'

export const CountryCodes = {
	AF: 'AF',
	AX: 'AX',
	AL: 'AL',
	DZ: 'DZ',
	AS: 'AS',
	AD: 'AD',
	AO: 'AO',
	AI: 'AI',
	AQ: 'AQ',
	AG: 'AG',
	AR: 'AR',
	AM: 'AM',
	AW: 'AW',
	AU: 'AU',
	AT: 'AT',
	AZ: 'AZ',
	BS: 'BS',
	BH: 'BH',
	BD: 'BD',
	BE: 'BE',
	BZ: 'BZ',
	BJ: 'BJ',
	BM: 'BM',
	BT: 'BT',
	BO: 'BO',
	BA: 'BA',
	BW: 'BW',
	BV: 'BV',
	BR: 'BR',
	IO: 'IO',
	BN: 'BN',
	BG: 'BG',
	BF: 'BF',
	BI: 'BI',
	KH: 'KH',
	CM: 'CM',
	CA: 'CA',
	CV: 'CV',
	KY: 'KY',
	CF: 'CF',
	TD: 'TD',
	CL: 'CL',
	CN: 'CN',
	CX: 'CX',
	CC: 'CC',
	CO: 'CO',
	KM: 'KM',
	CG: 'CG',
	CD: 'CD',
	CK: 'CK',
	CR: 'CR',
	CI: 'CI',
	HR: 'HR',
	CU: 'CU',
	CY: 'CY',
	CZ: 'CZ',
	DK: 'DK',
	DJ: 'DJ',
	DM: 'DM',
	DO: 'DO',
	EC: 'EC',
	EG: 'EG',
	SV: 'SV',
	GQ: 'GQ',
	ER: 'ER',
	EE: 'EE',
	ET: 'ET',
	FK: 'FK',
	FO: 'FO',
	FJ: 'FJ',
	FI: 'FI',
	FR: 'FR',
	GF: 'GF',
	PF: 'PF',
	TF: 'TF',
	GA: 'GA',
	GM: 'GM',
	GE: 'GE',
	DE: 'DE',
	GH: 'GH',
	GI: 'GI',
	GR: 'GR',
	GL: 'GL',
	GD: 'GD',
	GP: 'GP',
	GU: 'GU',
	GT: 'GT',
	GG: 'GG',
	GN: 'GN',
	GW: 'GW',
	GY: 'GY',
	HT: 'HT',
	HM: 'HM',
	VA: 'VA',
	HN: 'HN',
	HK: 'HK',
	HU: 'HU',
	IS: 'IS',
	IN: 'IN',
	ID: 'ID',
	IR: 'IR',
	IQ: 'IQ',
	IE: 'IE',
	IM: 'IM',
	IL: 'IL',
	IT: 'IT',
	JM: 'JM',
	JP: 'JP',
	JE: 'JE',
	JO: 'JO',
	KZ: 'KZ',
	KE: 'KE',
	KI: 'KI',
	KP: 'KP',
	KR: 'KR',
	KW: 'KW',
	KG: 'KG',
	LA: 'LA',
	LV: 'LV',
	LB: 'LB',
	LS: 'LS',
	LR: 'LR',
	LY: 'LY',
	LI: 'LI',
	LT: 'LT',
	LU: 'LU',
	MO: 'MO',
	MK: 'MK',
	MG: 'MG',
	MW: 'MW',
	MY: 'MY',
	MV: 'MV',
	ML: 'ML',
	MT: 'MT',
	MH: 'MH',
	MQ: 'MQ',
	MR: 'MR',
	MU: 'MU',
	YT: 'YT',
	MX: 'MX',
	FM: 'FM',
	MD: 'MD',
	MC: 'MC',
	MN: 'MN',
	MS: 'MS',
	MA: 'MA',
	MZ: 'MZ',
	MM: 'MM',
	NA: 'NA',
	NR: 'NR',
	NP: 'NP',
	NL: 'NL',
	AN: 'AN',
	NC: 'NC',
	NZ: 'NZ',
	NI: 'NI',
	NE: 'NE',
	NG: 'NG',
	NU: 'NU',
	NF: 'NF',
	MP: 'MP',
	NO: 'NO',
	OM: 'OM',
	PK: 'PK',
	PW: 'PW',
	PS: 'PS',
	PA: 'PA',
	PG: 'PG',
	PY: 'PY',
	PE: 'PE',
	PH: 'PH',
	PN: 'PN',
	PL: 'PL',
	PT: 'PT',
	PR: 'PR',
	QA: 'QA',
	RE: 'RE',
	RO: 'RO',
	RU: 'RU',
	RW: 'RW',
	SH: 'SH',
	KN: 'KN',
	LC: 'LC',
	PM: 'PM',
	VC: 'VC',
	WS: 'WS',
	SM: 'SM',
	ST: 'ST',
	SA: 'SA',
	SN: 'SN',
	CS: 'CS',
	SC: 'SC',
	SL: 'SL',
	SG: 'SG',
	SK: 'SK',
	SI: 'SI',
	SB: 'SB',
	SO: 'SO',
	ZA: 'ZA',
	GS: 'GS',
	ES: 'ES',
	LK: 'LK',
	SD: 'SD',
	SR: 'SR',
	SJ: 'SJ',
	SZ: 'SZ',
	SE: 'SE',
	CH: 'CH',
	SY: 'SY',
	TW: 'TW',
	TJ: 'TJ',
	TZ: 'TZ',
	TH: 'TH',
	TL: 'TL',
	TG: 'TG',
	TK: 'TK',
	TO: 'TO',
	TT: 'TT',
	TN: 'TN',
	TR: 'TR',
	TM: 'TM',
	TC: 'TC',
	TV: 'TV',
	UG: 'UG',
	UA: 'UA',
	AE: 'AE',
	GB: 'GB',
	US: 'US',
	UM: 'UM',
	UY: 'UY',
	UZ: 'UZ',
	VU: 'VU',
	VE: 'VE',
	VN: 'VN',
	VG: 'VG',
	VI: 'VI',
	WF: 'WF',
	EH: 'EH',
	YE: 'YE',
	ZM: 'ZM',
	ZW: 'ZW',
} as const

export type CountryCode = (typeof CountryCodes)[keyof typeof CountryCodes]

export const CountryCodeSchema = z.enum(Object.values(CountryCodes))

export const COUNTRIES = {
	[CountryCodes.AF]: {
		name: 'Afeganistão',
		flag: '🇦🇫',
	},
	[CountryCodes.AL]: {
		name: 'Albânia',
		flag: '🇦🇱',
	},
	[CountryCodes.DE]: {
		name: 'Alemanha',
		flag: '🇩🇪',
	},
	[CountryCodes.AD]: {
		name: 'Andorra',
		flag: '🇦🇩',
	},
	[CountryCodes.AO]: {
		name: 'Angola',
		flag: '🇦🇴',
	},
	[CountryCodes.AI]: {
		name: 'Anguilla',
		flag: '🇦🇮',
	},
	[CountryCodes.AG]: {
		name: 'Antígua e Barbuda',
		flag: '🇦🇬',
	},
	[CountryCodes.SA]: {
		name: 'Arábia Saudita',
		flag: '🇸🇦',
	},
	[CountryCodes.DZ]: {
		name: 'Argélia',
		flag: '🇩🇿',
	},
	[CountryCodes.AR]: {
		name: 'Argentina',
		flag: '🇦🇷',
	},
	[CountryCodes.AM]: {
		name: 'Armênia',
		flag: '🇦🇲',
	},
	[CountryCodes.AW]: {
		name: 'Aruba',
		flag: '🇦🇼',
	},
	[CountryCodes.AU]: {
		name: 'Austrália',
		flag: '🇦🇺',
	},
	[CountryCodes.AT]: {
		name: 'Áustria',
		flag: '🇦🇹',
	},
	[CountryCodes.AZ]: {
		name: 'Azerbaijão',
		flag: '🇦🇿',
	},
	[CountryCodes.BS]: {
		name: 'Bahamas',
		flag: '🇧🇸',
	},
	[CountryCodes.BH]: {
		name: 'Bahrein',
		flag: '🇧🇭',
	},
	[CountryCodes.BD]: {
		name: 'Bangladesh',
		flag: '🇧🇩',
	},
	[CountryCodes.BB]: {
		name: 'Barbados',
		flag: '🇧🇧',
	},
	[CountryCodes.BE]: {
		name: 'Bélgica',
		flag: '🇧🇪',
	},
	[CountryCodes.BZ]: {
		name: 'Belize',
		flag: '🇧🇿',
	},
	[CountryCodes.BJ]: {
		name: 'Benim',
		flag: '🇧🇯',
	},
	[CountryCodes.BM]: {
		name: 'Bermudas',
		flag: '🇧🇲',
	},
	[CountryCodes.BY]: {
		name: 'Bielorrússia',
		flag: '🇧🇾',
	},
	[CountryCodes.BO]: {
		name: 'Bolívia',
		flag: '🇧🇴',
	},
	[CountryCodes.BA]: {
		name: 'Bósnia e Herzegovina',
		flag: '🇧🇦',
	},
	[CountryCodes.BW]: {
		name: 'Botsuana',
		flag: '🇧🇼',
	},
	[CountryCodes.BR]: {
		name: 'Brasil',
		flag: '🇧🇷',
	},
	[CountryCodes.BN]: {
		name: 'Brunei',
		flag: '🇧🇳',
	},
	[CountryCodes.BG]: {
		name: 'Bulgária',
		flag: '🇧🇬',
	},
	[CountryCodes.BF]: {
		name: 'Burquina Faso',
		flag: '🇧🇫',
	},
	[CountryCodes.BI]: {
		name: 'Burundi',
		flag: '🇧🇮',
	},
	[CountryCodes.BT]: {
		name: 'Butão',
		flag: '🇧🇹',
	},
	[CountryCodes.CV]: {
		name: 'Cabo Verde',
		flag: '🇨🇻',
	},
	[CountryCodes.KH]: {
		name: 'Camboja',
		flag: '🇰🇭',
	},
	[CountryCodes.CM]: {
		name: 'Camarões',
		flag: '🇨🇲',
	},
	[CountryCodes.CA]: {
		name: 'Canadá',
		flag: '🇨🇦',
	},
	[CountryCodes.QA]: {
		name: 'Catar',
		flag: '🇶🇦',
	},
	[CountryCodes.KZ]: {
		name: 'Cazaquistão',
		flag: '🇰🇿',
	},
	[CountryCodes.TD]: {
		name: 'Chade',
		flag: '🇹🇩',
	},
	[CountryCodes.CZ]: {
		name: 'Chéquia',
		flag: '🇨🇿',
	},
	[CountryCodes.CL]: {
		name: 'Chile',
		flag: '🇨🇱',
	},
	[CountryCodes.CN]: {
		name: 'China',
		flag: '🇨🇳',
	},
	[CountryCodes.CY]: {
		name: 'Chipre',
		flag: '🇨🇾',
	},
	[CountryCodes.SG]: {
		name: 'Cingapura',
		flag: '🇸🇬',
	},
	[CountryCodes.CO]: {
		name: 'Colômbia',
		flag: '🇨🇴',
	},
	[CountryCodes.KM]: {
		name: 'Comores',
		flag: '🇰🇲',
	},
	[CountryCodes.CG]: {
		name: 'Congo',
		flag: '🇨🇬',
	},
	[CountryCodes.CD]: {
		name: 'República Democrática do Congo',
		flag: '🇨🇩',
	},
	[CountryCodes.KP]: {
		name: 'Coreia do Norte',
		flag: '🇰🇵',
	},
	[CountryCodes.KR]: {
		name: 'Coreia do Sul',
		flag: '🇰🇷',
	},
	[CountryCodes.CI]: {
		name: 'Costa do Marfim',
		flag: '🇨🇮',
	},
	[CountryCodes.CR]: {
		name: 'Costa Rica',
		flag: '🇨🇷',
	},
	[CountryCodes.HR]: {
		name: 'Croácia',
		flag: '🇭🇷',
	},
	[CountryCodes.CU]: {
		name: 'Cuba',
		flag: '🇨🇺',
	},
	[CountryCodes.CW]: {
		name: 'Curaçau',
		flag: '🇨🇼',
	},
	[CountryCodes.DK]: {
		name: 'Dinamarca',
		flag: '🇩🇰',
	},
	[CountryCodes.DJ]: {
		name: 'Djibuti',
		flag: '🇩🇯',
	},
	[CountryCodes.DM]: {
		name: 'Dominica',
		flag: '🇩🇲',
	},
	[CountryCodes.EG]: {
		name: 'Egito',
		flag: '🇪🇬',
	},
	[CountryCodes.SV]: {
		name: 'El Salvador',
		flag: '🇸🇻',
	},
	[CountryCodes.AE]: {
		name: 'Emirados Árabes Unidos',
		flag: '🇦🇪',
	},
	[CountryCodes.EC]: {
		name: 'Equador',
		flag: '🇪🇨',
	},
	[CountryCodes.ER]: {
		name: 'Eritreia',
		flag: '🇪🇷',
	},
	[CountryCodes.SCO]: {
		name: 'Escócia',
		flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
	},
	[CountryCodes.SK]: {
		name: 'Eslováquia',
		flag: '🇸🇰',
	},
	[CountryCodes.SI]: {
		name: 'Eslovênia',
		flag: '🇸🇮',
	},
	[CountryCodes.ES]: {
		name: 'Espanha',
		flag: '🇪🇸',
	},
	[CountryCodes.US]: {
		name: 'Estados Unidos',
		flag: '🇺🇸',
	},
	[CountryCodes.EE]: {
		name: 'Estônia',
		flag: '🇪🇪',
	},
	[CountryCodes.SZ]: {
		name: 'Eswatini',
		flag: '🇸🇿',
	},
	[CountryCodes.ET]: {
		name: 'Etiópia',
		flag: '🇪🇹',
	},
	[CountryCodes.FJ]: {
		name: 'Fiji',
		flag: '🇫🇯',
	},
	[CountryCodes.PH]: {
		name: 'Filipinas',
		flag: '🇵🇭',
	},
	[CountryCodes.FI]: {
		name: 'Finlândia',
		flag: '🇫🇮',
	},
	[CountryCodes.FR]: {
		name: 'França',
		flag: '🇫🇷',
	},
	[CountryCodes.GA]: {
		name: 'Gabão',
		flag: '🇬🇦',
	},
	[CountryCodes.GM]: {
		name: 'Gâmbia',
		flag: '🇬🇲',
	},
	[CountryCodes.GH]: {
		name: 'Gana',
		flag: '🇬🇭',
	},
	[CountryCodes.GE]: {
		name: 'Geórgia',
		flag: '🇬🇪',
	},
	[CountryCodes.GI]: {
		name: 'Gibraltar',
		flag: '🇬🇮',
	},
	[CountryCodes.GD]: {
		name: 'Granada',
		flag: '🇬🇩',
	},
	[CountryCodes.GR]: {
		name: 'Grécia',
		flag: '🇬🇷',
	},
	[CountryCodes.GL]: {
		name: 'Groenlândia',
		flag: '🇬🇱',
	},
	[CountryCodes.GP]: {
		name: 'Guadalupe',
		flag: '🇬🇵',
	},
	[CountryCodes.GU]: {
		name: 'Guam',
		flag: '🇬🇺',
	},
	[CountryCodes.GT]: {
		name: 'Guatemala',
		flag: '🇬🇹',
	},
	[CountryCodes.GY]: {
		name: 'Guiana',
		flag: '🇬🇾',
	},
	[CountryCodes.GF]: {
		name: 'Guiana Francesa',
		flag: '🇬🇫',
	},
	[CountryCodes.GN]: {
		name: 'Guiné',
		flag: '🇬🇳',
	},
	[CountryCodes.GW]: {
		name: 'Guiné-Bissau',
		flag: '🇬🇼',
	},
	[CountryCodes.GQ]: {
		name: 'Guiné Equatorial',
		flag: '🇬🇶',
	},
	[CountryCodes.HT]: {
		name: 'Haiti',
		flag: '🇭🇹',
	},
	[CountryCodes.HN]: {
		name: 'Honduras',
		flag: '🇭🇳',
	},
	[CountryCodes.HK]: {
		name: 'Hong Kong',
		flag: '🇭🇰',
	},
	[CountryCodes.HU]: {
		name: 'Hungria',
		flag: '🇭🇺',
	},
	[CountryCodes.YE]: {
		name: 'Iêmen',
		flag: '🇾🇪',
	},
	[CountryCodes.AS]: {
		name: 'Samoa Americana',
		flag: '🇦🇸',
	},
	[CountryCodes.VG]: {
		name: 'Ilhas Virgens Britânicas',
		flag: '🇻🇬',
	},
	[CountryCodes.KY]: {
		name: 'Ilhas Cayman',
		flag: '🇰🇾',
	},
	[CountryCodes.CK]: {
		name: 'Ilhas Cook',
		flag: '🇨🇰',
	},
	[CountryCodes.FO]: {
		name: 'Ilhas Faroé',
		flag: '🇫🇴',
	},
	[CountryCodes.VIR]: {
		name: 'Ilhas Virgens Americanas',
		flag: '🇻🇮',
	},
	[CountryCodes.IN]: {
		name: 'Índia',
		flag: '🇮🇳',
	},
	[CountryCodes.ID]: {
		name: 'Indonésia',
		flag: '🇮🇩',
	},
	[CountryCodes.ENG]: {
		name: 'Inglaterra',
		flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
	},
	[CountryCodes.IR]: {
		name: 'Irã',
		flag: '🇮🇷',
	},
	[CountryCodes.IQ]: {
		name: 'Iraque',
		flag: '🇮🇶',
	},
	[CountryCodes.IE]: {
		name: 'Irlanda',
		flag: '🇮🇪',
	},
	[CountryCodes.NIR]: {
		name: 'Irlanda do Norte',
		flag: '🇬🇧',
	},
	[CountryCodes.IS]: {
		name: 'Islândia',
		flag: '🇮🇸',
	},
	[CountryCodes.IL]: {
		name: 'Israel',
		flag: '🇮🇱',
	},
	[CountryCodes.IT]: {
		name: 'Itália',
		flag: '🇮🇹',
	},
	[CountryCodes.JM]: {
		name: 'Jamaica',
		flag: '🇯🇲',
	},
	[CountryCodes.JP]: {
		name: 'Japão',
		flag: '🇯🇵',
	},
	[CountryCodes.JO]: {
		name: 'Jordânia',
		flag: '🇯🇴',
	},
	[CountryCodes.XK]: {
		name: 'Kosovo',
		flag: '🇽🇰',
	},
	[CountryCodes.KW]: {
		name: 'Kuwait',
		flag: '🇰🇼',
	},
	[CountryCodes.LA]: {
		name: 'Laos',
		flag: '🇱🇦',
	},
	[CountryCodes.LS]: {
		name: 'Lesoto',
		flag: '🇱🇸',
	},
	[CountryCodes.LV]: {
		name: 'Letônia',
		flag: '🇱🇻',
	},
	[CountryCodes.LB]: {
		name: 'Líbano',
		flag: '🇱🇧',
	},
	[CountryCodes.LR]: {
		name: 'Libéria',
		flag: '🇱🇷',
	},
	[CountryCodes.LY]: {
		name: 'Líbia',
		flag: '🇱🇾',
	},
	[CountryCodes.LI]: {
		name: 'Liechtenstein',
		flag: '🇱🇮',
	},
	[CountryCodes.LT]: {
		name: 'Lituânia',
		flag: '🇱🇹',
	},
	[CountryCodes.LU]: {
		name: 'Luxemburgo',
		flag: '🇱🇺',
	},
	[CountryCodes.MO]: {
		name: 'Macau',
		flag: '🇲🇴',
	},
	[CountryCodes.MK]: {
		name: 'Macedônia do Norte',
		flag: '🇲🇰',
	},
	[CountryCodes.MG]: {
		name: 'Madagascar',
		flag: '🇲🇬',
	},
	[CountryCodes.MY]: {
		name: 'Malásia',
		flag: '🇲🇾',
	},
	[CountryCodes.MW]: {
		name: 'Malawi',
		flag: '🇲🇼',
	},
	[CountryCodes.MV]: {
		name: 'Maldivas',
		flag: '🇲🇻',
	},
	[CountryCodes.ML]: {
		name: 'Mali',
		flag: '🇲🇱',
	},
	[CountryCodes.MT]: {
		name: 'Malta',
		flag: '🇲🇹',
	},
	[CountryCodes.MA]: {
		name: 'Marrocos',
		flag: '🇲🇦',
	},
	[CountryCodes.MQ]: {
		name: 'Martinica',
		flag: '🇲🇶',
	},
	[CountryCodes.MU]: {
		name: 'Maurício',
		flag: '🇲🇺',
	},
	[CountryCodes.MR]: {
		name: 'Mauritânia',
		flag: '🇲🇷',
	},
	[CountryCodes.MX]: {
		name: 'México',
		flag: '🇲🇽',
	},
	[CountryCodes.FM]: {
		name: 'Micronésia',
		flag: '🇫🇲',
	},
	[CountryCodes.MZ]: {
		name: 'Moçambique',
		flag: '🇲🇿',
	},
	[CountryCodes.MD]: {
		name: 'Moldávia',
		flag: '🇲🇩',
	},
	[CountryCodes.MC]: {
		name: 'Mônaco',
		flag: '🇲🇨',
	},
	[CountryCodes.MN]: {
		name: 'Mongólia',
		flag: '🇲🇳',
	},
	[CountryCodes.ME]: {
		name: 'Montenegro',
		flag: '🇲🇪',
	},
	[CountryCodes.MS]: {
		name: 'Montserrat',
		flag: '🇲🇸',
	},
	[CountryCodes.NA]: {
		name: 'Namíbia',
		flag: '🇳🇦',
	},
	[CountryCodes.NP]: {
		name: 'Nepal',
		flag: '🇳🇵',
	},
	[CountryCodes.NI]: {
		name: 'Nicarágua',
		flag: '🇳🇮',
	},
	[CountryCodes.NE]: {
		name: 'Níger',
		flag: '🇳🇪',
	},
	[CountryCodes.NG]: {
		name: 'Nigéria',
		flag: '🇳🇬',
	},
	[CountryCodes.NCL]: {
		name: 'Nova Caledônia',
		flag: '🇳🇨',
	},
	[CountryCodes.NO]: {
		name: 'Noruega',
		flag: '🇳🇴',
	},
	[CountryCodes.NZ]: {
		name: 'Nova Zelândia',
		flag: '🇳🇿',
	},
	[CountryCodes.OM]: {
		name: 'Omã',
		flag: '🇴🇲',
	},
	[CountryCodes.NL]: {
		name: 'Países Baixos',
		flag: '🇳🇱',
	},
	[CountryCodes.WAL]: {
		name: 'País de Gales',
		flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
	},
	[CountryCodes.PS]: {
		name: 'Palestina',
		flag: '🇵🇸',
	},
	[CountryCodes.PA]: {
		name: 'Panamá',
		flag: '🇵🇦',
	},
	[CountryCodes.PK]: {
		name: 'Paquistão',
		flag: '🇵🇰',
	},
	[CountryCodes.PG]: {
		name: 'Papua-Nova Guiné',
		flag: '🇵🇬',
	},
	[CountryCodes.PY]: {
		name: 'Paraguai',
		flag: '🇵🇾',
	},
	[CountryCodes.PE]: {
		name: 'Peru',
		flag: '🇵🇪',
	},
	[CountryCodes.PL]: {
		name: 'Polônia',
		flag: '🇵🇱',
	},
	[CountryCodes.PR]: {
		name: 'Porto Rico',
		flag: '🇵🇷',
	},
	[CountryCodes.PT]: {
		name: 'Portugal',
		flag: '🇵🇹',
	},
	[CountryCodes.KE]: {
		name: 'Quênia',
		flag: '🇰🇪',
	},
	[CountryCodes.KG]: {
		name: 'Quirguistão',
		flag: '🇰🇬',
	},
	[CountryCodes.CF]: {
		name: 'República Centro-Africana',
		flag: '🇨🇫',
	},
	[CountryCodes.RE]: {
		name: 'Reunião',
		flag: '🇷🇪',
	},
	[CountryCodes.RO]: {
		name: 'Romênia',
		flag: '🇷🇴',
	},
	[CountryCodes.RW]: {
		name: 'Ruanda',
		flag: '🇷🇼',
	},
	[CountryCodes.RU]: {
		name: 'Rússia',
		flag: '🇷🇺',
	},
	[CountryCodes.WS]: {
		name: 'Samoa',
		flag: '🇼🇸',
	},
	[CountryCodes.SM]: {
		name: 'San Marino',
		flag: '🇸🇲',
	},
	[CountryCodes.LC]: {
		name: 'Santa Lúcia',
		flag: '🇱🇨',
	},
	[CountryCodes.ST]: {
		name: 'São Tomé e Príncipe',
		flag: '🇸🇹',
	},
	[CountryCodes.VC]: {
		name: 'São Vicente e Granadinhas',
		flag: '🇻🇨',
	},
	[CountryCodes.KN]: {
		name: 'São Cristóvão e Neves',
		flag: '🇰🇳',
	},
	[CountryCodes.SN]: {
		name: 'Senegal',
		flag: '🇸🇳',
	},
	[CountryCodes.SL]: {
		name: 'Serra Leoa',
		flag: '🇸🇱',
	},
	[CountryCodes.RS]: {
		name: 'Sérvia',
		flag: '🇷🇸',
	},
	[CountryCodes.SY]: {
		name: 'Síria',
		flag: '🇸🇾',
	},
	[CountryCodes.SO]: {
		name: 'Somália',
		flag: '🇸🇴',
	},
	[CountryCodes.LK]: {
		name: 'Sri Lanka',
		flag: '🇱🇰',
	},
	[CountryCodes.SD]: {
		name: 'Sudão',
		flag: '🇸🇩',
	},
	[CountryCodes.SS]: {
		name: 'Sudão do Sul',
		flag: '🇸🇸',
	},
	[CountryCodes.SE]: {
		name: 'Suécia',
		flag: '🇸🇪',
	},
	[CountryCodes.CH]: {
		name: 'Suíça',
		flag: '🇨🇭',
	},
	[CountryCodes.SR]: {
		name: 'Suriname',
		flag: '🇸🇷',
	},
	[CountryCodes.TAH]: {
		name: 'Taiti',
		flag: '🇵🇫',
	},
	[CountryCodes.TH]: {
		name: 'Tailândia',
		flag: '🇹🇭',
	},
	[CountryCodes.TW]: {
		name: 'Taiwan',
		flag: '🇹🇼',
	},
	[CountryCodes.TZ]: {
		name: 'Tanzânia',
		flag: '🇹🇿',
	},
	[CountryCodes.TJ]: {
		name: 'Tajiquistão',
		flag: '🇹🇯',
	},
	[CountryCodes.TL]: {
		name: 'Timor-Leste',
		flag: '🇹🇱',
	},
	[CountryCodes.TG]: {
		name: 'Togo',
		flag: '🇹🇬',
	},
	[CountryCodes.TO]: {
		name: 'Tonga',
		flag: '🇹🇴',
	},
	[CountryCodes.TT]: {
		name: 'Trinidad e Tobago',
		flag: '🇹🇹',
	},
	[CountryCodes.TCA]: {
		name: 'Turcas e Caicos',
		flag: '🇹🇨',
	},
	[CountryCodes.TN]: {
		name: 'Tunísia',
		flag: '🇹🇳',
	},
	[CountryCodes.TR]: {
		name: 'Turquia',
		flag: '🇹🇷',
	},
	[CountryCodes.TM]: {
		name: 'Turcomenistão',
		flag: '🇹🇲',
	},
	[CountryCodes.UA]: {
		name: 'Ucrânia',
		flag: '🇺🇦',
	},
	[CountryCodes.UG]: {
		name: 'Uganda',
		flag: '🇺🇬',
	},
	[CountryCodes.UY]: {
		name: 'Uruguai',
		flag: '🇺🇾',
	},
	[CountryCodes.UZ]: {
		name: 'Uzbequistão',
		flag: '🇺🇿',
	},
	[CountryCodes.VU]: {
		name: 'Vanuatu',
		flag: '🇻🇺',
	},
	[CountryCodes.VE]: {
		name: 'Venezuela',
		flag: '🇻🇪',
	},
	[CountryCodes.VN]: {
		name: 'Vietnã',
		flag: '🇻🇳',
	},
	[CountryCodes.ZM]: {
		name: 'Zâmbia',
		flag: '🇿🇲',
	},
	[CountryCodes.ZW]: {
		name: 'Zimbábue',
		flag: '🇿🇼',
	},
} as const

export const COUNTRIES_SELECT_OPTIONS = Object.entries(
	COUNTRIES,
).map<SelectOption>(([value, { name }]) => ({
	value,
	label: name,
}))
