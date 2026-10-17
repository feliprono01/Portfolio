import type { Metadata } from "next";
import Hud from "@/components/hud/Hud";
import LevelNav from "@/components/hud/LevelNav";
import Certifications from "@/components/sections/Certifications";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Certificaciones",
  description: "Títulos oficiales y certificados de Felipe Prono.",
};

export default function CertificacionesPage() {
  return (
    <>
      <Hud sectionId="certifications" />
      <main>
        <Certifications />
      </main>
      <LevelNav sectionId="certifications" />
      <Footer />
    </>
  );
}
