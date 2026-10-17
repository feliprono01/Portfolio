import type { Metadata } from "next";
import Hud from "@/components/hud/Hud";
import LevelNav from "@/components/hud/LevelNav";
import Projects from "@/components/sections/Projects";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Estante de cartuchos: proyectos reales de Felipe Prono, de punta a punta.",
};

export default function ProyectosPage() {
  return (
    <>
      <Hud sectionId="projects" />
      <main>
        <Projects />
      </main>
      <LevelNav sectionId="projects" />
      <Footer />
    </>
  );
}
