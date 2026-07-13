import { Button } from "../ui/button"
import type { QuestionCardProps } from "@/types"

export const QuestionCard = ({ question, options, handleAnswerSelect, selectedAnswer, timeLeft }: QuestionCardProps) => {
    return (
        <div className="py-4 w-full">
            <h3 className="text-lg font-semibold mb-4">
                {question}
            </h3>
            <div className="grid gap-4">
                {options.map((option, index) => (
                    <Button
                        key={index}
                        variant={selectedAnswer === index ? "default" : "outline"}
                        className="justify-start h-auto py-4 px-6"
                        onClick={() => handleAnswerSelect(index)}
                        disabled={timeLeft === 0}
                    >
                        {option}
                    </Button>
                ))}
            </div>
        </div>
    )
}