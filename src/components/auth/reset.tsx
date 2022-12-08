import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from './firebase'
import { Button } from 'components/form'

type TAuthReset = {
    setStatus: (status: string) => void
}

const AuthReset = ({ setStatus }: TAuthReset) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [staus, setStaus] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await sendPasswordResetEmail(auth, email)
            setStaus(true)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <>
            {staus ? (
                <>Check your email</>
            ) : (
                <div>
                    {error && <div>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail Address"
                        />
                        <button>Forgot Password</button>
                    </form>
                    <>
                        Already have an account?
                        <Button tertiary onClick={() => setStatus('login')}>
                            Login
                        </Button>
                    </>
                    <>
                        Don`t have an account?
                        <Button tertiary onClick={() => setStatus('register')}>
                            Register now.
                        </Button>
                    </>
                </div>
            )}
        </>
    )
}

export default AuthReset
