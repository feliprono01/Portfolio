import SkinSelector from "@/components/ui/SkinSelector";
import TitleScreen from "@/components/hub/TitleScreen";
import LevelSelect from "@/components/hub/LevelSelect";
import Footer from "@/components/sections/Footer";

export default function HubPage() {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[100] flex justify-end p-4">
        <SkinSelector />
      </header>
      <main>
        <TitleScreen />
        <LevelSelect />
      </main>
      <Footer />
    </>
  );
}
