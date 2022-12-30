// pages/login.js
import { useRouter } from 'next/router';
import { Magic } from 'magic-sdk';
import { FormEvent, useState } from 'react';

interface formProps {
    email: string;
}

export default function Login() {
    const [email, setEmail] = useState("");
    const router = useRouter();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // the Magic code
        const did = await new Magic(
            `${process.env.NEXT_PUBLIC_MAGIC_PUB_KEY}`,
        ).auth.loginWithMagicLink({ email });

        // Once we have the token from magic,
        // update our own database
        // const authRequest = await fetch()

        const authRequest = await fetch('/api/login', {
            method: 'POST',
            headers: { Authorization: `Bearer ${did}` },
        });

        // if (authRequest.ok) {
        // We successfully logged in, our API
        // set authorization cookies and now we
        // can redirect to the dashboard!
        // router.push('/dashboard')
        // } else { /* handle errors */ }

        if (authRequest.ok) {
            // We successfully logged in, our API
            // set authorization cookies and now we
            // can redirect to the dashboard!
            router.push('/dashboard');
        } else {
            /* handle errors */
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input name="email" type="email" onChange={e => setEmail(e.target.value)} />
            <button>Log in</button>
        </form>
    );
}
