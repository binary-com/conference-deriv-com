import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {
    RegisterForm,
    AuthInput,
    LoginButton,
    RegisterButton,
    ResetButton,
    ControlArea,
} from './styles'
import { auth } from './firebase'
import { localize } from 'components/localization'
import { Header } from 'components/elements'

type TAuthRegister = {
    setStatus: (status: string) => void
}

const userInit = {
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
}

const AuthRegister = ({ setStatus }: TAuthRegister) => {
    const [user, setUser] = useState(userInit)
    const [error, setError] = useState('')

    const validatePassword = () => {
        let isValid = true
        if (user.password !== '' && user.confirmPassword !== '') {
            if (user.password !== user.confirmPassword) {
                isValid = false
                setError('Passwords does not match')
            }
        }
        return isValid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError('')
            if (validatePassword()) {
                await createUserWithEmailAndPassword(auth, user.email, user.password)
            }
        } catch (err) {
            setError(err.message)
        }
        await updateProfile(auth.currentUser, { displayName: user.displayName })
        navigate(`/`)
        setStatus('')
        setUser(userInit)
    }

    return (
        <>
            <div>
                {error && <div>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <RegisterForm>
                        <AuthInput
                            type="text"
                            name="userName"
                            value={user.displayName}
                            required
                            onChange={(e) => setUser({ ...user, displayName: e.target.value })}
                            placeholder="Username"
                        />
                        <AuthInput
                            type="email"
                            name="email"
                            value={user.email}
                            required
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="E-mail Address"
                        />
                        <AuthInput
                            type="password"
                            name="password"
                            value={user.password}
                            required
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Password"
                        />
                        <AuthInput
                            type="password"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            required
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                            placeholder="Confirm Password"
                        />

                        <RegisterButton secondary>{localize('Sign up')}</RegisterButton>
                    </RegisterForm>
                </form>
                <ControlArea>
                    <ResetButton tertiary onClick={() => setStatus('reset')}>
                        {localize('Forgot Password')}
                    </ResetButton>

                    <Header as="div" type="subtitle-2" align="end">
                        {localize('Already have an account?')}
                    </Header>

                    <LoginButton secondary onClick={() => setStatus('login')}>
                        {localize('Login')}
                    </LoginButton>
                </ControlArea>
            </div>
        </>
    )
}

export default AuthRegister
