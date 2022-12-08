import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from './firebase'
import {
    AuthInput,
    ControlArea,
    ResetForm,
    LoginButton,
    RegisterButton,
    ResetButton,
} from './styles'
import { localize } from 'components/localization'
import { Header } from 'components/elements'

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
                                placeholder="E-mail Address"
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

                        <LoginButton secondary onClick={() => setStatus('login')}>
                            {localize('Login')}
                        </LoginButton>

                        <Header as="div" type="subtitle-2" align="end">
                            {localize('Don`t have an account?')}
                        </Header>

                        <RegisterButton secondary onClick={() => setStatus('register')}>
                            {localize('Register now.')}
                        </RegisterButton>
                    </ControlArea>
                </div>
            )}
        </>
    )
}

export default AuthReset
