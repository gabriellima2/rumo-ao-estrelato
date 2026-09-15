import { ChevronRightIcon } from 'lucide-react'
import type { PlayerPosition } from '@/domains/players/catalog/positions'
import { getPlayerPositionLabel } from '@/domains/players/catalog/positions'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'

type PlayerCardProps = {
	firstName: string
	lastName: string
	position: PlayerPosition
}

export function PlayerCard({ firstName, lastName, position }: PlayerCardProps) {
	return (
		<Card className="flex flex-row items-center justify-between gap-4">
			<CardHeader className="flex-1">
				<CardTitle>
					{firstName} {lastName}
				</CardTitle>
				<CardDescription>{getPlayerPositionLabel(position)}</CardDescription>
			</CardHeader>
			<CardContent>
				<ChevronRightIcon aria-hidden />
			</CardContent>
		</Card>
	)
}
