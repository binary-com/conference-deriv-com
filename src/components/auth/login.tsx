import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {
    AuthButtons,
    AuthInput,
    FormField,
    LoginButton,
    RegisterButton,
    ResetButton,
} from './styles'
import { auth } from './firebase'
import { Header } from 'components/elements'

type TAuthLogin = {
    setStatus: (status: string) => void
}

const AuthLogin = ({ setStatus }: TAuthLogin) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate(`/`)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            {error && <div></div>}
            <FormField>
                <form onSubmit={handleSubmit}>
                    <AuthInput
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                    />
                    <AuthInput
                        type="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <LoginButton secondary>Login</LoginButton>
                </form>
            </FormField>
            <AuthButtons>
                <ResetButton tertiary onClick={() => setStatus('reset')}>
                    Forgot Password
                </ResetButton>

                <Header as="div" type="subtitle-2" align="center">
                    Don`t have an account?
                </Header>

                <RegisterButton secondary onClick={() => setStatus('register')}>
                    Register now.
                </RegisterButton>
            </AuthButtons>
        </div>
    )
}

export default AuthLogin
