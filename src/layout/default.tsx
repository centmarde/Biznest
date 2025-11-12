import * as React from "react";
import { MainSidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import styled from "styled-components";
import { useIsMobile } from "@/utils/mobile";
import MobileNavbar from "@/components/mobile-navbar";
import { useTheme } from "@/theme/theme";

// Update the type definitions for styled components to include the isMobile prop
interface LayoutProps {
  isMobile?: boolean;
  backgroundColor?: string;
}

const LayoutContainer = styled.div<LayoutProps>`
  display: flex;
  height: 100vh; /* Use fixed height instead of min-height */
  width: 100%;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  position: relative;
  overflow: hidden; /* Hide overflow at container level */
  background-color: ${(props) => props.backgroundColor};
`;

const ContentArea = styled.main<LayoutProps>`
  flex: 1;
  padding: ${(props) =>
    props.isMobile
      ? "calc(60px + 1rem) 1rem calc(64px + 1rem) 1rem"
      : "1.5rem"};
  /* On mobile, add bottom padding to prevent MobileNavbar overlap (navbar height is 64px) */
  overflow-y: auto;
  min-width: 0; /* Prevent flex item from overflowing */
  background-color: ${(props) => props.backgroundColor};
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
  const theme = useTheme();

  return (
    <LayoutContainer
      isMobile={isMobile}
      backgroundColor={theme.colors.background}
    >
      {!isMobile && (
        <SidebarWrapper>
          <MainSidebar isMobile={isMobile} />
        </SidebarWrapper>
      )}
      {isMobile && <MainSidebar isMobile={isMobile} />}
      <ContentArea
        isMobile={isMobile}
        backgroundColor={theme.colors.background}
      >
        <Navbar />
        {children}
      </ContentArea>
      {isMobile && <MobileNavbar activeTab="dashboard" />}
    </LayoutContainer>
  );
}
