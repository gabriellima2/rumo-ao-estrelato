import { Link } from '@tanstack/react-router'
import { getPlayerPositionLabel } from '../catalog/positions'
import type { GetSeasonDetailDTOOutput } from '../dtos/player-seasons-dto'
import { getCountryByCode } from '@/shared/catalog/countries'
import { Button } from '@/shared/components/ui/button'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'

type SeasonInfoSectionProps = {
	seasonDetail: NonNullable<GetSeasonDetailDTOOutput>
}

export function SeasonInfoSection({ seasonDetail }: SeasonInfoSectionProps) {
	const { player, season, club } = seasonDetail

	return (
		<div className="space-y-6">
			<div className="space-y-1">
				<h1 className="font-serif text-3xl font-bold tracking-tight">
					{player.firstName} {player.lastName}
				</h1>
				<p className="text-muted-foreground">
					{getPlayerPositionLabel(player.position)} ·{' '}
					{getCountryByCode(player.country)?.name}
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<Card
					className={cn({
						'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30':
							season.isCurrent,
					})}
				>
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-lg">
							{season.title}
							{season.isCurrent ? (
								<span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
									Atual
								</span>
							) : null}
						</CardTitle>
						<CardDescription>Temporada {season.seasonNumber}</CardDescription>
					</CardHeader>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg">{club.name}</CardTitle>
						<CardDescription>Clube</CardDescription>
					</CardHeader>
				</Card>

				{season.isCurrent ? (
					<Button
						variant="destructive"
						size="sm"
						className="w-fit self-end"
						nativeButton={false}
						render={
							<Link
								to="/players/seasons/$seasonId/finalize"
								params={{ seasonId: season.id }}
							/>
						}
					>
						Finalizar temporada
					</Button>
				) : null}
			</div>
		</div>
	)
}
