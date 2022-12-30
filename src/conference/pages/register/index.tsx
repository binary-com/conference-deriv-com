import React from 'react'
import Layout from 'components/layout/layout'
import { AuthRegister } from 'components/auth'

const ConferenceAuth = () => {
    return (
        <Layout type="conference" margin_top="0px">
            <AuthRegister />
        </Layout>
    )
}

export default ConferenceAuth
