import React, { useState } from 'react'
import styled from 'styled-components'
import device from 'themes/device'
import Layout from 'components/layout/layout'
import { queryParams } from 'common/utility'
import { AuthLogin, AuthRegister, AuthReset } from 'components/auth'

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 120px;

    @media ${device.laptopM} {
        padding: 40px 80px;
    }
`

const ConferenceAuth = () => {
    const query = queryParams.get('type') || 'login'
    const [status, setStatus] = useState(query)

    return (
        <Layout type="conference" margin_top="0px">
            <LoginWrapper>
                {status == 'login' && <AuthLogin setStatus={setStatus} />}
                {status == 'register' && <AuthRegister setStatus={setStatus} />}
                {status == 'reset' && <AuthReset setStatus={setStatus} />}
            </LoginWrapper>
        </Layout>
    )
}

export default ConferenceAuth
