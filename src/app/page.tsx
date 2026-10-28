import Background from "@/components/Background";
import BirthdayCake from "@/components/BirthdayCake";
import { CelebrationProvider } from "@/components/CelebrationContext";
import Footer from "@/components/Footer";
import GiftIntro from "@/components/GiftIntro";
import Hero from "@/components/Hero";
import MessageCard from "@/components/MessageCard";
import MusicToggle from "@/components/MusicToggle";
import PhotoGallery from "@/components/PhotoGallery";

export default function Home() {
  return (
    <CelebrationProvider>
      <Background />
      <GiftIntro />
      <main>
        <Hero />
        <MessageCard />
        <PhotoGallery />
        <BirthdayCake />
        <Footer />
      </main>
      <MusicToggle />
    </CelebrationProvider>
  );
}
