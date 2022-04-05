import React, { useContext } from 'react'

import LanguageContext from '../../../../contexts/LanguageContext'

import ButtonComponent from '../../../../components/ButtonComponent/ButtonComponent'

const AccountForm = ({action, email, setEmail, username, setUsername, password, setPassword, submitFunction}) => {

    const language = useContext(LanguageContext).language

    const text = {
        placeholders: {
            username: {
                english: "Username",
                spanish: "Usuario"
            },
            email: {
                english: "Email",
                spanish: "Correo electrónico"
            },
            password: {
                english: "Password",
                spanish: "Contraseña"
            },
            submit: {
                english: "Create account",
                spanish: "Crear cuenta"
            }
        }
    }
  
    return (
        <div className='account-form' style={{width: action === "register" ? "25vw" : "20vw"}}>
            <form onSubmit={(e) => submitFunction(e)}>
                <input
                    id="username-input"
                    type="text"
                    placeholder={text.placeholders.username[language]}
                    required
                    onChange={(e) => {setUsername(e.target.value)}}
                />
                <input
                    type="email"
                    placeholder={text.placeholders.email[language]}
                    required
                    ref={email}
                />
                <input
                    type="password"
                    placeholder={text.placeholders.password[language]}
                    required
                    ref={password}
                />
                <ButtonComponent
                    type="submit"
                    color="#4CAF50"
                    text={text.placeholders.submit[language]}
                    onClickFunction={(e) => submitFunction(e)}
                />
            </form>
        </div>
    )
}

export default AccountForm