import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/account/home"!</div>
}
