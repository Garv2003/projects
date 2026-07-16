import { useParams } from "@solidjs/router";
import { onMount, createSignal } from "solid-js";

interface MealDetails {
    dateModified: string | null;
    idMeal: string;
    strArea: string;
    strCategory: string;
    strCreativeCommonsConfirmed: string | null;
    strDrinkAlternate: string | null;
    strImageSource: string | null;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6: string;
    strIngredient7: string;
    strIngredient8: string;
    strIngredient9: string;
    strIngredient10: string;
    strIngredient11: string;
    strIngredient12: string;
    strIngredient13: string;
    strIngredient14: string;
    strIngredient15: string;
    strIngredient16: string;
    strIngredient17: string;
    strIngredient18: string;
    strIngredient19: string;
    strIngredient20: string;
    strInstructions: string;
    strMeal: string;
    strMealThumb: string;
    strMeasure1: string;
    strMeasure2: string;
    strMeasure3: string;
    strMeasure4: string;
    strMeasure5: string;
    strMeasure6: string;
    strMeasure7: string;
    strMeasure8: string;
    strMeasure9: string;
    strMeasure10: string;
    strMeasure11: string;
    strMeasure12: string;
    strMeasure13: string;
    strMeasure14: string;
    strMeasure15: string;
    strMeasure16: string;
    strMeasure17: string;
    strMeasure18: string;
    strMeasure19: string;
    strMeasure20: string;
    strSource: string | null;
    strTags: string | null;
    strYoutube: string;
}

const Details = () => {
    const { id } = useParams();
    const [details, setDetails] = createSignal<MealDetails | null>(null);
    const [loading, setLoading] = createSignal<boolean>(true);
    const [error, setError] = createSignal<string>("");

    const getDetails = async () => {
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            console.log(data);
            setDetails(data.meals[0]);
            setLoading(false);
        } catch (err: unknown) {
            console.error(err);
            setError(err instanceof Error ? err.message : String(err));
            setLoading(false);
        }
    }

    onMount(() => {
        getDetails();
    });

    return (
        <> {loading() ? (<DetailsLoader />) : error() ? <p class="text-center text-2xl mt-5 text-red-500">{error()}</p> : (
            <div class="w-full flex justify-center items-center flex-col p-2">
                <div class="w-full flex items-center gap-10 justify-center">
                    <div class="flex flex-col items-center shadow-lg p-4 rounded-lg border">
                        <img src={details()?.strMealThumb} alt={details()?.strMeal} class="w-64 h-64 rounded-full object-cover" />
                        <h1 class="text-3xl font-bold mt-5">{details()?.strMeal}</h1>
                        <div class="flex gap-2 mt-2">
                            <button class="btn btn-outline text-lg mt-2">{details()?.strCategory}</button>
                            <button class="btn btn-outline text-lg mt-2">{details()?.strArea}</button>
                            {details()?.strTags && <button class="btn btn-outline text-lg mt-2">{details()?.strTags}</button>}
                        </div>
                    </div>

                    <div class="flex flex-col items-center shadow-lg p-4 rounded-lg border">
                        <h2 class="text-2xl font-bold mt-5">Ingredients</h2>
                        <ul class="pl-5 mt-2">
                            {Object.entries(details() || {})
                                .filter(([key, value]) => key.startsWith('strIngredient') && value)
                                .map(([key, value]) => {
                                    const measureKey = `strMeasure${key.slice(13)}` as keyof MealDetails;
                                    return <li>{value} - {details()?.[measureKey]}</li>;
                                })}
                        </ul>
                    </div>

                    <iframe
                        class="mt-5 w-full sm:w-[700px] h-96 sm:h-86 rounded-lg"
                        src={details()?.strYoutube ? details()?.strYoutube.replace('watch?v=', 'embed/') : undefined}
                        title="YouTube video player"
                    ></iframe>



                </div>

                <p class="text-lg mt-2 shadow-lg rounded-lg p-4 border">{details()?.strInstructions.split('\n').map((item) => <p class="mt-2">{item}</p>)}</p>

            </div>
        )}
        </>
    );
}

const DetailsLoader = () => (
    <div class="w-full flex justify-center items-center flex-col p-2">
        <div class="w-full flex items-center gap-10 justify-center">
            <div class="flex flex-col items-center shadow-lg p-4 rounded-lg border">
                <div class="skeleton w-64 h-64 rounded-full"></div>
                <div class="skeleton w-36 h-4 mt-2"></div>
                <div class="flex gap-2 mt-2">
                    <div class="skeleton text-lg mt-2"></div>
                    <div class="skeleton text-lg mt-2"></div>
                    <div class="skeleton text-lg mt-2"></div>
                </div>
            </div>

            <div class="flex flex-col items-center shadow-lg p-4 rounded-lg border">
                <ul class="mt-2">
                    {Array.from({ length: 10 }).map(() => (
                        <p class="skeleton mt-2 w-40 h-5"></p>
                    ))}

                </ul>
            </div>

            <div class="skeleton w-full sm:w-[700px] h-96 sm:h-86 rounded-lg"></div>
        </div>

        <div class="w-full mt-2 shadow-lg rounded-lg p-4 border">
            {Array.from({ length: 16 }).map(() => (
                <p class="skeleton mt-2 w-full h-5"></p>
            ))}
        </div>
    </div>
)


export default Details;