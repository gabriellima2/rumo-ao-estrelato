import { ChevronRightIcon } from 'lucide-react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'

type PlayerSeasonCardProps = {
	isCurrent: boolean
	title: string
	playerClubName: string
}

export function PlayerSeasonCard({
	isCurrent,
	title,
	playerClubName,
}: PlayerSeasonCardProps) {
	return (
		<Card
			className={cn('flex flex-row items-center justify-between gap-4', {
				'bg-accent text-accent-foreground': isCurrent,
			})}
		>
			<CardHeader className="flex-1">
				<CardTitle>
					{title} {isCurrent ? '(Atual)' : ''}
				</CardTitle>
				<CardDescription>{playerClubName}</CardDescription>
			</CardHeader>
			<CardContent>
				<ChevronRightIcon aria-hidden />
			</CardContent>
		</Card>
	)
}
