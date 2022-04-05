import React, { useContext, useRef, useState } from 'react'
import {withRouter} from 'react-router'

import LanguageContext from '../../../../contexts/LanguageContext'
import './UserHeader.css'

import ButtonComponent from '../../../../components/ButtonComponent/ButtonComponent'
import LoginForm from './LoginForm'
import LanguageSelector from '../../../../components/LanguageSelector/LanguageSelector'

const UserHeader = ({displayUsername, signedIn, history, username}) => {

    const language = useContext(LanguageContext).language
    
    const text = {
        mainTitle: {
            english: `${displayUsername}'s lasts posts`,
            spanish: displayUsername
        },
        button: {
            signedIn: {
                buttonText: {
                    english: "Write one!",
                    spanish: "Escribe un post!"
                },
                hoverText: {
                    english: "",
                    spanish: ""
                }
            },
            notSignedIn: {
                buttonText: {
                    english: "Log in",
                    spanish: "Iniciar sesión"
                },
                hoverText: {
                    english: "Is this your account?",
                    spanish: "¿Esta es tu cuenta?"
                }
            }
        }
    }

    const [loginFormHidden, setLoginFormHidden] = useState(true)

    const emailInput = useRef('')
    const passwordInput = useRef('')

    function redirectPage() {
        history.push(`/${username}/write`)
    }

    function alternateLoginForm() {
        setLoginFormHidden(!loginFormHidden)

        document.getElementById('root').style.overflowY = loginFormHidden ? "hidden" : "visible"
    }

    return (
        <div className='user-header'>
            <h1 style={{wordBreak: "keep-all"}}>
                {text.mainTitle[language]}
            </h1>
            <div className="user-interaction">
                <ButtonComponent
                    color="#66A3FF"
                    text={signedIn ? text.button.signedIn.buttonText[language] : text.button.notSignedIn.buttonText[language]}
                    width="20vw"
                    onClickFunction={signedIn ? redirectPage : alternateLoginForm}
                    className="header-button"
                    hoverText={signedIn ? text.button.signedIn.hoverText[language] : text.button.notSignedIn.hoverText[language]}
                    hoverPosition="bottom"
                />
                {
                    !signedIn ?
                        <LoginForm username={username} loginFormHidden={loginFormHidden} emailInput={emailInput} passwordInput={passwordInput} alternateLoginForm={alternateLoginForm}/>
                    : null
                }
                <LanguageSelector />
            </div>
        </div>
    )
}

export default withRouter(UserHeader)