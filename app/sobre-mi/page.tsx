import type { Metadata } from "next";
import Hud from "@/components/hud/Hud";
import LevelNav from "@/components/hud/LevelNav";
import About from "@/components/sections/About";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Ficha de personaje de Felipe Prono: filosofía de desarrollo, formación académica y disponibilidad.",
};

export default function SobreMiPage() {
  return (
    <>
      <Hud sectionId="about" />
      <main>
        <About />
      </main>
      <LevelNav sectionId="about" />
      <Footer />
    </>
  );
}
