"use client";

import { Search } from "~/components/custom";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { Moon, Sun } from "lucide-react";
import React from "react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const NavBar = ({
  isProfile,
  setCategory,
}: {
  isProfile: boolean;
  setCategory?: Dispatch<SetStateAction<string>>;
}) => {
  const { data: session } = useSession();
  const { setTheme } = useTheme();

  return (
    <nav className="flex w-full flex-col items-center justify-between bg-white px-4 py-3 text-black dark:bg-black dark:text-white">
      <div className="flex w-full items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            NewsWave
          </h1>
        </Link>

        {!isProfile && setCategory && <Search setCategory={setCategory} />}

        <div className="flex items-center justify-between space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href={isProfile ? "/" : "/profile"}>
            <Button variant="outline">{isProfile ? "Home" : "Profile"}</Button>
          </Link>

          {session?.user ? (
            <Button
              variant="outline"
              onClick={() =>
                signOut({
                  callbackUrl: "/login",
                })
              }
            >
              Log Out
            </Button>
          ) : (
            <Link href="/login">
              <button className="rounded-md bg-black p-2 font-bold text-white dark:bg-white dark:text-black">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>

      {!isProfile && setCategory && (
        <div className="mt-4 flex w-full max-w-4xl items-center justify-between">
          {[
            "general",
            "technology",
            "business",
            "politics",
            "sports",
            "entertainment",
            "science",
            "health",
          ].map((category) => (
            <button
              key={category}
              className="font-bold text-black dark:text-white"
              onClick={() => setCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
