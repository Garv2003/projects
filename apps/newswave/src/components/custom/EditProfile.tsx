"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useRef, useState } from "react";
import { api } from "~/trpc/react";
import { useToast } from "../ui/use-toast";
import { QueryClient } from "@tanstack/react-query";

export default function EditProfile({
  detail,
}: {
  detail: { image: string; bio: string };
}) {
  const { toast } = useToast();
  const imageRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const result = api.user.updateProfile.useMutation({
    onError: (error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      const queryClient = new QueryClient();
      await queryClient.invalidateQueries({ queryKey: ["getProfile"] });
      toast({
        description: "Profile updated successfully",
      });
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const image = imageRef.current?.value ?? "";
    const bio = bioRef.current?.value ?? "";
    result.mutate({ image, bio });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={result.isPending}>
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="image" className="text-left">
              Image
            </Label>
            <Input
              id="image"
              defaultValue={detail.image}
              className="w-full"
              ref={imageRef}
            />
          </div>
          <div className="grid w-full grid-cols-1 items-center gap-4">
            <Label htmlFor="bio" className="text-left">
              Bio
            </Label>
            <Input
              id="bio"
              defaultValue={detail.bio}
              className="w-full"
              ref={bioRef}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="rounded-md bg-black p-2 font-bold text-white dark:bg-white dark:text-black"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
