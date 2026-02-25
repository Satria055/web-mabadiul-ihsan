import Hero from "@/components/home/Hero";
import FloatingCards from "@/components/home/FloatingCards";
import Stats from "@/components/home/Stats";
import EducationUnits from "@/components/home/EducationUnits";
import Achievements from "@/components/home/Achievements";
import NewsSection from "@/components/home/NewsSection";
import Partners from "@/components/home/Partners";
import RegistrationFlow from "@/components/home/RegistrationFlow";
import Testimonials from "@/components/home/Testimonials";
// HAPUS import CallToAction dari sini

export default function Home() {
  return (
    <>
      <Hero />
      <FloatingCards />
      <Stats />
      <EducationUnits />
      <Achievements />
      <NewsSection />
      <Partners />
      <RegistrationFlow />
      <Testimonials />

    </>
  );
}