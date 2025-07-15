import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/confirm-otp')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/confirm-otp"!</div>
}
