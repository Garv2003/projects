import React from "react";
import Analyses from "@/components/Analyses";
import RecentOrders from "@/components/RecentOrders";
import NewUser from "@/components/NewUser";

const MainContent = () => {
  return (
    <main>
      <h1>Analytics</h1>
      <Analyses />
      <NewUser />
      <RecentOrders />
    </main>
  );
};

export default MainContent;
