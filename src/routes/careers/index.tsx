import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ChevronRight, LogOut } from 'lucide-react'
import { requireAuth } from '@/integrations/supabase/auth-guard'
import { useAuth } from '@/integrations/supabase/auth-context'
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
import { Skeleton } from '@/shared/components/ui/skeleton'

export const Route = createFileRoute('/careers/')({
	beforeLoad: requireAuth,
	component: RouteComponent,
})

function RouteComponent() {
	const { signOut } = useAuth()

	const { data: players, isLoading: isLoadingPlayers } = useQuery({
		...playerQueries.all(),
		throwOnError: true,
		refetchOnWindowFocus: false,
	})

	return (
		<main className="flex h-full flex-col items-center px-4 py-8">
			<div className="w-full max-w-2xl space-y-4">
				<header className="flex flex-row items-center justify-between gap-4">
					<h1 className="text-lg font-medium">Minhas carreiras</h1>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => signOut()}
							title="Sair"
						>
							<LogOut />
						</Button>
						<Button
							nativeButton={false}
							render={<Link to="/careers/create">Adicionar carreira</Link>}
						/>
					</div>
				</header>
				{isLoadingPlayers ? (
					<div className="space-y-4">
						<Skeleton className="h-19.5" />
						<Skeleton className="h-19.5" />
						<Skeleton className="h-19.5" />
						<Skeleton className="h-19.5" />
					</div>
				) : players ? (
					players.length >= 1 ? (
						<ul className="space-y-4">
							{players.map((player) => (
								<li key={player.id}>
									<Link
										to="/players/$playerId"
										params={{ playerId: player.id }}
									>
										<Card className="flex flex-row items-center justify-between gap-4">
											<CardHeader className="flex-1">
												<CardTitle>
													{player.first_name} {player.last_name}
												</CardTitle>
												<CardDescription>
													{getPlayerPositionLabel(player.position)} -{' '}
													{player.country_name}
												</CardDescription>
											</CardHeader>
											<CardContent>
												<ChevronRight />
											</CardContent>
										</Card>
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p>Nenhuma carreira encontrada!</p>
					)
				) : null}
			</div>
		</main>
	)
}
