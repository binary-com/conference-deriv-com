import React from 'react'
import { signOut } from 'firebase/auth'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { Header } from 'components/elements'
import { Button } from 'components/form'
import device from 'themes/device'
import { localize } from 'components/localization'
import { auth } from 'components/auth/firebase'

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 120px;

    @media ${device.laptopM} {
        padding: 40px 80px;
    }
`
const LoginHeader = styled(Header)`
    text-align: center;
    padding-bottom: 32px;
`
const StyledButton = styled(Button)`
    font-size: 1.6rem;
`

const Login = ({ currentUser }: any) => {
    console.log(currentUser)
    return (
        <>
            {currentUser ? (
                <LoginWrapper>
                    <Header as="div" type="subtitle-1" color="primary" align="center" pb="32px">
                        {localize('You`re already logged in')}
                    </Header>
                    <Button tertiary onClick={() => signOut(auth)}>
                        {localize('Log out')}
                    </Button>
                </LoginWrapper>
            ) : (
                <LoginWrapper>
                    <LoginHeader as="h3" type="subtitle-1">
                        {localize('Three days of content, networking and news.')}
                    </LoginHeader>
                    <Link to="/auth?type=register" target="_blank" rel="noopener noreferrer">
                        <StyledButton secondary>{localize('Register here')}</StyledButton>
                    </Link>
                    <LoginHeader as="div" weight="normal" type="subtitle-1" pt="32px">
                        {localize('or, if you already have access to the event')}
                    </LoginHeader>
                    <Link to="/auth" target="_blank" rel="noopener noreferrer">
                        <StyledButton primary>{localize('Sign in')}</StyledButton>
                    </Link>
                </LoginWrapper>
            )}
        </>
    )
}

export default Login
