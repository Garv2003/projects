import { Link } from "next-view-transitions"

export const Banner = () => {
    return (
        <div className="mx-auto max-w-screen-xl lg:flex justify-center min-h-screen lg:items-center">
            <div className="mx-auto text-center">
                <h1 className="text-4xl font-extrabold sm:text-6xl">Insignia</h1>
                <h2 className="text-3xl font-extrabold sm:text-5xl mt-4">
                    <span className="gradient-text">Unleash Your Brand</span>
                    <span className="gradient-text">{" "}with AI</span>
                </h2>
                <p className="mt-4 sm:text-xl/relaxed">
                    Effortlessly create stunning logos in seconds. Our AI-powered tool
                    makes logo design a breeze.
                </p>
                <Link href="/create">
                    <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block mt-4">
                        <span className="absolute inset-0 overflow-hidden rounded-full">
                            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </span>
                        <div className="relative flex space-x-2 items-center z-10 rounded-full text-xl bg-zinc-950 py-3 px-8 ring-1 ring-white/10">
                            <span>
                                Get Started
                            </span>
                            <svg
                                fill="none"
                                height="16"
                                viewBox="0 0 24 24"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.75 8.75L14.25 12L10.75 15.25"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                />
                            </svg>
                        </div>
                        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                    </button>
                </Link>
            </div>
        </div>
    )
}
