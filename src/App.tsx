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
import BiznestStartingForm from "./pages/biznest/starting-form";
import LotAnalysisForm from "./pages/biznest/forms/LotAnalysisForm";
import BusinessIdeaForm from "./pages/biznest/forms/BusinessIdeaForm";
import ExpansionForm from "./pages/biznest/forms/ExpansionForm";
import SpaceSearchForm from "./pages/biznest/forms/SpaceSearchForm";
import LotAnalysisResult from "./pages/biznest/forms/LotAnalysisResult";
import BusinessIdeaResult from "./pages/biznest/forms/BusinessIdeaResult";
import ExpansionResult from "./pages/biznest/forms/ExpansionResult";
import SpaceSearchResult from "./pages/biznest/forms/SpaceSearchResult";
import UserPage from "./pages/user";
import SettingsPage from "./pages/settings";
import AccountPage from "./pages/account";
import NotFound from "./pages/not_found";
import { useUserAuth } from "./auth/userAuth";
import OldBusinessStatistics from "./pages/old_stats/statistics";
import NewBusinessStatistics from "./pages/new_stats/statistics";
import LotForLeaseForm from "./pages/biznest/forms/lot-for-lease";

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
              role === "LGU" ? (
                <UserPage />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          <Route
            path="/maps/view"
            element={
              role === "LGU" ? <Map /> : <Navigate to="/not-found" replace />
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
            path="/biznest/startingform"
            element={
              role === "BusinessOwner" ? (
                <BiznestStartingForm />
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
          <Route
            path="/new-stats/statistics"
            element={
              role === "LGU" ? (
                <NewBusinessStatistics />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          <Route
            path="/old-stats/statistics"
            element={
              role === "LGU" ? (
                <OldBusinessStatistics />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          <Route
            path="/biznest/forms/lot-for-lease"
            element={
              role === "BusinessOwner" ? (
                <LotForLeaseForm />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          <Route
            path="/biznest/forms/lot-analysis"
            element={
              role === "BusinessOwner" ? (
                <LotAnalysisForm />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          <Route
            path="/biznest/forms/business-idea"
            element={
              role === "BusinessOwner" ? (
                <BusinessIdeaForm />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          <Route
            path="/biznest/forms/expansion"
            element={
              role === "BusinessOwner" ? (
                <ExpansionForm />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          <Route
            path="/biznest/forms/space-search"
            element={
              role === "BusinessOwner" ? (
                <SpaceSearchForm />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          <Route
            path="/biznest/lot-analysis-result"
            element={
              role === "BusinessOwner" ? (
                <LotAnalysisResult />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          <Route
            path="/biznest/business-idea-result"
            element={
              role === "BusinessOwner" ? (
                <BusinessIdeaResult />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          <Route
            path="/biznest/expansion-result"
            element={
              role === "BusinessOwner" ? (
                <ExpansionResult />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          <Route
            path="/biznest/space-search-result"
            element={
              role === "BusinessOwner" ? (
                <SpaceSearchResult />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          <Route
            path="/settings"
            element={
              role === "LGU" || role === "BusinessOwner" ? (
                <SettingsPage />
              ) : (
                <Navigate to="/not-found" replace />
              )
            }
          />
          <Route
            path="/account"
            element={
              role === "LGU" || role === "BusinessOwner" ? (
                <AccountPage />
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
