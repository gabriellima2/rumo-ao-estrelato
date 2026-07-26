import z from 'zod'
import type { SelectOption } from './select'

export const CountryCodes = {
	AF: 'AF',
	AL: 'AL',
	DE: 'DE',
	AD: 'AD',
	AO: 'AO',
	AI: 'AI',
	AG: 'AG',
	SA: 'SA',
	DZ: 'DZ',
	AR: 'AR',
	AM: 'AM',
	AW: 'AW',
	AU: 'AU',
	AT: 'AT',
	AZ: 'AZ',
	BS: 'BS',
	BH: 'BH',
	BD: 'BD',
	BB: 'BB',
	BE: 'BE',
	BZ: 'BZ',
	BJ: 'BJ',
	BM: 'BM',
	BY: 'BY',
	BO: 'BO',
	BA: 'BA',
	BW: 'BW',
	BR: 'BR',
	BN: 'BN',
	BG: 'BG',
	BF: 'BF',
	BI: 'BI',
	BT: 'BT',
	CV: 'CV',
	KH: 'KH',
	CM: 'CM',
	CA: 'CA',
	QA: 'QA',
	KZ: 'KZ',
	TD: 'TD',
	CZ: 'CZ',
	CL: 'CL',
	CN: 'CN',
	CY: 'CY',
	SG: 'SG',
	CO: 'CO',
	KM: 'KM',
	CG: 'CG',
	CD: 'CD',
	KP: 'KP',
	KR: 'KR',
	CI: 'CI',
	CR: 'CR',
	HR: 'HR',
	CU: 'CU',
	CW: 'CW',
	DK: 'DK',
	DJ: 'DJ',
	DM: 'DM',
	EG: 'EG',
	SV: 'SV',
	AE: 'AE',
	EC: 'EC',
	ER: 'ER',
	SCO: 'SCO',
	SK: 'SK',
	SI: 'SI',
	ES: 'ES',
	US: 'US',
	EE: 'EE',
	SZ: 'SZ',
	ET: 'ET',
	FJ: 'FJ',
	PH: 'PH',
	FI: 'FI',
	FR: 'FR',
	GA: 'GA',
	GM: 'GM',
	GH: 'GH',
	GE: 'GE',
	GI: 'GI',
	GD: 'GD',
	GR: 'GR',
	GL: 'GL',
	GP: 'GP',
	GU: 'GU',
	GT: 'GT',
	GY: 'GY',
	GF: 'GF',
	GN: 'GN',
	GW: 'GW',
	GQ: 'GQ',
	HT: 'HT',
	HN: 'HN',
	HK: 'HK',
	HU: 'HU',
	YE: 'YE',
	AS: 'AS',
	VG: 'VG',
	KY: 'KY',
	CK: 'CK',
	FO: 'FO',
	VIR: 'VIR',
	IN: 'IN',
	ID: 'ID',
	ENG: 'ENG',
	IR: 'IR',
	IQ: 'IQ',
	IE: 'IE',
	NIR: 'NIR',
	IS: 'IS',
	IL: 'IL',
	IT: 'IT',
	JM: 'JM',
	JP: 'JP',
	JO: 'JO',
	XK: 'XK',
	KW: 'KW',
	LA: 'LA',
	LS: 'LS',
	LV: 'LV',
	LB: 'LB',
	LR: 'LR',
	LY: 'LY',
	LI: 'LI',
	LT: 'LT',
	LU: 'LU',
	MO: 'MO',
	MK: 'MK',
	MG: 'MG',
	MY: 'MY',
	MW: 'MW',
	MV: 'MV',
	ML: 'ML',
	MT: 'MT',
	MA: 'MA',
	MQ: 'MQ',
	MU: 'MU',
	MR: 'MR',
	MX: 'MX',
	FM: 'FM',
	MZ: 'MZ',
	MD: 'MD',
	MC: 'MC',
	MN: 'MN',
	ME: 'ME',
	MS: 'MS',
	NA: 'NA',
	NP: 'NP',
	NI: 'NI',
	NE: 'NE',
	NG: 'NG',
	NCL: 'NCL',
	NZ: 'NZ',
	OM: 'OM',
	NL: 'NL',
	WAL: 'WAL',
	PS: 'PS',
	PA: 'PA',
	PK: 'PK',
	PG: 'PG',
	PY: 'PY',
	PE: 'PE',
	PL: 'PL',
	PR: 'PR',
	PT: 'PT',
	KE: 'KE',
	KG: 'KG',
	CF: 'CF',
	RE: 'RE',
	RO: 'RO',
	RW: 'RW',
	RU: 'RU',
	WS: 'WS',
	SM: 'SM',
	LC: 'LC',
	ST: 'ST',
	VC: 'VC',
	KN: 'KN',
	SN: 'SN',
	SL: 'SL',
	RS: 'RS',
	SY: 'SY',
	SO: 'SO',
	LK: 'LK',
	SD: 'SD',
	SS: 'SS',
	SE: 'SE',
	CH: 'CH',
	SR: 'SR',
	TAH: 'TAH',
	TH: 'TH',
	TW: 'TW',
	TZ: 'TZ',
	TJ: 'TJ',
	TL: 'TL',
	TG: 'TG',
	TO: 'TO',
	TT: 'TT',
	TCA: 'TCA',
	TN: 'TN',
	TR: 'TR',
	TM: 'TM',
	UA: 'UA',
	UG: 'UG',
	UY: 'UY',
	UZ: 'UZ',
	VU: 'VU',
	VE: 'VE',
	VN: 'VN',
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
