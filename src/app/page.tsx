import { DemoSection } from "@/components/common/DemoSection";
import { LandingSection } from "@/components/common/LandingSection";
import { UsageSection } from "@/components/common/UsageSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <LandingSection />
      <DemoSection />
      <UsageSection />
    </main>
  );
}
