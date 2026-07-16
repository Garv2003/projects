import { createContext, createSignal, useContext, JSX, onMount } from "solid-js";
import type { Accessor, Setter } from "solid-js";
import toast from "solid-toast"

interface Meal {
    idMeal: string
    strMeal: string
    strMealThumb: string
}

interface Context {
    category: Accessor<string>
    handleCategory: (category: string) => void
    meal: Accessor<string>
    meals: Accessor<Meal[]>
    loading: Accessor<boolean>
    error: Accessor<string>
    search: Accessor<string>
    setSearch: Setter<string>
    handleSearch: () => void
}

const AppContext = createContext<Context | undefined>(undefined);

export const AppProvider = (props: { children: JSX.Element }) => {
    const [category, setCategory] = createSignal<string>("chicken")
    const [meal, setMeal] = createSignal<string>("chicken")
    const [meals, setMeals] = createSignal<Meal[]>([])
    const [search, setSearch] = createSignal<string>("")
    const [loading, setLoading] = createSignal<boolean>(true)
    const [error, setError] = createSignal<string>("")

    const fetchMeals = async (query: string) => {
        try {
            const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + query)
            const data = await res.json()
            setMeals(data.meals || [])
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('An unknown error occurred')
            }
        }
        finally {
            setLoading(false)
        }
    }

    const handleCategory = (category: string) => {
        setCategory(category)
        setMeal(category)
        setLoading(true)
        fetchMeals(category)
    }

    onMount(() => {
        fetchMeals(meal())
    })


    const handleSearch = () => {
        if (search() === "") {
            toast.error("Please enter something to search for", {
                position: "bottom-right",
                duration: 3000,
            })
            return
        }
        setLoading(true)
        setMeal(search())
        setSearch(() => "")
        fetchMeals(meal())
    }


    return (
        <AppContext.Provider
            value={{
                category,
                handleCategory,
                meal,
                meals,
                loading,
                error,
                search,
                setSearch,
                handleSearch
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useMyContext must be used within a MyContext.Provider");
    }
    return context;
};