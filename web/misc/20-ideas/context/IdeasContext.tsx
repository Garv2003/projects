"use client";
import { createContext, useState, useEffect } from "react";
import { IdeasSchema } from "@/utils/schema";

type IdeasContextType = {
  ideas: IdeasSchema[];
  setIdeas: React.Dispatch<React.SetStateAction<IdeasSchema[]>>;
  loading: boolean;
  error: string | null;
};

export const IdeasContext = createContext<IdeasContextType>({
  ideas: [],
  setIdeas: () => {},
  loading: true,
  error: null,
});

export const IdeasProvider = ({ children }: { children: React.ReactNode }) => {
  const [ideas, setIdeas] = useState<IdeasSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchIdeas() {
    try {
      const res = await fetch("/api/ideas");
      const data = await res.json();
      setIdeas(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch ideas", error);
      setError("Failed to fetch ideas");
    }
  }

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <IdeasContext.Provider value={{ ideas, setIdeas, loading, error }}>
      {children}
    </IdeasContext.Provider>
  );
};
