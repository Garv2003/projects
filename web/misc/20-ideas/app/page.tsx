import { Tabs } from "@/components";
import { Suspense } from "react";

const Home = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-50 w-full">
          Loading...
        </div>
      }
    >
      <Tabs />
    </Suspense>
  );
};

export default Home;
