import { Dashboard } from "../../pages/Dashboard.tsx";
import { useContext } from "react";
import { AuthContext } from "../../services/useAuth.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "../../layouts/app_layout.tsx";

export const Route = createFileRoute("/(app)/_auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  const context = useContext(AuthContext);
  return (
    <>
      <AppLayout>
        <Dashboard context={context} />
      </AppLayout>
    </>
  );
}
