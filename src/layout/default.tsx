import * as React from "react"
import { MainSidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import styled from "styled-components"
import { useIsMobile } from "@/utils/mobile"
import MobileNavbar from "@/components/mobile-navbar";

// Update the type definitions for styled components to include the isMobile prop
interface LayoutProps {
  isMobile?: boolean;
}

const LayoutContainer = styled.div<LayoutProps>`
  display: flex;
  height: 100vh; /* Use fixed height instead of min-height */
  width: 100%;
  flex-direction: ${props => props.isMobile ? "column" : "row"};
  position: relative;
  overflow: hidden; /* Hide overflow at container level */
`;

const ContentArea = styled.main<LayoutProps>`
  flex: 1;
  padding: ${props => props.isMobile ? "calc(60px + 1rem) 1rem 1rem 1rem" : "1.5rem"};
  overflow-y: auto;
  min-width: 0; /* Prevent flex item from overflowing */
`;

const SidebarWrapper = styled.div`
  height: 100vh;
  position: sticky;
  top: 0;
  flex-shrink: 0; /* Prevent sidebar from shrinking */
`;

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <LayoutContainer isMobile={isMobile}>
      {!isMobile && (
        <SidebarWrapper>
          <MainSidebar isMobile={isMobile} />
        </SidebarWrapper>
      )}
      {isMobile && <MainSidebar isMobile={isMobile} />}
      <ContentArea isMobile={isMobile}>
        <Navbar />
        {children}
      </ContentArea>
      {isMobile && <MobileNavbar activeTab="dashboard" />}
    </LayoutContainer>
  );
}
