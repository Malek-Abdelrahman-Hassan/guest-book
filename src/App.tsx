import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WeddingDetails from "./components/WeddingDetails";
import GuestBook from "./components/GuestBook";
import PhotoUpload from "./components/PhotoUpload";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-felt-dark">
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
