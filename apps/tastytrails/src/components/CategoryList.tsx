import { onMount, createSignal } from "solid-js"
import { useApp } from "../context/AppProvider"

interface Category {
    idCategory: string
    strCategory: string
    strCategoryDescription: string
    strCategoryThumb: string
}

const CategoryList = () => {
    const { category, handleCategory } = useApp()
    const [categories, setCategories] = createSignal<Category[]>([])
    const [loading, setLoading] = createSignal<boolean>(true)
    // const [error, setError] = createSignal<string>("")

    const getCategories = async () => {
        try {
            const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
            if (!res.ok) throw new Error('Network response was not ok')
            const data = await res.json()
            setCategories([{ idCategory: "all", strCategory: "All", strCategoryDescription: "All Categories", strCategoryThumb: "" }, ...data.categories])
            setLoading(false)
        } catch (err) {
            console.error(err)
            setCategories([])
            setLoading(false)
        }
    }

    onMount(() => {
        getCategories()
    })

    return (
        <div class="flex gap-4 mt-2 overflow-y-scroll no-scrollbar w-auto">
            {loading() && <Loader />}
            {categories().map((cat) => (
                <button class="btn flex flex-col items-center"
                    classList={{
                        "bg-gray-200": category() === cat?.strCategory
                    }}
                    onClick={() => handleCategory(cat?.strCategory)}>
                    {cat?.strCategoryThumb === "" ? "" :
                        <img src={cat?.strCategoryThumb} alt={cat?.strCategory} class="w-10 h-10" />
                    }
                    <span> {cat?.strCategory}</span>
                </button>
            ))}
        </div>
    )
}

const Loader = () => (
    <>{Array.from({ length: 10 }).map(() => (
        <button class=" skeleton btn flex flex-col items-center">
            <div class="skeleton h-10 w-10"></div>
            <div class="skeleton h-4 w-20"></div>
        </button>
    ))}</>
)

export default CategoryList
