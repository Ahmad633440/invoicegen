import { Navbar } from "@/components/navbar";
import { LandingPage } from "@/components/landing-page";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <LandingPage />
    </div>
  );
}
