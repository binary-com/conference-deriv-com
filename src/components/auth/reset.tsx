import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { sendPasswordResetEmail } from 'firebase/auth'
import {
    AuthInput,
    ControlArea,
    ResetForm,
    LoginButton,
    RegisterButton,
    ResetButton,
    AuthWrapper,
} from './styles'
import { auth } from 'config/firebase'
import { localize } from 'components/localization'
import { Header } from 'components/elements'

const AuthReset = () => {
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
        <AuthWrapper>
            {staus ? (
                <>{localize('Check your email')}</>
            ) : (
                <div>
                    <ResetForm>
                        {error && <div>{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <AuthInput
                                type="email"
                                name="email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                            />
                            <ResetButton tertiary>{localize('Forgot Password')}</ResetButton>
                        </form>
                    </ResetForm>
                    <ControlArea>
                        <Header
                            as="div"
                            type="subtitle-2"
                            align="end"
                            style={{ whiteSpace: 'nowrap' }}
                        >
                            {localize('Already have an account?')}
                        </Header>

                        <LoginButton secondary onClick={() => navigate('/login')}>
                            {localize('Login')}
                        </LoginButton>

                        <Header as="div" type="subtitle-2" align="end">
                            {localize('Don`t have an account?')}
                        </Header>

                        <RegisterButton secondary onClick={() => navigate('/register')}>
                            {localize('Register now.')}
                        </RegisterButton>
                    </ControlArea>
                </div>
            )}
        </AuthWrapper>
    )
}

export default AuthReset
