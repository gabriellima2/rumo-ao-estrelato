import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ChevronRight, PlusIcon } from 'lucide-react'
import type { PlayerPosition } from '@/domains/players/catalog/positions'
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

export const Route = createFileRoute('/players/')({
	beforeLoad: requireAuth,
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Shell>
			<ShellContent>
				<Header>
					<HeaderTitle>Meus jogadores</HeaderTitle>
					<HeaderActions>
						<Button
							nativeButton={false}
							render={
								<Link title="Adicionar jogador" to="/players/create">
									<PlusIcon aria-hidden />
								</Link>
							}
						/>
					</HeaderActions>
				</Header>

				<PlayersList />
			</ShellContent>
		</Shell>
	)
}

const PlayersList = () => {
	const { data: players, isLoading: isLoadingPlayers } = useQuery({
		...playerQueries.all(),
		throwOnError: true,
		refetchOnWindowFocus: false,
	})

	return (
		<>
			{isLoadingPlayers ? (
				<CardListSkeleton count={4} />
			) : players ? (
				players.length > 0 ? (
					<CardList>
						{players.map((player) => (
							<PlayerCard
								key={player.id}
								id={player.id}
								firstName={player.first_name}
								lastName={player.last_name}
								position={player.position}
							/>
						))}
					</CardList>
				) : (
					<CardListEmpty>
						Você ainda não possui nenhum jogador cadastrado. Clique no botão
						acima para adicionar um novo jogador
					</CardListEmpty>
				)
			) : null}
		</>
	)
}

const PlayerCard = ({
	id,
	firstName,
	lastName,
	position,
}: {
	id: string
	firstName: string
	lastName: string
	position: PlayerPosition
}) => {
	return (
		<CardListItem key={id}>
			<Link
				to="/players/$playerId"
				title={`Ver jogador ${firstName} ${lastName}`}
				params={{ playerId: id }}
			>
				<Card className="flex flex-row items-center justify-between gap-4">
					<CardHeader className="flex-1">
						<CardTitle>
							{firstName} {lastName}
						</CardTitle>
						<CardDescription>
							{getPlayerPositionLabel(position)}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ChevronRight aria-hidden />
					</CardContent>
				</Card>
			</Link>
		</CardListItem>
	)
}
