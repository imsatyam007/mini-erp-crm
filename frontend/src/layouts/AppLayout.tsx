import type { ReactNode } from "react";

import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import Sidebar from "@/components/layout/Sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="ml-64 flex flex-1 flex-col">
        <Header />

        <PageContainer>{children}</PageContainer>
      </div>
    </div>
  );
}