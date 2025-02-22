import React from 'react'
import styled from 'styled-components'
import { Header } from 'components/elements'
import Alcino from 'images/common/conference/Alcino.png'
import Ricardo from 'images/common/conference/Ricardo.png'
import Sebastian from 'images/common/conference/Sebastian.png'
import Alejandro from 'images/common/conference/Alejandro.png'
import Claudia from 'images/common/conference/Claudia.png'
import Raul from 'images/common/conference/Raul.png'
import Sasky from 'images/common/conference/Sasky.png'
import Ana from 'images/common/conference/Ana.png'
import device from 'themes/device'
import { Localize, localize } from 'components/localization'

const SpeakersWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 120px;

    @media ${device.tabletL} {
        padding: 40px 80px 0;
    }
`
const SpeakersTable = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 56px;
    max-width: 1440px;
`
const IndividualSpeaker = styled.div`
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    width: 282px;
    height: fit-content;
    margin: 0 12px 56px 12px;
    box-shadow: 0 1px 3px rgba(14, 14, 14, 0.1), 0 1px 2px rgba(14, 14, 14, 0.06);
    border-radius: 8px;
`
const Photo = styled.img`
    max-width: 282px;
    max-height: 190px;
    border-radius: 8px 8px 0 0;
`
const SpeakerInfo = styled(Header)`
    text-align: center;
    white-space: nowrap;
`

const Speakers = () => {
    const speakers_info = [
        { name: 'Alcino', role: <Localize translate_text="LATAM Deriv Manager" />, photo: Alcino },
        {
            name: 'Ricardo',
            role: <Localize translate_text="Central America Deriv team leader" />,
            photo: Ricardo,
        },
        {
            name: 'Sebastian',
            role: <Localize translate_text="Colombia Deriv team leader" />,
            photo: Sebastian,
        },
        {
            name: 'Sasky',
            role: <Localize translate_text="Brazil Deriv team leader" />,
            photo: Sasky,
        },
        {
            name: 'Claudia',
            role: <Localize translate_text="Deriv Affiliate Manager" />,
            photo: Claudia,
        },
        { name: 'Raul', role: <Localize translate_text="GDeriv Affiliate Manager" />, photo: Raul },
        {
            name: 'Alejandro',
            role: <Localize translate_text="Deriv customer support" />,
            photo: Alejandro,
        },
        { name: 'Ana', role: <Localize translate_text="Deriv Affiliate Manager" />, photo: Ana },
    ]

    return (
        <SpeakersWrapper>
            <Header as="h5" type="heading-2" align="center">
                {localize('Speakers')}
            </Header>
            <SpeakersTable>
                {speakers_info.map((speaker) => {
                    return (
                        <IndividualSpeaker key={speaker.name}>
                            <Photo src={speaker.photo} alt={speaker.name} />
                            <SpeakerInfo as="div" type="subtitle-1" pt="24px">
                                {localize(speaker.name)}
                            </SpeakerInfo>
                            <SpeakerInfo
                                as="div"
                                weight="normal"
                                pt="8px"
                                mb="16px"
                                style={{ fontSize: '16px' }}
                            >
                                {speaker.role}
                            </SpeakerInfo>
                        </IndividualSpeaker>
                    )
                })}
            </SpeakersTable>
        </SpeakersWrapper>
    )
}

export default Speakers
