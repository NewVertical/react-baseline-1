import { createFileRoute } from "@tanstack/react-router";
import { Login } from "../pages/Login.tsx";
import { LoginLayout } from "../layouts/login_layout.tsx";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <LoginLayout>
      <Login />
    </LoginLayout>
  );
}
