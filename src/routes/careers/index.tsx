import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ChevronRight, PlusIcon } from 'lucide-react'
import { requireAuth } from '@/integrations/supabase/auth-guard'
import { playerQueries } from '@/domains/players/queries/players'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { getPlayerPositionLabel } from '@/domains/players/catalog/positions'
import { Button } from '@/shared/components/ui/button'
import {
	Header,
	HeaderActions,
	HeaderTitle,
} from '@/shared/components/dashboard/header'
import { Shell, ShellContent } from '@/shared/components/dashboard/shell'
import {
	CardList,
	CardListEmpty,
	CardListItem,
	CardListSkeleton,
} from '@/shared/components/dashboard/card-list'

export const Route = createFileRoute('/careers/')({
	beforeLoad: requireAuth,
	component: RouteComponent,
})

function RouteComponent() {
	const { data: players, isLoading: isLoadingPlayers } = useQuery({
		...playerQueries.all(),
		throwOnError: true,
		refetchOnWindowFocus: false,
	})

	return (
		<Shell>
			<ShellContent>
				<Header>
					<HeaderTitle>Minhas carreiras</HeaderTitle>
					<HeaderActions>
						<Button
							nativeButton={false}
							render={
								<Link title="Adicionar carreira" to="/careers/create">
									<PlusIcon aria-hidden />
								</Link>
							}
						/>
					</HeaderActions>
				</Header>

				{isLoadingPlayers ? (
					<CardListSkeleton count={4} />
				) : players ? (
					players.length > 0 ? (
						<CardList>
							{players.map((player) => (
								<CardListItem key={player.id}>
									<Link
										to="/players/$playerId"
										title={`Ver carreira do jogador ${player.first_name} ${player.last_name}`}
										params={{ playerId: player.id }}
									>
										<Card className="flex flex-row items-center justify-between gap-4">
											<CardHeader className="flex-1">
												<CardTitle>
													{player.first_name} {player.last_name}
												</CardTitle>
												<CardDescription>
													{getPlayerPositionLabel(player.position)}
												</CardDescription>
											</CardHeader>
											<CardContent>
												<ChevronRight aria-hidden />
											</CardContent>
										</Card>
									</Link>
								</CardListItem>
							))}
						</CardList>
					) : (
						<CardListEmpty>
							Você ainda não possui nenhuma carreira cadastrada. Clique no botão
							acima para adicionar uma nova carreira.
						</CardListEmpty>
					)
				) : null}
			</ShellContent>
		</Shell>
	)
}
