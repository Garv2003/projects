import { CategoryList, Search } from "../components";
import { useApp } from "../context/AppProvider";
import { A } from "@solidjs/router";

const Home = () => {

  const { meals, loading, error } = useApp();

  return (
   <>
      <Search />
      <CategoryList />
      <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
        {loading() ? (
          <HomeLoader />
        ) : error() ? (
          <p class="col-span-full text-center text-2xl mt-5 text-red-500">{error()}</p>
        ) : meals().length === 0 ? (
          <p class="col-span-full text-center text-2xl mt-5">No meals found</p>
        ) : (
          meals()?.map((meal) => (
           <A href={`/details/${meal.idMeal}`} class="flex flex-col items-center">           
           <img src={meal.strMealThumb} alt={meal.strMeal} class="w-32 h-32 rounded-full object-cover" />
           <span class="text-lg font-bold text-center mt-2">{meal.strMeal}</span>
         </A>
          ))
        )}
      </div>
    </>
  );
}

const HomeLoader = () => (
  <>{Array.from({ length: 20 }).map(() => (
    <div class="flex flex-col items-center">
      <div class="skeleton w-32 h-32 rounded-full"></div>
      <div class="skeleton w-36 h-4 mt-2"></div>
    </div>
  ))}</>
)

export default Home;
