import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-career')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/create-career"!</div>
}
