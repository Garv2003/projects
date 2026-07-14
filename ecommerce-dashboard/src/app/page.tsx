import MainContent from "@/layout/MainContent";
import RightSection from "@/layout/RightSection";
import Sidebar from "@/layout/Sidebar";

export default function Home() {
  return (
    <div className="container">
      <Sidebar />
      <MainContent />
      <RightSection />
    </div>
  );
}
