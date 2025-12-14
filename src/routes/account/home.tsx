import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <h1>This is the home page</h1>
  </div>
}
