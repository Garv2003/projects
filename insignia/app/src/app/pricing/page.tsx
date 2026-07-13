import { Meteors } from "@/components/ui/meteors";
import { Link } from "next-view-transitions";
import React from 'react';

const pricingOptions = [
    {
        title: 'Free',
        icon: '/free.png',
        features: [
            'Generate unlimited logos for free',
            'Longer wait times',
            'Wait time: 30 seconds to 3 minutes',
            'Limited design options and quality',
            'Slower generation speed (Not Recommended)'
        ],
        button: 'Generate for Free'
    },
    {
        title: 'Premium',
        icon: '/thunder.png',
        features: [
            'Generate unlimited logos',
            'Shorter wait times',
            'Wait time: Less than 10 seconds',
            'High-quality designs with more options',
            'Only 5 credits required per logo'
        ],
        button: 'Go Premium'
    }
];

const Pricing = () => {
    return (
        <div className="bg-white dark:bg-black text-black dark:text-white p-6 rounded-lg shadow-lg w-full flex flex-col justify-center items-center min-h-screen">
            <Link href={"/"}>
                <h2 className="text-5xl font-bold mb-6">Insignia Pricing</h2>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 w-full max-w-6xl place-items-center justify-center">
                {pricingOptions.map((option, index) => (
                    <div className="relative w-[500px]"
                        key={index}
                    >
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
                        <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                            <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-2 w-2 text-gray-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                                    />
                                </svg>
                            </div>

                            <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                                {option.title}
                            </h1>

                            <ul className="list-disc list-inside text-xl space-y-2 mb-6">
                                {option.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>

                            {/* <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                                I don&apos;t know what to write so I&apos;ll just paste something
                                cool here. One more sentence because lorem ipsum is just
                                unacceptable. Won&apos;t ChatGPT the shit out of this.
                            </p> */}

                            <button className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
                                {option.button}
                            </button>
                            <Meteors number={20} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
