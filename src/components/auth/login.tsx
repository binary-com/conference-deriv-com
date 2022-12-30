import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {
    AuthButtons,
    AuthInput,
    LoginForm,
    LoginButton,
    RegisterButton,
    ResetButton,
    AuthWrapper,
} from './styles'
import { auth } from 'config/firebase'
import { Header } from 'components/elements'

const AuthLogin = () => {
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
        <AuthWrapper>
            {error && <div></div>}
            <LoginForm>
                <form onSubmit={handleSubmit}>
                    <AuthInput
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
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
            </LoginForm>
            <AuthButtons>
                <ResetButton tertiary onClick={() => navigate('/reset')}>
                    Forgot Password
                </ResetButton>

                <Header as="div" type="subtitle-2" align="center">
                    Don`t have an account?
                </Header>

                <RegisterButton secondary onClick={() => navigate('/register')}>
                    Register now.
                </RegisterButton>
            </AuthButtons>
        </AuthWrapper>
    )
}

export default AuthLogin
