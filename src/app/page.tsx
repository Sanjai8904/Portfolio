import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Now } from "@/components/sections/Now";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Experience />
        <Education />
        <Skills />
        <Now />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
