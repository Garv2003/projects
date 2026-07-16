"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useIdeas } from "../hooks/useIdeas";
import { useSearchParams } from "next/navigation";
import IdeasList from "./IdeasList";

const Tabs = () => {
  const { ideas, loading, error } = useIdeas();
  const [activeTab, setActiveTab] = useState("hot");
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab") || "hot";
    setActiveTab(tab);
  }, [searchParams]);

  const filterIdeas = () => {
    switch (activeTab) {
      case "new":
        return ideas
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      case "top":
        return ideas.slice().sort((a, b) => b.votes - a.votes);
      default:
        return ideas;
    }
  };

  if (loading) {
    return <p className="text-lg font-bold text-center mt-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-lg font-bold text-center mt-10">{error}</p>;
  }

  return (
    <div>
      <div role="tablist" className="tabs tabs-boxed">
        <Link
          href="/?tab=hot"
          className={`tab text-lg font-bold ${
            activeTab === "hot" ? "tab-active" : ""
          }`}
        >
          {" "}
          🔥Hot
        </Link>
        <Link
          href="/?tab=new"
          className={`tab text-lg font-bold ${
            activeTab === "new" ? "tab-active" : ""
          }`}
        >
          💫New
        </Link>
        <Link
          href="/?tab=top"
          className={`tab text-lg font-bold ${
            activeTab === "top" ? "tab-active" : ""
          }`}
        >
          🏆Top
        </Link>
      </div>
      <IdeasList ideas={filterIdeas()} />
    </div>
  );
};

export default Tabs;
