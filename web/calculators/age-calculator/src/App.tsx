import { createSignal } from "solid-js";

interface Age {
  years: number;
  months: number;
  days: number;
}

const App = () => {
  const [birthYear, setBirthYear] = createSignal<Date | undefined>();
  const [currentYear, setCurrentYear] = createSignal<Date | undefined>();
  const [age, setAge] = createSignal<Age | undefined>();
  const [error, setError] = createSignal<string>("");

  const calculateAge = () => {
    const birth = birthYear();
    const current = currentYear();

    if (birth && current) {
      if (birth > current) {
        setError("Birth year should be less than current year");
        setAge(undefined);
      } else {
        setError("");

        let years = current.getFullYear() - birth.getFullYear();
        let months = current.getMonth() - birth.getMonth();
        let days = current.getDate() - birth.getDate();

        if (days < 0) {
          months -= 1;
          days += new Date(current.getFullYear(), current.getMonth(), 0).getDate();
        }

        if (months < 0) {
          years -= 1;
          months += 12;
        }

        setAge({ years, months, days });
      }
    } else {
      setError("Please enter both years");
      setAge(undefined);
    }
  };

  const showResult = () => {
    return age() !== undefined;
  };

  return (
    <div class="w-full h-screen flex flex-col items-center justify-center bg-black p-4">
      <div class="bg-black p-6 rounded-lg w-full max-w-md shadow-lg border border-gray-300">
        <h1 class="text-3xl font-bold mb-4 text-center text-yellow-600">Age Calculator</h1>
        <p class="mb-4 text-center text-white text-lg">Enter your birth year and current year to calculate your age</p>
        <div class="mb-4">
          <label for="birthYear" class="block text-white">Enter Your Birth Year</label>
          <input
            type="date"
            class="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-black text-white"
            onInput={(e) => setBirthYear(new Date(e.currentTarget.value))}
          />
        </div>
        <div class="mb-4">
          <label for="currentYear" class="block text-white">Enter Current Year</label>
          <input
            type="date"
            class="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-black text-white"
            onInput={(e) => setCurrentYear(new Date(e.currentTarget.value))}
          />
        </div>
        <button
          onClick={calculateAge}
          class="w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition duration-300"
        >
          Calculate
        </button>
        <p class="mt-4 text-red-500">{error()}</p>
        {showResult() && (
          <p class="mt-4 text-white text-center">
            Your age is {age()?.years} years, {age()?.months} months, and {age()?.days} days
          </p>
        )}
      </div>
    </div>
  );
};

export default App;