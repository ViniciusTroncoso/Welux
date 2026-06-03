import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import TransformSection from "@/components/TransformSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import FaqSection from "@/components/FaqSection";
import TrustedSection from "@/components/TrustedSection";
import PortfolioSection from "@/components/PortfolioSection";
import ExploreSection from "@/components/ExploreSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <StatsSection />
      <TransformSection />
      <ServicesSection />
      <WhyChooseSection />
      <FaqSection />
      <TrustedSection />
      <PortfolioSection />
      <ExploreSection />
      <CtaSection />
      <Footer />
      <CookieBanner />
    </div>
  );
}
