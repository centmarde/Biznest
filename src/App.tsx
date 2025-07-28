import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Hero from "./pages/hero";
import MoreInfo from "./pages/moreInfo";
import Home from "./pages/home";
import Map from "./pages/map";
import MapPage from "./pages/map_ai";
import MaintenanceCards from "./pages/maintenance";
import ModelsPage from "./pages/models";
import BiznestForm from "./pages/biznest/form";
import UserPage from "./pages/user";
import NotFound from "./pages/not_found";
import { useUserAuth } from "./auth/userAuth";

function App() {
  const { role } = useUserAuth();
  return (
    <>
      <Router>
        <Routes>
          {/* outside pages */}
          <Route path="/" element={<Hero />} />
          {/*  end of outside  pages*/}

          {/* inside  pages*/}
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/more-info" element={<MoreInfo />} />
          <Route
            path="/home"
            element={
              role === "LGU" ? <Home /> : <Navigate to="/not-found" replace />
            }
          />
          <Route
            path="/user"
            element={
              role === "LGU" ? <UserPage /> : <Navigate to="/not-found" replace />
            }
          />
          <Route
            path="/maps/view"
            element={
              role === "LGU" ? (
                <Map />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          <Route
            path="/maps/ai"
            element={
              role === "LGU" ? (
                <MapPage />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          <Route
            path="/maintenance"
            element={
              role === "LGU" ? (
                <MaintenanceCards />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          <Route
            path="/models"
            element={
              role === "LGU" ? (
                <ModelsPage />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          <Route
            path="/biznest/form"
            element={
              role === "BusinessOwner" ? (
                <BiznestForm />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          {/* inside */}
          {/* Add more routes as needed */}
          {/* catch-all route for unmatched paths */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
