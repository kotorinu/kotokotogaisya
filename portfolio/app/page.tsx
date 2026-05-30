import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import CaseStudies from "@/components/CaseStudies";
import Works from "@/components/Works";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import Profile from "@/components/Profile";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Stats />
        <CaseStudies />
        <Works />
        <Testimonials />
        <Process />
        <Faq />
        <Profile />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
