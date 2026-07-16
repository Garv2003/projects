import { useApp } from "../context/AppProvider"
const Search = () => {
    const { search, setSearch, handleSearch } = useApp()

    return (
        <div
            class="flex justify-center items-center my-2"
        >
            <label class="input input-bordered w-full max-w-2xl flex items-center gap-2">
                <input type="text" class="grow text-sm" placeholder="Search for a recipe"
                    value={search()}
                    oninput={(e) => setSearch(e.target.value)}
                    onkeypress={(e) => {
                        if (e.key === "Enter") {
                            handleSearch()
                        }
                    }}
                />
                <button
                    class="btn btn-square btn-sm"
                    onClick={handleSearch}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        class="h-4 w-4 opacity-70"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </label>
        </div>
    )
}

export default Search