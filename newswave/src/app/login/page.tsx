"use client";
import React from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useToast } from "~/components/ui/use-toast";
import { LoginSchema, LoginFormData } from "~/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();

  const {
    register: login,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response && !response.ok) {
        toast({
          title: response.error ?? "Login Failed",
          variant: "destructive",
        });
        return;
      }

      toast({ title: "Login Successful" });
      router.push("/profile");
    } catch (error) {
      toast({ title: "Login Failed", variant: "destructive" });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-zinc-900">
      <div className="w-full max-w-md rounded-none bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to NewsWave
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Login to your account
        </p>

        <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="ethanhunt@gmail.com"
              type="email"
              {...login("email")}
            />
            {errors.email && (
              <span className="text-xs text-red-500 dark:text-red-400">
                {errors.email.message}
              </span>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              {...login("password")}
            />
            {errors.password && (
              <span className="text-xs text-red-500 dark:text-red-400">
                {errors.password.message}
              </span>
            )}
          </LabelInputContainer>

          <span className="pb-4 text-sm text-neutral-600 dark:text-neutral-300">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-LG font-bold text-black">
              Sign up
            </Link>
          </span>

          <button
            className="group/btn relative mt-3 block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Login &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
