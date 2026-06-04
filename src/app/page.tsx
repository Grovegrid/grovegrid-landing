import { BackgroundEffects } from "@/components/BackgroundEffects";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechTicker } from "@/components/TechTicker";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { Team } from "@/components/Team";
import { RecentWork } from "@/components/RecentWork";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <BackgroundEffects />
      <Hero />
      <TechTicker />
      <Services />
      <RecentWork />
      <HowItWorks />
      <Stats />
      {/* <Testimonials /> */}
      {/* <Team /> */}
      <Contact />
      <Footer />
      <Chatbot />
    </main>
  );
}
