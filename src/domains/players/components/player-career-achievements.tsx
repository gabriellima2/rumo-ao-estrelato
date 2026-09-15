import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { PlayerCareerAchievementGroup } from '../utils/group-player-achievements'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
import {
	CardList,
	CardListEmpty,
	CardListItem,
	CardListSkeleton,
} from '@/shared/components/dashboard/card-list'

type PlayerCareerAchievementsProps = {
	achievementGroups: PlayerCareerAchievementGroup[]
}

export function PlayerCareerAchievements({
	achievementGroups,
}: PlayerCareerAchievementsProps) {
	const [expandedGroupKey, setExpandedGroupKey] = useState<string | null>(null)

	function toggleGroup(key: string) {
		setExpandedGroupKey((current) => (current === key ? null : key))
	}

	if (achievementGroups.length === 0) {
		return <CardListEmpty align="left">Nenhum título registrado</CardListEmpty>
	}

	return (
		<CardList>
			{achievementGroups.map((group) => {
				const isExpanded = expandedGroupKey === group.key

				return (
					<CardListItem key={group.key}>
						<button
							type="button"
							className="w-full text-left"
							onClick={() => toggleGroup(group.key)}
							aria-expanded={isExpanded}
						>
							<Card
								className={cn(
									'flex flex-row items-center justify-between gap-4',
									isExpanded && 'border-primary/40',
								)}
							>
								<CardHeader className="flex-1">
									<CardTitle>{group.label}</CardTitle>
									<CardDescription>
										{group.count} {group.count === 1 ? 'título' : 'títulos'}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ChevronDown
										className={cn(
											'transition-transform duration-200',
											isExpanded && 'rotate-180',
										)}
									/>
								</CardContent>
							</Card>
						</button>
						{isExpanded ? (
							<ul className="mt-2 ml-3 space-y-2 border-l pl-4">
								{group.items.map((item) => (
									<li key={item.id} className="bg-card rounded-lg border p-3">
										<p className="text-sm font-medium">{item.name}</p>
										<p className="text-muted-foreground text-xs">
											{item.seasonTitle} · {item.clubName}
										</p>
									</li>
								))}
							</ul>
						) : null}
					</CardListItem>
				)
			})}
		</CardList>
	)
}

export function PlayerCareerAchievementsSkeleton() {
	return <CardListSkeleton count={2} />
}
