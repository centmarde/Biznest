import { DashboardShell } from "@/components/home/dashboardshell"
import { MaintenanceTable } from "@/components/home/maintenancetable"
import { OverviewCards } from "@/components/home/overviewcards"
import { SiteAnalytics } from "@/components/home/siteanalytics"
import { TourismSpots } from "@/components/home/tourismspots"
import { TouristActivity } from "@/components/home/touristactivity"
import DefaultLayout from "@/layout/default"
import ChatButton from "@/components/AIrelated/ChatButton"
import { Suspense } from "react"

export default function DashboardPage() {
  return (
    <DefaultLayout>
      <div className="flex min-h-screen flex-col">
        <div className="flex-1">
          <DashboardShell>
            <div className="flex flex-col gap-6">
              <OverviewCards />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Suspense
                  fallback={<div className="h-[300px] flex items-center justify-center">Loading analytics...</div>}
                >
                  <SiteAnalytics />
                </Suspense>
                <Suspense
                  fallback={<div className="h-[300px] flex items-center justify-center">Loading activity...</div>}
                >
                  <TouristActivity />
                </Suspense>
              </div>
              <MaintenanceTable />
              <TourismSpots />
            </div>
          </DashboardShell>
        </div>
      </div>
      <ChatButton />
    </DefaultLayout>
  )
}
