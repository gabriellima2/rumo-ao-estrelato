import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { PlayerMomentTypeIcon } from './player-moment-type-icon'
import type { GetPlayerMomentsBySeasonIdDTOOutput } from '../dtos/player-moments-dto'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'

type PlayerMomentCardProps = {
	moment: GetPlayerMomentsBySeasonIdDTOOutput[number]
}

export function PlayerMomentCard({ moment }: PlayerMomentCardProps) {
	return (
		<Card className="overflow-hidden">
			<div
				className="h-1"
				style={{ backgroundColor: moment.playerMomentTypeColor }}
			/>
			<CardHeader className="flex flex-row items-start gap-3">
				<div
					className="flex size-9 shrink-0 items-center justify-center rounded-full"
					style={{
						backgroundColor: `${moment.playerMomentTypeColor}20`,
						color: moment.playerMomentTypeColor,
					}}
				>
					<PlayerMomentTypeIcon icon={moment.playerMomentTypeIcon} className="size-4" />
				</div>
				<div className="min-w-0 flex-1 space-y-1">
					<CardTitle className="text-base">{moment.title}</CardTitle>
					<CardDescription className="text-xs">
						{moment.playerMomentTypeName} ·{' '}
						{formatDistanceToNow(new Date(moment.createdAt), {
							addSuffix: true,
							locale: ptBR,
						})}
					</CardDescription>
				</div>
			</CardHeader>
			{moment.description ? (
				<CardContent className="pt-0">
					<p className="text-sm text-muted-foreground">{moment.description}</p>
				</CardContent>
			) : null}
		</Card>
	)
}
