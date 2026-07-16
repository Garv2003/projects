"use client";
import React from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useToast } from "~/components/ui/use-toast";
import { RegisterSchema, FormData } from "~/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const { toast } = useToast();
  const router = useRouter();

  const result = api.user.register.useMutation({
    onError: (error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "Account created successfully",
      });
      router.push("/login");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: FormData) => {
    result.mutate({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-zinc-900">
      <div className="w-full max-w-md rounded-none bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to NewsWave
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Sign up for an account
        </p>

        <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                placeholder="Ethan"
                type="text"
                {...register("firstName")}
              />
              {errors.firstName && (
                <span className="mb-2 text-sm text-red-500">
                  {errors.firstName.message}
                </span>
              )}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                placeholder="Hunt"
                type="text"
                {...register("lastName")}
              />
              {errors.lastName && (
                <span className="mb-2 text-sm text-red-500">
                  {errors.lastName.message}
                </span>
              )}
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="ethanhunt@gmail.com"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <span className="mb-2 text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              {...register("password")}
            />{" "}
            {errors.password && (
              <span className="mb-2 text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-3">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              {...register("confirmPassword")}
            />{" "}
            {errors.confirmPassword && (
              <span className="mb-2 text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </LabelInputContainer>

          <span className="pb-4 text-sm text-neutral-600 dark:text-neutral-300">
            Already have an account?{" "}
            <Link href="/login" className="text-LG font-bold text-black">
              Log in
            </Link>
          </span>

          <button
            className="group/btn relative mt-4 block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={result.isPending}
          >
            Sign up &rarr;
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
