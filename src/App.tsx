import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WeddingDetails from "./components/WeddingDetails";
import GuestBook from "./components/GuestBook";
import PhotoUpload from "./components/PhotoUpload";
import Footer from "./components/Footer";
import BackgroundMusic from "./components/BackgroundMusic";

export default function App() {
  return (
    <div className="min-h-screen bg-felt-dark">
      <BackgroundMusic />
      <Navbar />
      <main>
        <Hero />
        <WeddingDetails />
        <GuestBook />
        <PhotoUpload />
      </main>
      <Footer />
    </div>
  );
}
