import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/players/seasons/$seasonId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/players/seasons/$seasonId"!</div>
}
