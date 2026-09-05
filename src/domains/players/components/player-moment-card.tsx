import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { PlayerMomentTypeIcon } from './player-moment-type-icon'
import type { PlayerMomentEnriched } from '../types'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'

type PlayerMomentCardProps = {
	moment: PlayerMomentEnriched
}

export function PlayerMomentCard({ moment }: PlayerMomentCardProps) {
	const typeColor = moment.player_moment_type_color
	const typeIcon = moment.player_moment_type_icon
	const typeName = moment.player_moment_type_name

	return (
		<Card className="overflow-hidden">
			<div className="h-1" style={{ backgroundColor: typeColor }} />
			<CardHeader className="flex flex-row items-start gap-3">
				<div
					className="flex size-9 shrink-0 items-center justify-center rounded-full"
					style={{
						backgroundColor: `${typeColor}20`,
						color: typeColor,
					}}
				>
					<PlayerMomentTypeIcon icon={typeIcon} className="size-4" />
				</div>
				<div className="min-w-0 flex-1 space-y-1">
					<CardTitle className="text-base">{moment.title}</CardTitle>
					<CardDescription className="text-xs">
						{typeName} ·{' '}
						{formatDistanceToNow(new Date(moment.created_at), {
							addSuffix: true,
							locale: ptBR,
						})}
					</CardDescription>
				</div>
			</CardHeader>
			{moment.description ? (
				<CardContent className="pt-0">
					<p className="text-muted-foreground text-sm">{moment.description}</p>
				</CardContent>
			) : null}
		</Card>
	)
}
