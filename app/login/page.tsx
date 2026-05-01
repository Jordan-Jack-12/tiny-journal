import { supabaseLogIn } from '@/actions/session';
import { LoginForm } from '@/components/auth/LoginForm';
import Link from 'next/link';
import React from 'react'

const LoginPage = () => {
    return (
        <LoginForm />
    );
}

export default LoginPage