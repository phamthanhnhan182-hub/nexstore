import { Navbar } from "@/components/shared/Navbar";
import { AIChatAssistant } from "@/components/shared/AIChatAssistant";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <AIChatAssistant />
    </div>
  );
}
