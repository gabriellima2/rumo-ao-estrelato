import { PlayerMomentCard } from './cards/player-moment-card'
import type { PlayerMomentEnriched } from '../types'
import {
	CardList,
	CardListEmpty,
	CardListItem,
	CardListSkeleton,
} from '@/shared/components/dashboard/card-list'

type PlayerMomentsProps = {
	moments: PlayerMomentEnriched[]
}

export function PlayerMoments({ moments }: PlayerMomentsProps) {
	return (
		<>
			{moments.length >= 1 ? (
				<CardList>
					{moments.map((moment) => (
						<CardListItem key={moment.id}>
							<PlayerMomentCard moment={moment} />
						</CardListItem>
					))}
				</CardList>
			) : (
				<CardListEmpty align="left">
					Nenhum momento registrado ainda.
				</CardListEmpty>
			)}
		</>
	)
}

export function PlayerMomentsSkeleton() {
	return <CardListSkeleton count={2} />
}
