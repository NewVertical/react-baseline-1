import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_auth")({
  component: RouteComponent,
  beforeLoad: ({ context, location }: { context: any; location: any }) => {
    console.log("auth in _auth", context.auth.isAuthenticated());
    if (!context.auth.isAuthenticated()) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
