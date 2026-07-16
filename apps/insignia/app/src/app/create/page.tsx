"use client";
import { Button } from "@/components/ui/button";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Header } from "@/layouts/Header";
import { useState } from "react";
import { colorPalettes } from "@/constant/Colors";
import { LogoDesig } from "@/constant/LogoDesig";
import { LogoIdeasList } from "@/constant/LogoIdeas";
import Image from "next/image";
import { Logoprompt } from "@/constant/Prompt";
import { run } from "@/model/config";
import { ImageGeneration } from "@/model/ImageGeneration";

type FormData = {
    title: string;
    description: string;
    color_palette: {
        name: string;
        colors: string[]
    }
    designs: {
        title: string;
        prompt: string;
        image: string;
    };
    ideas: {
        id: number,
        idea: string
    }
};

function Create() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        color_palette: {
            name: "",
            colors: []
        },
        designs: {
            title: "",
            prompt: "",
            image: "",
        },
        ideas: {
            id: -1,
            idea: ""
        }
    });

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, title: e.target.value });
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, description: e.target.value });
    };

    const handleColorPaletteChange = (colors: { name: string, colors: string[] }) => {
        setFormData({ ...formData, color_palette: colors });
    }

    const handleDesignsChange = (design: { title: string, prompt: string, image: string }) => {
        setFormData({ ...formData, designs: design });
    }

    const handleIdeasChange = (idea: { id: number, idea: string }) => {
        setFormData({ ...formData, ideas: idea });
    }

    const onSubmit = async () => {
        setLoading(true);
        try {
            const PROMPT = Logoprompt.LOGO_PROMPT
                .replace('{logoType}', formData.color_palette.name)
                .replace('{logoTitle}', formData.title)
                .replace('{logoDesc}', formData.description)
                .replace('{logoPrompt}', formData.designs.prompt)
                .replace('{logoColor}', formData.color_palette.name)
                .replace('{logoIdea}', formData.ideas.idea)
                .replace('{logoDesign}', formData.designs.title);
            const result = await run(PROMPT);
            const image = await ImageGeneration(result.prompt);
            console.log(image);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    function handleNext() {
        if (step === 5) {
            onSubmit();
            return;
        }
        setStep(step + 1);
    }

    function handleBack() {
        setStep(step - 1);
    }

    const renderStep = (step: number = 1) => {
        switch (step) {
            case 1:
                return <LogoDetailsComponent
                    title="Create Your Logo In Seconds"
                    description="Add your Business, App, or Website Name for your Logo"
                    handleChange={handleTitleChange}
                    onSubmit={handleNext}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    step={step}
                />;
            case 2:
                return <LogoDetailsComponent
                    title="Describe Your Logo Vision"
                    description="Share your ideas, themes, or inspirations to create a logo that perfectly represents your brand"
                    handleChange={handleDescriptionChange}
                    onSubmit={handleNext}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    step={step}
                />;
            case 3:
                return <LogoColorPalette
                    title="Choose Your Color Palette"
                    description="Pick the colors that reflect your brands personality and create a lasting impression."
                    handleChange={handleColorPaletteChange}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    step={step}
                    selectedColorPalette={formData.color_palette}
                />;
            case 4:
                return <LogoDesigns
                    title="Choose Your Logo Style"
                    description="Select the type of logo design that best represents your brands unique identity."
                    handleChange={handleDesignsChange}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    step={step}
                    designs={formData.designs}
                />;
            case 5:
                return <LogoIdeas
                    title="Select Your Design Idea"
                    description="Choose a design style that aligns with your vision, or skip to receive a random suggestion."
                    handleChange={handleIdeasChange}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    step={step}
                    idea={formData.ideas}
                />;
            default:
                return null;
        }
    };


    return (
        <div className="w-screen flex flex-col justify-center items-center h-screen">
            <Header />
            {loading ?
                <div className="flex flex-col justify-center items-center h-[40rem]">
                    <div
                        className="p-2 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-40 md:h-40 h-24 w-24 aspect-square rounded-full"
                    >
                        <div
                            className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"
                        ></div>
                    </div>
                    <span className="text-black dark:text-white mt-4">Loading...</span>
                </div>
                : renderStep(step)}
        </div>
    );
}

const LogoDetailsComponent = ({ handleChange, onSubmit, handleBack, handleNext, step, title, description }: { handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; handleBack: () => void; handleNext: () => void; step: number; title: string; description: string; }) => {
    const placeholders = [
        "What is the meaning of life?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
    ];

    return (
        <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
            <h2 className="mb-4 sm:mb-8 text-xl text-center sm:text-5xl dark:text-white text-black">
                {title}
            </h2>
            <span className="mb-2 sm:mb-5 text-sm text-center sm:text-2xl dark:text-white text-black">
                {description}
            </span>
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
            />
            <div className="mt-4 sm:mt-8 flex justify-between items-center gap-4">
                {step > 1 && <Button
                    variant="outline"
                    className="text-black dark:text-white"
                    onClick={handleBack}
                >
                    Back
                </Button>}
                {step > 1 && <Button
                    variant="outline"
                    className="text-black dark:text-white"
                    onClick={handleNext}
                >
                    Next
                </Button>}
            </div>
        </div>
    )
}

const LogoColorPalette = ({ title, description, handleChange, handleBack, handleNext, step, selectedColorPalette }: { title: string; description: string; handleChange: (colors: { name: string, colors: string[] }) => void; handleBack: () => void; handleNext: () => void; step: number; selectedColorPalette: { name: string, colors: string[] } }) => {
    return (
        <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
            <h2 className="mb-4 sm:mb-8 text-xl text-center sm:text-5xl dark:text-white text-black">
                {title}
            </h2>
            <span className="mb-2 sm:mb-5 text-sm text-center sm:text-2xl dark:text-white text-black">
                {description}
            </span>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
                {colorPalettes.map((palette: { name: string, colors: string[] }, index: number) => (
                    <div key={index} className="flex flex-col items-center p-2">
                        <div className={`flex ${selectedColorPalette.name === palette.name ? "border-2 border-black dark:border-white p-1" : "border-2 border-white dark:border-black p-1"}`}
                            onClick={() => handleChange(palette)}
                        >
                            {palette.colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="w-12 h-16 cursor-pointer hover:scale-105"
                                    style={{ backgroundColor: color }}
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 sm:mt-8 flex justify-between items-center gap-4">
                {step > 1 && <Button
                    variant="outline"
                    className="text-black dark:text-white"
                    onClick={handleBack}
                >
                    Back
                </Button>}
                <Button
                    variant="outline"
                    className="text-black dark:text-white"
                    onClick={handleNext}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

const LogoDesigns = ({ title, description, handleChange, handleBack, handleNext, step, designs }: { title: string; description: string; handleChange: (logoDetails: { title: string, prompt: string, image: string }) => void; handleBack: () => void; handleNext: () => void; step: number; designs: { title: string, prompt: string, image: string } }) => {
    return (
        <div className="flex flex-col justify-center  items-center px-4 mt-4">
            <h2 className="mb-4 sm:mb-8 text-xl text-center sm:text-5xl dark:text-white text-black">
                {title}
            </h2>
            <span className="mb-2 sm:mb-5 text-sm text-center sm:text-2xl dark:text-white text-black">
                {description}
            </span>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {LogoDesig.map((logo: { title: string, prompt: string, image: string }, index: number) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                        <label className="text-black dark:text-white">{logo.title}</label>
                        <Image
                            src={logo.image}
                            alt={logo.title}
                            width={120}
                            height={120}
                            className={`cursor-pointer rounded-lg hover:scale-105 ${logo.title === designs.title ? "border-2 border-black dark:border-white" : "border-2 border-white dark:border-black"}`}
                            onClick={() => handleChange(logo)}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-4 sm:mt-8 flex justify-between items-center gap-4">
                {step > 1 && <Button
                    variant="outline"
                    className="text-black dark:text-white"
                    onClick={handleBack}
                >
                    Back
                </Button>}
                <Button
                    variant="outline"
                    className="text-black dark:text-white"
                    onClick={handleNext}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

const LogoIdeas = ({ title, description, handleChange, handleBack, handleNext, step, idea }: { title: string; description: string; handleChange: (idea: { id: number, idea: string }) => void; handleBack: () => void; handleNext: () => void; step: number; idea: { id: number, idea: string } }) => {
    return (
        <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
            <h2 className="mb-4 sm:mb-8 text-xl text-center sm:text-5xl dark:text-white text-black">
                {title}
            </h2>
            <span className="mb-2 sm:mb-5 text-sm text-center sm:text-2xl dark:text-white text-black">
                {description}
            </span>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {LogoIdeasList.map((i: { id: number, idea: string }, index: number) => (
                    <div key={index} className={`flex flex-col items-center gap-2 cursor-pointer rounded-3xl p-2 hover:scale-105 ${i.id === idea.id ? "border-2 border-white dark:border-white" : "border-2 border-white dark:border-black"}`}
                        onClick={() => handleChange(i)}
                    >
                        <span className="text-black dark:text-white">{i.idea}</span>
                    </div>
                ))}
            </div>

            <div className="mt-4 sm:mt-8 flex justify-between items-center gap-4">
                {step > 1 && <Button
                    variant="outline"
                    className="text-black dark:text-white"
                    onClick={handleBack}
                >
                    Back
                </Button>}
                <Button
                    variant="outline"
                    className="text-black dark:text-white"
                    onClick={handleNext}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

export default Create;