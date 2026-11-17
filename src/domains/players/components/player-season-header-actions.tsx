import { Link } from '@tanstack/react-router'
import { ArrowRightLeft, Flag } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { HeaderActions } from '@/shared/components/dashboard/header'

const TRANSFER_TITLE = 'Transferir'
const FINALIZE_TITLE = 'Finalizar temporada'

type PlayerSeasonHeaderActionsProps = {
	isCurrentSeason: boolean
	currentSeasonId: string
}

export function PlayerSeasonHeaderActions({
	isCurrentSeason,
	currentSeasonId,
}: PlayerSeasonHeaderActionsProps) {
	if (!isCurrentSeason) {
		return null
	}

	return (
		<HeaderActions>
			<Button
				variant="outline"
				size="icon"
				title={TRANSFER_TITLE}
				nativeButton={false}
				render={
					<Link
						title={TRANSFER_TITLE}
						to="/players/seasons/$seasonId/transfer"
						params={{ seasonId: currentSeasonId }}
					>
						<ArrowRightLeft aria-hidden />
					</Link>
				}
			/>
			<Button
				variant="destructive"
				size="icon"
				title={FINALIZE_TITLE}
				nativeButton={false}
				render={
					<Link
						title={FINALIZE_TITLE}
						to="/players/seasons/$seasonId/finalize"
						params={{ seasonId: currentSeasonId }}
					>
						<Flag aria-hidden />
					</Link>
				}
			/>
		</HeaderActions>
	)
}
