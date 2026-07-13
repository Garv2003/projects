"use client";

import { UserDetails, ProfileLoader, GridLoader } from "~/components/custom";
import { Footer, Grid, NavBar } from "~/layout";
import { api } from "~/trpc/react";
import type { BlogProps, User } from "~/types";

export default function Profile() {
  const result = api.news.getProfile.useQuery();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <NavBar isProfile={true} />
      {result.isLoading ? (
        <>
          <ProfileLoader />
          <GridLoader num={4} />
        </>
      ) : result.isError ? (
        <div className="flex h-screen w-full items-center justify-center">
          {result.error.message}
        </div>
      ) : (
        <>
          <UserDetails user={result?.data?.user as User} />
          <Grid
            blogs={result.data?.blogs as unknown as BlogProps[]}
            isSaved={true}
            authorizedDelete={true}
          />
        </>
      )}
      <Footer />
    </main>
  );
}
