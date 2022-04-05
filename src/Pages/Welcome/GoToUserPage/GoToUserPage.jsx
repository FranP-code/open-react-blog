import React, { useContext } from 'react'
import styled from 'styled-components'

import GoToLinkForm from '../../../components/GoToLinkForm/GoToLinkForm'
import RotatingText from '../../../components/RotatingText/RotatingText'
import TitleOne from '../../../components/Titles/TitleOne'
import TitleTwo from '../../../components/Titles/TitleTwo'
import Arrow from '../../../components/Arrow/Arrow'
import LanguageContext from '../../../contexts/LanguageContext'

const GoToUserPage = () => {

    const Styles = styled.div`

        height: 100vh;

        display: flex;
        flex-direction: column;
        
        justify-content: space-between;

        .form-container {

            height: auto;

            margin-top: 6vh;

            display: flex;
            flex-direction: column;
            justify-content: space-around;
            
            .titles-container {
                
                margin-bottom: 5vh;
            }
            
            h2 {

                margin-bottom: 3vh;
                font-weight: initial !important;
            }

            form {

                margin-bottom: 5vh;
            }

        }
    `

    const language = useContext(LanguageContext).language

    const text = {
        // english: {
        //     firstTitle: "Do you have",
        //     secondTitle: {
        //         separator: "a",
        //         rotatingTextData: ["friend", "influencer", "familiar"],
        //         end: {
        //             space: true,
        //             text: "link?"
        //         }
        //     },
        //     formTitle: "Paste it here 👇 or in the web browser to go"
        // },
        // spanish: {
        //     firstTitle: "Tienes el link",
        //     secondTitle: {
        //         separator: "de un",
        //         rotatingTextData: ["amigo", "influencer", "familiar", "conocido"],
        //         end: {
        //             space: false,
        //             text: "?"
        //         }
        //     },
        //     formTitle: "Pegalo aquí 👇 o en el navegador web para visitarlo"
        // }
        firstTitle: {
            english: "Do you have",
            spanish: "Tienes en link"
        },
        secondTitle: {
            separator: {
                english: "a",
                spanish: "de un"
            },
            rotatingTextData: {
                english: ["friend", "influencer", "familiar"],
                spanish: ["amigo", "influencer", "familiar", "conocido"]
            },
            end: {
                spanish: {
                    space: false,
                    text: "?"
                },
                english: {
                    space: true,
                    text: "link?"
                }
            }
        },
        formTitle: {
            english: "Paste it here 👇 or in the web browser to go",
            spanish: "Pegalo aquí 👇 o en el navegador web para visitarlo"
        }
    }

    return (
            <div className='page' id='welcome-go-to-user-page'>
                <Styles>
                    <div className="form-container">
                        <div className="titles-container"> 
                            <TitleOne text={text.firstTitle[language]} />
                            <TitleOne>
                                <>
                                    {text.secondTitle.separator[language]}&nbsp;
                                    <RotatingText
                                        data={text.secondTitle.rotatingTextData[language]}
                                        timeBetweenWordAndWord={1.5}
                                        animationDuration={1}
                                    />
                                    {text.secondTitle.end[language].space ? <>&nbsp;</> : null}{text.secondTitle.end[language].text}
                                </>
                            </TitleOne>
                        </div>
                        <div className="form">
                            <TitleTwo text={text.formTitle[language]}/>
                            <GoToLinkForm />
                        </div>
                    </div>
                    <Arrow direction="welcome-main-page" reverse={true}/>
                </Styles>
            </div>
    )
}

export default GoToUserPage