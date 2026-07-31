import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({
  children,
}: PageContainerProps) {
  return (
    <main className="mt-16 flex-1 h-[calc(100vh-4rem)] overflow-y-auto p-6">
      {children}
    </main>
  );
}