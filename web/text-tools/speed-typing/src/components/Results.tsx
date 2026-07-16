import { motion } from "framer-motion";

type ResultsProps = {
  errors: number;
  accuracyPercentage: number;
  total: number;
  // wordsPerMinute?: number;
  className?: string;
  state: "start" | "run" | "finish";
};

const Results = ({
  errors,
  accuracyPercentage,
  total,
  // wordsPerMinute,
  className,
  state,
}: ResultsProps) => {
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };

  if (state !== "finish") {
    return null;
  }

  return (
    <motion.ul
      className={`flex flex-col text-primary-400 space-y-3 justify-center items-center ${className}`}
    >
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3 }}
        className="text-xl font-semibold"
      >
        Results
      </motion.li>
      {/* <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration:0.3, delay: 0.5 }}
      >
        Words per minute: {wordsPerMinute}
      </motion.li> */}
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        Accuracy: {accuracyPercentage}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1 }}
      >
        Typed: {total}
      </motion.li>
      <motion.li
        className="text-red-500"
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1.5 }}
      >
        Errors: {errors}
      </motion.li>
    </motion.ul>
  );
};

export default Results;
