import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useUserAuth } from "./auth/userAuth";
import Loader from "./components/loader";
import { routes } from "./lib/router";

function App() {
  const { role } = useUserAuth();

  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <Loader />
          </div>
        }
      >
        <Routes>
          {routes.map(({ path, component: Component, roles }) => {
            // Public route — no role guard
            if (roles === null) {
              return <Route key={path} path={path} element={<Component />} />;
            }

            // Protected route — redirect to /not-found when role doesn't match
            return (
              <Route
                key={path}
                path={path}
                element={
                  role && roles.includes(role) ? (
                    <Component />
                  ) : (
                    <Navigate to="/not-found" replace />
                  )
                }
              />
            );
          })}

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
