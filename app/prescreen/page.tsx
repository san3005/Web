import Prescreen from "./prescreen"; // Ensure this is correctly imported
import Navbar from "./navbar";
import Foooter from "@/components/ui/footer";

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      <Prescreen />
      <Foooter />
    </div>
  );
}
