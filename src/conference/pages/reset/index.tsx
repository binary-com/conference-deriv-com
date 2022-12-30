import React from 'react'
import Layout from 'components/layout/layout'
import { AuthReset } from 'components/auth'

const ConferenceAuth = () => {
    return (
        <Layout type="conference" margin_top="0px">
            <AuthReset />
        </Layout>
    )
}

export default ConferenceAuth
