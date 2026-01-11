import { Navbar } from "@/app/components/navbar";
import { Hero } from "@/app/components/sections/hero";
import { About } from "@/app/components/sections/about";
import { TechStack } from "@/app/components/sections/tech-stack";
import { Projects } from "@/app/components/sections/projects";
import { Experience } from "@/app/components/sections/experience";
import { Contact } from "@/app/components/sections/contact";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
