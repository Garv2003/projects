"use client"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

export const Header = () => {
    const { user } = useUser();

    return (
        <header className="max-w-4xl w-full mx-auto flex items-center justify-between px-8 py-3 bg-zinc-800 rounded-3xl border border-zinc-500">
            <Link href="/">
                <h1 className="text-3xl font-bold">Insignia</h1>
            </Link>
            {user ? (
                <UserButton />
            ) : (
                <div className="flex items-center gap-4">
                    <Button asChild>
                        <SignInButton />
                    </Button>
                    <Button asChild>
                        <SignUpButton />
                    </Button>
                </div>
            )}
        </header>
    );
};