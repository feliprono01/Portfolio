import type { Metadata } from "next";
import Hud from "@/components/hud/Hud";
import LevelNav from "@/components/hud/LevelNav";
import Skills from "@/components/sections/Skills";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Habilidades",
  description:
    "Inventario de tecnologías de Felipe Prono, con niveles basados en uso real en proyectos, no en autoevaluación.",
};

export default function HabilidadesPage() {
  return (
    <>
      <Hud sectionId="skills" />
      <main>
        <Skills />
      </main>
      <LevelNav sectionId="skills" />
      <Footer />
    </>
  );
}
