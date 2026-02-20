import { HeroSection } from "@/components/landing/hero-section";
import { PipelineSection } from "@/components/landing/pipeline-section";
import { MethodologiesSection } from "@/components/landing/methodologies-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PipelineSection />
      <MethodologiesSection />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
