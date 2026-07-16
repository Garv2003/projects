import { IdeasSchema } from "../utils/schema";
import IdeaItem from "./IdeaItem";
import { memo } from "react";

const IdeasList = ({ ideas }: { ideas: IdeasSchema[] }) => {
  if (ideas.length === 0)
    return (
      <div className="text-center text-gray-500 mt-20 font-bold">
        No ideas found
      </div>
    );

  return (
    <div>
      {ideas?.map((idea, index) => (
        <IdeaItem key={idea.id} idea={idea} index={index} />
      ))}
    </div>
  );
};

const MemoizedIdeasList = memo(IdeasList);
export default MemoizedIdeasList;
