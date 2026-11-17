import { useMemo } from 'react'
import type { SeasonDetail } from '../api/types/seasons'
import {
	Card,
	CardDescription,
	CardHeader,
	CardSkeleton,
	CardTitle,
} from '@/shared/components/ui/card'

type PlayerSeasonInfoProps = {
	seasonDetail: SeasonDetail
}

export function PlayerSeasonInfo({ seasonDetail }: PlayerSeasonInfoProps) {
	const { season, club, segments } = seasonDetail

	const sortedSegments = useMemo(
		() => [...segments].sort((a, b) => a.stintIndex - b.stintIndex),
		[segments],
	)

	const highlightedSegment = useMemo(
		() =>
			sortedSegments.find((segment) => segment.isCurrent) ??
			sortedSegments[sortedSegments.length - 1],
		[sortedSegments],
	)

	const previousClubs = useMemo(
		() =>
			sortedSegments
				.filter((segment) => segment.stintIndex < highlightedSegment.stintIndex)
				.map((segment) => segment.club.name),
		[sortedSegments, highlightedSegment],
	)

	const hasMultipleSegments = sortedSegments.length > 1
	const showClubAsCurrent = season.isCurrent && hasMultipleSegments
	const showClubCard = season.isCurrent || hasMultipleSegments

	if (!showClubCard) {
		return null
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">{club.name}</CardTitle>
				{showClubAsCurrent ? (
					<CardDescription>Clube atual</CardDescription>
				) : null}
				{previousClubs.length > 0 ? (
					<p className="text-muted-foreground text-sm">
						Anteriormente: {previousClubs.join(', ')}
					</p>
				) : null}
			</CardHeader>
		</Card>
	)
}

export function PlayerSeasonInfoSkeleton() {
	return (
		<div className="flex flex-col gap-3">
			<CardSkeleton className="h-20" />
		</div>
	)
}
