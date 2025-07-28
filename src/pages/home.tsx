import { DashboardShell } from "@/components/home/dashboardshell"
import { ApprovalTable } from "@/components/home/approvaltable"
import { OverviewCards } from "@/components/home/overviewcards"
import { SiteAnalytics } from "@/components/home/siteanalytics"
import { BusinessZones } from "@/components/home/zoningspot"
import { ZoningActivity } from "@/components/home/zoningactivity"
import DefaultLayout from "@/layout/default"
import ChatButton from "@/components/AIrelated/ChatButton"
import { Suspense } from "react"
import { ZoningCrud } from "@/components/home/zoning-crud"

export default function DashboardPage() {
  return (
    <DefaultLayout>
      <div className="flex min-h-screen flex-col">
        <div className="flex-1">
          <DashboardShell>
            <div className="flex flex-col gap-6">
              <OverviewCards />
              <ZoningCrud />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Suspense
                  fallback={<div className="h-[300px] flex items-center justify-center">Loading analytics...</div>}
                >
                  <SiteAnalytics />
                </Suspense>
                <Suspense
                  fallback={<div className="h-[300px] flex items-center justify-center">Loading activity...</div>}
                >
                  <ZoningActivity />
                </Suspense>
              </div>
              <ApprovalTable/>
              <BusinessZones />
            </div>
          </DashboardShell>
        </div>
      </div>
      <ChatButton />
    </DefaultLayout>
  )
}
