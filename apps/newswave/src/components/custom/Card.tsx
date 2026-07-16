"use client";

import Image from "next/image";
import Link from "next/link";
import { FollowerPointerCard } from "../ui/following-pointer";
import type { BlogProps } from "~/types";
import { BookMarked, Trash2 } from "lucide-react";
import { api } from "~/trpc/react";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

function ConvertDate(date: string) {
  const d = new Date(date);
  return d.toDateString();
}

export default function Card({
  blog,
  isSaved,
  authorizedDelete,
}: {
  blog: BlogProps;
  isSaved: boolean;
  authorizedDelete?: boolean;
}) {
  const { toast } = useToast();
  const result = api.news.create.useMutation({
    onSuccess: () => {
      toast({
        title: "News Saved Successfully",
      });
    },
    onError: (error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteNews = api.news.deleteSavedNews.useMutation({
    onSuccess: () => {
      toast({
        title: "News Deleted Successfully",
      });
    },
    onError: (error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
  });

  const savedNews = () => {
    result.mutate({
      name: blog.source.name,
      author: blog.author ?? "Unknown",
      title: blog.title,
      description: blog.description,
      url: blog.url,
      urlToImage: blog.urlToImage,
      publishedAt: blog.publishedAt,
      content: blog.content,
    });
  };

  const deleteSavedNews = () => {
    deleteNews.mutate({ id: blog.id });
    window.location.reload();
  };

  return (
    <div className="mx-auto w-80 bg-white dark:bg-black">
      <div className="group relative h-full overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-xl transition duration-200 dark:border-gray-700 dark:bg-black">
        <FollowerPointerCard title={<TitleComponent title={blog.author} />}>
          <div className="relative w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-gray-100 dark:bg-black">
            <Image
              src={blog.urlToImage ?? "/favicon.png"}
              width={500}
              height={200}
              alt="thumbnail"
              className="h-50 sm:h-50 w-full transform object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl md:h-60 lg:h-80 xl:h-80"
            />
          </div>
        </FollowerPointerCard>

        <div className="p-4">
          <h2 className="my-4 line-clamp-2 text-lg font-bold text-gray-900 dark:text-gray-200">
            {blog.title}
          </h2>
          <h2 className="my-4 line-clamp-3 text-sm font-normal text-gray-600 dark:text-gray-400">
            {blog.content}
          </h2>
          <div className="mt-10 flex flex-row items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {ConvertDate(blog.publishedAt)}
            </span>
            {!isSaved && (
              <button onClick={savedNews} className="cursor-pointer">
                <BookMarked className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </button>
            )}
            {authorizedDelete && (
              <button onClick={deleteSavedNews} className="cursor-pointer">
                <Trash2 className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </button>
            )}
            <Link href={blog.url} target="_blank">
              <Button variant="outline">Read More</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const TitleComponent = ({
  title,
  // avatar,
}: {
  title: string;
  // avatar: string;
}) => (
  <div className="flex items-center space-x-2 text-lg font-bold text-black dark:text-white">
    {/* <Image
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    /> */}
    <p>{title}</p>
  </div>
);
