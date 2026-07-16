import React from "react";
import { Card } from "~/components/custom";
import type { BlogProps } from "~/types";

const Grid = ({
  blogs,
  isSaved,
  authorizedDelete,
}: {
  blogs: BlogProps[];
  isSaved: boolean;
  authorizedDelete?: boolean;
}) => {
  return (
    <div className="grid h-full min-h-[58vh] w-full grid-cols-1 gap-5 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {blogs.length === 0 && (
        <div className="flex h-full w-[97vw] flex-col items-center justify-center">
          <p className="text-center text-lg font-bold text-gray-500">
            {!authorizedDelete ? "No blogs found" : "No saved blogs found"}
          </p>
        </div>
      )}
      {blogs.map((blog, index) => (
        <Card
          key={index}
          blog={blog}
          isSaved={isSaved}
          authorizedDelete={authorizedDelete}
        />
      ))}
    </div>
  );
};

export default Grid;
