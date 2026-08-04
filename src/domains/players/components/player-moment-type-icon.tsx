import {Circle, CircleDot, FileSignature, HeartPulse, Star, Trophy} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
	Circle,
	CircleDot,
	FileSignature,
	HeartPulse,
	Star,
	Trophy,
}

type PlayerMomentTypeIconProps = {
	icon: string
	className?: string
	style?: React.CSSProperties
}

export function PlayerMomentTypeIcon({
	icon,
	className,
	style,
}: PlayerMomentTypeIconProps) {
	const Icon = ICON_MAP[icon] ?? Circle
	return <Icon className={className} style={style} />
}
