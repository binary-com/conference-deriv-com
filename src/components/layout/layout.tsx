import React, { useState, ReactNode, Ref } from 'react'
import Loadable from '@loadable/component'
import styled from 'styled-components'
import { closestMatch, distance } from 'closest-match'
import { LocationProvider } from './location-context'
import NavAcademy from './nav/nav-academy'
import NavStatic from './nav/nav-static'
import Nav from './nav/nav'
import NavTransparent from './nav/nav-transparent'
import NavCareers from './nav/nav-careers'
import NavPartners from './nav/nav-partner'
import NavConference from './nav/nav-conference'
import NavMarkets from './nav/nav-markets'
import NavInterim from './nav/nav-interim'
import NavSecurity from './nav/nav-security'
import NavJumpIndice from './nav/nav-jump-indices'
import Footer from './footer'
import LayoutOverlay from './layout-overlay'
import EURedirect, { useModal } from 'components/custom/_eu-redirect-modal'
import { usePlatformQueryParam } from 'components/hooks/use-platform-query-param'
import NonEuRedirectPopUp from 'components/custom/_non-eu-redirect-popup'
import { handleRedirect, isEuDomain } from 'common/utility'
import BrowserUpdateAlertModal from 'components/layout/modal/browser_update_alert_modal'
import { DerivStore, useDerivWS } from 'store'
import { CookieStorage } from 'common/storage'
import { usePageLoaded } from 'components/hooks/use-page-loaded'

const LoadableFooter = Loadable(() => import('./footer'))
const BeSquareFooter = Loadable(() => import('./besquare/footer'))

type LayoutProps = {
    children: ReactNode
    interim_type?: 'affiliate' | 'dbot' | 'deriv' | 'dmt5' | 'faq'
    is_ppc?: boolean
    is_ppc_redirect?: boolean
    margin_top?: number | string
    no_login_signup?: boolean
    type?: string
}

type MainType = {
    is_static?: boolean
    margin_top?: number | string
}

export type ModalPayloadType = {
    to: string
    ref: Ref<HTMLAnchorElement>
    rel: string
    target: string
    aria_label: string
}

const Main = styled.main<MainType>`
    margin-top: ${(props) => (props.margin_top && `${props.margin_top}rem`) || '7rem'};
    background: var(--color-white);
    height: 100%;
    position: relative;
`

const Layout = ({
    children,
    interim_type,
    is_ppc = false,
    is_ppc_redirect = false,
    margin_top = '',
    no_login_signup = false,
    type = '',
}: LayoutProps) => {
    const [is_mounted] = usePageLoaded()
    const { show_non_eu_popup, setShowNonEuPopup, academy_data } = React.useContext(DerivStore)
    const [show_modal, toggleModal, closeModal] = useModal()
    const [modal_payload, setModalPayload] = React.useState({} as ModalPayloadType)
    const [is_redirection_applied, setRedirectionApplied] = useState(false)
    const { send } = useDerivWS()
    const { has_platform } = usePlatformQueryParam()

    const is_static = type === 'static'

    React.useEffect(() => {
        if (!is_redirection_applied) {
            send({ website_status: 1 }, (response) => {
                if (!response.error) {
                    const {
                        website_status: { clients_country },
                    } = response

                    const current_client_country = clients_country || ''
                    const client_information_cookie = new CookieStorage('client_information')
                    const residence = client_information_cookie.get('residence')
                    setRedirectionApplied(true)
                    !isEuDomain() && handleRedirect(residence, current_client_country)
                }
            })
        }
    }, [is_redirection_applied])

    React.useEffect(() => {
        if (window.location.pathname.includes('academy/blog/posts/')) {
            const slugs = academy_data.blog.map((item) => item.slug)
            const current_page = window.location.pathname.split('/')[4]
            if (!slugs.includes(current_page)) {
                const closest_slug = closestMatch(current_page, slugs)
                const slug = typeof closest_slug === 'string' ? closest_slug : current_page[0]
                const character_distance = distance(current_page, slug)
                if (character_distance < 10) {
                    window.location.pathname = `academy/blog/posts/${closest_slug}`
                }
            }
        }
    }, [])

    // Handle navigation types
    let Navigation
    let FooterNav = <></>
    switch (type) {
        case 'academy':
            Navigation = <NavAcademy />
            FooterNav = <LoadableFooter academy={true} />
            break
        case 'noNav':
            Navigation = <></>
            FooterNav = <Footer />
            break
        case 'static':
            Navigation = <NavStatic />
            break
        case 'interim':
            Navigation = <NavInterim interim_type={interim_type} />
            break
        case 'partners':
            Navigation = <NavPartners hide_login_signup={no_login_signup} />
            FooterNav = <LoadableFooter />
            break
        case 'markets':
            Navigation = <NavMarkets />
            FooterNav = <Footer />
            break
        case 'security':
            Navigation = <NavSecurity />
            FooterNav = <LoadableFooter />
            break
        case 'ebook':
            Navigation = <Nav hide_signup_login />
            FooterNav = <LoadableFooter />
            break
        case 'landing-page':
            Navigation = <NavInterim landing_type />
            FooterNav = <LoadableFooter no_footer_links />
            break
        case 'jump-indices':
            Navigation = <NavJumpIndice />
            FooterNav = <LoadableFooter is_ppc={is_ppc} is_ppc_redirect={is_ppc_redirect} />
            break
        case 'besquare':
            Navigation = <NavCareers is_besquare />
            FooterNav = <BeSquareFooter />
            break
        case 'careers':
            Navigation = <NavCareers />
            FooterNav = <LoadableFooter no_language={true} type={type} />
            break
        case 'transparent':
            Navigation = <NavTransparent is_ppc_redirect={is_ppc_redirect} is_ppc={is_ppc} />
            FooterNav = <LoadableFooter is_ppc={is_ppc} is_ppc_redirect={is_ppc_redirect} />
            break
        case 'payment-methods':
            Navigation = <Nav />
            FooterNav = <Footer />
            break
        case 'conference':
            Navigation = <NavConference />
            FooterNav = <Footer />
            break
        default:
            Navigation = <Nav is_ppc_redirect={is_ppc_redirect} is_ppc={is_ppc} />
            FooterNav = <LoadableFooter is_ppc={is_ppc} is_ppc_redirect={is_ppc_redirect} />
            break
    }
    //Handle page layout when redirection from mobile app.
    if (has_platform) {
        return (
            <Main margin_top={'0'} is_static={is_static}>
                {children}
            </Main>
        )
    }
    return (
        <LocationProvider
            has_mounted={is_mounted}
            toggleModal={toggleModal}
            setModalPayload={setModalPayload}
        >
            {Navigation}
            <Main margin_top={margin_top} is_static={is_static}>
                {children}
            </Main>
            {FooterNav}
            <EURedirect
                toggle={toggleModal}
                is_open={show_modal}
                closeModal={closeModal}
                to={modal_payload.to}
                target={modal_payload.target}
                rel={modal_payload.rel}
                ref={modal_payload.ref}
                aria_label={modal_payload.aria_label}
            />
            <BrowserUpdateAlertModal />
            {show_non_eu_popup && (
                <NonEuRedirectPopUp
                    is_open={show_non_eu_popup}
                    setShowNonEuPopup={setShowNonEuPopup}
                />
            )}
            <LayoutOverlay is_ppc={is_ppc} />
        </LocationProvider>
    )
}

export default Layout
