import type { Metadata } from "next";
import Hud from "@/components/hud/Hud";
import LevelNav from "@/components/hud/LevelNav";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Experiencia",
  description: "Registro de misiones de Felipe Prono: proyectos reales de desarrollo full stack.",
};

export default function ExperienciaPage() {
  return (
    <>
      <Hud sectionId="experience" />
      <main>
        <Experience />
      </main>
      <LevelNav sectionId="experience" />
      <Footer />
    </>
  );
}
