import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { playerQueries } from '@/domains/players/queries/players'
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
import { PlayerCard } from '@/domains/players/components/cards/player-card'
import { SignOutButton } from '@/shared/components/buttons/sign-out-button'

export const Route = createFileRoute('/_protected/players/')({
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
						<SignOutButton />
					</HeaderActions>
				</Header>

				<PlayersList />
			</ShellContent>
		</Shell>
	)
}

function PlayersList() {
	const { data: players, isLoading: isLoadingPlayers } = useQuery({
		...playerQueries.all(),
		throwOnError: true,
	})

	return (
		<>
			{isLoadingPlayers ? (
				<CardListSkeleton count={4} />
			) : players ? (
				players.length > 0 ? (
					<CardList>
						{players.map((player) => (
							<CardListItem key={player.id}>
								<Link
									to="/players/$playerId"
									title={`Ver jogador ${player.first_name} ${player.last_name}`}
									params={{ playerId: player.id }}
								>
									<PlayerCard
										firstName={player.first_name}
										lastName={player.last_name}
										position={player.position}
									/>
								</Link>
							</CardListItem>
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
