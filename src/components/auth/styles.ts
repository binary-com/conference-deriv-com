import styled from 'styled-components'
import { Button } from 'components/form'
import device from 'themes/device'

export const AuthWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 120px;

    @media ${device.laptopM} {
        padding: 40px 80px;
    }
`
export const LoginForm = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`
export const RegisterForm = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    max-width: 700px;
`
export const ResetForm = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
export const ControlArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
export const AuthInput = styled.input`
    min-width: 250px;
    margin: 10px 20px;
    font-size: var(--text-size-s);
    padding-block: 1px;
    padding-inline: 8px 10px;
    block-size: 40px;
    border-radius: 4px;
`
export const AuthButtons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
export const LoginButton = styled(Button)`
    white-space: nowrap;
    text-align: center;
    color: var(--color-white);
    margin: 20px;
`
export const RegisterButton = styled(Button)`
    white-space: nowrap;
    text-align: center;
    color: var(--color-white);
    margin: 20px;
`
export const ResetButton = styled(Button)`
    white-space: nowrap;
    text-align: center;
    margin: 20px;
`
