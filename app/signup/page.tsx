import { supabaseSignUp } from '@/actions/session';
import Link from 'next/link';
import React from 'react'

const SignupPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md p-8 rounded-3xl shadow-lg border border-gray-100">

                <h1 className="text-2xl font-semibold mb-6 text-center">
                    Create account
                </h1>

                <form className="space-y-4" action={supabaseSignUp}>

                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="First name"
                            name='first-name'
                            className="w-1/2 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ring-sky-300"
                        />
                        <input
                            type="text"
                            name='last-name'
                            placeholder="Last name"
                            className="w-1/2 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ring-sky-300"
                            style={{ outlineColor: "var(--accent)" }}
                        />
                    </div>

                    <input
                        type="email"
                        placeholder="Email"
                        name='email'
                        className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ring-sky-300"
                        style={{ outlineColor: "var(--accent)" }}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        name='password'
                        className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ring-sky-300"
                        style={{ outlineColor: "var(--accent)" }}
                    />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        name='confirm-password'
                        className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ring-sky-300"
                    />

                    <button
                        type="submit"
                        className="w-full px-4 py-2 rounded text-white font-semibold bg-sky-300 cursor-pointer hover:bg-sky-400"
                    >
                        Sign up
                    </button>
                </form>

                <p className="text-center text-sm mt-6 text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignupPage