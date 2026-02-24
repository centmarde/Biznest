import { lazy } from "react";

// Public pages
export const Landing = lazy(() => import("@/pages/landing"));
export const Hero = lazy(() => import("@/pages/hero"));
export const MoreInfo = lazy(() => import("@/pages/moreInfo"));
export const NotFound = lazy(() => import("@/pages/not_found"));

// LGU pages
export const Home = lazy(() => import("@/pages/home"));
export const UserPage = lazy(() => import("@/pages/user"));
export const Map = lazy(() => import("@/pages/map"));
export const MapPage = lazy(() => import("@/pages/map_ai"));
export const MaintenanceCards = lazy(() => import("@/pages/maintenance"));
export const ModelsPage = lazy(() => import("@/pages/models"));
export const NewBusinessStatistics = lazy(
  () => import("@/pages/new_stats/statistics")
);
export const OldBusinessStatistics = lazy(
  () => import("@/pages/old_stats/statistics")
);

// BusinessOwner pages
export const BiznestForm = lazy(() => import("@/pages/biznest/form"));
export const BiznestStartingForm = lazy(
  () => import("@/pages/biznest/starting-form")
);
export const LotForLeaseForm = lazy(
  () => import("@/pages/biznest/forms/lot-for-lease")
);
export const LotAnalysisForm = lazy(
  () => import("@/pages/biznest/forms/LotAnalysisForm")
);
export const BusinessIdeaForm = lazy(
  () => import("@/pages/biznest/forms/BusinessIdeaForm")
);
export const ExpansionForm = lazy(
  () => import("@/pages/biznest/forms/ExpansionForm")
);
export const SpaceSearchForm = lazy(
  () => import("@/pages/biznest/forms/SpaceSearchForm")
);
export const SupplierMatchForm = lazy(
  () => import("@/pages/biznest/forms/SupplierMatchForm")
);
export const LotAnalysisResult = lazy(
  () => import("@/pages/biznest/forms/LotAnalysisResult")
);
export const BusinessIdeaResult = lazy(
  () => import("@/pages/biznest/forms/BusinessIdeaResult")
);
export const ExpansionResult = lazy(
  () => import("@/pages/biznest/forms/ExpansionResult")
);
export const SpaceSearchResult = lazy(
  () => import("@/pages/biznest/forms/SpaceSearchResult")
);
export const SupplierMatchResult = lazy(
  () => import("@/pages/biznest/forms/SupplierMatchResult")
);

// Shared pages
export const SettingsPage = lazy(() => import("@/pages/settings"));
export const AccountPage = lazy(() => import("@/pages/account"));

// Route definitions
export interface RouteDefinition {
  path: string;
  component: ReturnType<typeof lazy>;
  /** null = public, otherwise role(s) required */
  roles: string[] | null;
}

export const routes: RouteDefinition[] = [
  // Public
  { path: "/", component: Landing, roles: null },
  { path: "/auth", component: Hero, roles: null },
  { path: "/more-info", component: MoreInfo, roles: null },
  { path: "/not-found", component: NotFound, roles: null },

  // LGU only
  { path: "/home", component: Home, roles: ["LGU"] },
  { path: "/user", component: UserPage, roles: ["LGU"] },
  { path: "/maps/view", component: Map, roles: ["LGU"] },
  { path: "/maps/ai", component: MapPage, roles: ["LGU"] },
  { path: "/maintenance", component: MaintenanceCards, roles: ["LGU"] },
  { path: "/models", component: ModelsPage, roles: ["LGU"] },
  {
    path: "/new-stats/statistics",
    component: NewBusinessStatistics,
    roles: ["LGU"],
  },
  {
    path: "/old-stats/statistics",
    component: OldBusinessStatistics,
    roles: ["LGU"],
  },

  // BusinessOwner only
  {
    path: "/biznest/startingform",
    component: BiznestStartingForm,
    roles: ["BusinessOwner"],
  },
  { path: "/biznest/form", component: BiznestForm, roles: ["BusinessOwner"] },
  {
    path: "/biznest/forms/lot-for-lease",
    component: LotForLeaseForm,
    roles: ["BusinessOwner"],
  },
  {
    path: "/biznest/forms/lot-analysis",
    component: LotAnalysisForm,
    roles: ["BusinessOwner"],
  },
  {
    path: "/biznest/forms/business-idea",
    component: BusinessIdeaForm,
    roles: ["BusinessOwner"],
  },
  {
    path: "/biznest/forms/expansion",
    component: ExpansionForm,
    roles: ["BusinessOwner"],
  },
  {
    path: "/biznest/forms/space-search",
    component: SpaceSearchForm,
    roles: ["BusinessOwner"],
  },
  {
    path: "/biznest/forms/supplier-match",
    component: SupplierMatchForm,
    roles: ["BusinessOwner"],
  },
  {
    path: "/biznest/lot-analysis-result",
    component: LotAnalysisResult,
    roles: ["BusinessOwner"],
  },
  {
    path: "/biznest/business-idea-result",
    component: BusinessIdeaResult,
    roles: ["BusinessOwner"],
  },
  {
    path: "/biznest/expansion-result",
    component: ExpansionResult,
    roles: ["BusinessOwner"],
  },
  {
    path: "/biznest/space-search-result",
    component: SpaceSearchResult,
    roles: ["BusinessOwner"],
  },
  {
    path: "/biznest/supplier-match-result",
    component: SupplierMatchResult,
    roles: ["BusinessOwner"],
  },

  // Shared (LGU + BusinessOwner)
  {
    path: "/settings",
    component: SettingsPage,
    roles: ["LGU", "BusinessOwner"],
  },
  {
    path: "/account",
    component: AccountPage,
    roles: ["LGU", "BusinessOwner"],
  },
];
