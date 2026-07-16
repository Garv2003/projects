import { createSignal } from 'solid-js';

function App() {
  const [password, setPassword] = createSignal<string>('');
  const [strength, setStrength] = createSignal<string>('');
  const [color, setColor] = createSignal<string>('');
  const [error, setError] = createSignal<string>('');
  const [showResult, setShowResult] = createSignal<boolean>(false);

  const checkStrength = () => {
    const pass = password();

    if (pass.length < 8) {
      setError('Password should be at least 8 characters long');
      setStrength('');
      setColor('');
    } else {
      setError('');
      setShowResult(true);

      let specialCharCount = 0;123
      let lowercaseCount = 0;
      let uppercaseCount = 0;

      for (let char of pass) {
        if (/[!@#$%^&*(),.?":{}|<>]/.test(char)) {
          specialCharCount++;
        } else if (/[a-z]/.test(char)) {
          lowercaseCount++;
        } else if (/[A-Z]/.test(char)) {
          uppercaseCount++;
        }
      }

      if (pass.length < 12 || specialCharCount < 2 || lowercaseCount < 2 || uppercaseCount < 2) {
        setStrength('Weak');
        setColor('red');
      } else if (pass.length < 16 || specialCharCount < 4 || lowercaseCount < 4 || uppercaseCount < 4) {
        setStrength('Medium');
        setColor('yellow');
      } else {
        setStrength('Strong');
        setColor('green');
      }
    }
  };

  return (
    <div class="w-full h-screen flex flex-col items-center justify-center bg-black p-4">
      <div class="bg-black p-6 rounded-lg w-full max-w-md shadow-lg border border-gray-300">
        <h1 class="text-3xl font-bold mb-4 text-center text-yellow-600">Password Strength Checker</h1>
        <p class="mb-4 text-center text-white text-lg">Enter your password to check its strength</p>
        <div class="mb-4 flex flex-col gap-2">
          <label for="password" class="block text-white">Enter Your Password</label>
          <input
            type="password"
            id="password"
            class="w-full p-2 rounded-lg border border-gray-300"
            placeholder="Password"
            onInput={(e: any) => setPassword(e.target.value)}
          />
        </div>
        <button
          class="w-full p-2 bg-yellow-600 text-white rounded-lg"
          onClick={checkStrength}
        >
          Check Strength
        </button>
        {showResult() && (
          <div class="mt-4 text-center">
            <p class="text-white">Strength: <span style={{ color: color() }}>{strength()}</span></p>
          </div>
        )}
        <p class="mt-4 text-red-500 text-center">{error()}</p>
      </div>
    </div>
  );
}

export default App;