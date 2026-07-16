import { A } from "@solidjs/router";

const NotFound=()=>{
    return (
        <div class="min-h-[90vh] flex flex-col justify-center items-center" >
            <h1 class="text-4xl font-bold text-center">404 | Not Found</h1>
            <A href="/" class="text-blue-500 underline mt-5">
            <button class="btn font-bold text-xl">Go back to Home</button>
            </A>
        </div>
    )
}

export default NotFound;