import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "./services/useAuth.tsx";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    // auth will initially be undefined
    // We'll be passing down the auth state from within a React component
    auth: undefined!,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  console.log("auth inner app", auth);
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </>
  );
}

export default App;
