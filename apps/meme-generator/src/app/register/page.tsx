"use client"

import { Link, useTransitionRouter } from 'next-view-transitions'

const Register = () => {
    const router = useTransitionRouter();

    return (
        <div>
            <h1>Register</h1>
            <Link href="/login">Login</Link>
            <button onClick={() => router.push('/login')}>Login</button>
        </div>
    )
}

export default Register;