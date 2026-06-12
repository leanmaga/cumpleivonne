"use client";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import EventDetails from "@/components/EventDetails";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { AudioProvider } from "@/components/AudioContext";
import PageLoader, {
  LoadingProvider,
  useLoading,
} from "@/components/PageLoader";

const MainContent = () => {
  const { isLoading } = useLoading();

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader />}
      </AnimatePresence>

      <div
        className={`w-full min-h-screen bg-gradient-to-br from-quince-50 via-white to-gold-50 ${
          isLoading ? "opacity-0 pointer-events-none absolute" : "opacity-100"
        }`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navigation />

          <main className="w-full overflow-x-hidden">
            <HeroSection />
            <CountdownSection />
            <EventDetails />
            <LocationSection />
            <Footer />
          </main>
        </motion.div>
      </div>
    </>
  );
};

export default function Home() {
  return (
    <LoadingProvider>
      <AudioProvider audioSrc="/Cigarettes.mp3">
        <div className="min-h-screen w-full overflow-x-hidden">
          <MainContent />
        </div>
      </AudioProvider>
    </LoadingProvider>
  );
}
