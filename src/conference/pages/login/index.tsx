import React from 'react'
import Layout from 'components/layout/layout'
import { AuthLogin } from 'components/auth'

const ConferenceAuth = () => {
    return (
        <Layout type="conference" margin_top="0px">
            <AuthLogin />
        </Layout>
    )
}

export default ConferenceAuth
