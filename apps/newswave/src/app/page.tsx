"use client";
import { PaginationBar, GridLoader } from "~/components/custom";
import { Grid, NavBar, Footer } from "~/layout";
import { api } from "~/trpc/react";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const [category, setCategory] = useState("general");
  const [page, setPage] = useState(1);
  const blogs = api.news.news.useQuery({ category, page });

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <NavBar isProfile={false} setCategory={setCategory} />
      {blogs.isLoading ? (
        <GridLoader num={8} />
      ) : blogs.isError ? (
        <div className="flex items-center justify-center">
          {blogs.error.message}
        </div>
      ) : (
        <>
          <Grid
            blogs={blogs.data?.articles ?? []}
            isSaved={session?.user ? false : true}
          />
          <PaginationBar
            page={page}
            setPage={setPage}
            totalResults={blogs.data?.totalResults ?? 0}
          />
        </>
      )}
      <Footer />
    </main>
  );
}
