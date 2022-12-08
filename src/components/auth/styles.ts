import styled from 'styled-components'
import { Button } from 'components/form'

export const FormField = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 40px;
`
export const AuthInput = styled.input`
    min-width: 150px;
    margin: 0 30px;
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
    margin: 0 20px;
`
export const RegisterButton = styled(Button)`
    white-space: nowrap;
    text-align: center;
    color: var(--color-white);
    margin: 0 20px;
`
export const ResetButton = styled(Button)`
    white-space: nowrap;
    text-align: center;
    margin: 0 20px;
`
