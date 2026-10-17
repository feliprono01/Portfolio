import type { Metadata } from "next";
import Hud from "@/components/hud/Hud";
import LevelNav from "@/components/hud/LevelNav";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Enviale un mensaje a Felipe Prono.",
};

export default function ContactoPage() {
  return (
    <>
      <Hud sectionId="contact" />
      <main>
        <Contact />
      </main>
      <LevelNav sectionId="contact" />
      <Footer />
    </>
  );
}
