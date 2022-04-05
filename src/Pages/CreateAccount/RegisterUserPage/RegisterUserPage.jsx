import React, { useContext, useRef, useState } from 'react'
import { useSnackbar } from 'notistack';
import {withRouter} from 'react-router'

import './RegisterUserPage.css'
import LanguageContext from '../../../contexts/LanguageContext'

import AccountForm from './AccountForm/AccountForm'
import LinkPreview from './LinkPreview/LinkPreview'
import MainHeader from '../../../components/MainHeader/MainHeader'

import checkUsername from './Firebase Querys/checkUsername'
import createUser from './Firebase Querys/createUser'
import createUserDocumentOnFirestore from './Firebase Querys/createUserDocumentOnFirestore'

const RegisterUserPage = (props) => {

    const language = useContext(LanguageContext).language
    
    const text = {
        defaultUsername: {
            english: "username",
            spanish: "usuario"
        },
        snackbar: {
            error: {
                emptyUsername: {
                    english: "Please, write a username",
                    spanish: "Por favor, escribe un usuario"
                },
                invalidUsername: {
                    english: "Please, write a VALID username",
                    spanish: "Por favor, escribe un usuario VALIDO"
                },
                emptyEmail: {
                    english: "Please, write a email",
                    spanish: "Por favor, escribe un correo electrónico"
                },
                invalidEmail: {
                    english: "Mmh, this doesn't look like an email",
                    spanish: "Por favor, escribe un correo electrónico valido"
                },
                emptyPassword: {
                    english: "Please, write a password",
                    spanish: "Por favor, escriba una contraseña"
                },
                passwordTooShort: {
                    english: "Password too short, please write other one",
                    spanish: "La contraseña es muy corta, escribe otra"
                },
                emailAlreadyOnUse: {
                    english: "Email already in use",
                    spanish: "Este correo electrónico ya fue usado"
                },
                usernameAlreadyOnUse: {
                    english: "Username already on use",
                    spanish: "Usuario en uso. Prueba con otro"
                }
            },
            info: {
                creatingAccount: {
                    english: "Creating account",
                    spanish: "Creando cuenta"
                }
            },
            success: {
                english: "Account created!, you will be redirected in 3 seconds",
                spanish: "Cuenta creada!, vas a ser redirigido en 3 segundos"
            }
        }
    }

    const [displayUsername, setDisplayUsername] = useState(text.defaultUsername[language])
    const [username, setUsername] = useState(text.defaultUsername[language])
    
    const emailValue = useRef(undefined)
    const passwordValue = useRef(undefined)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    React.useEffect(() => {

        if (displayUsername === '') {

            setUsername(text.defaultUsername[language])
            return
        }

        let newUsername = displayUsername
        newUsername = newUsername.toLowerCase()
        newUsername = newUsername.trim()

        if (newUsername.includes(' ')) {

            newUsername = newUsername.replace(/\s/g, '-') // :0 https://flaviocopes.com/how-to-replace-whitespace-javascript/
        }
        
        setUsername(newUsername)
    
    }, [displayUsername])

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      }; //https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript

    async function submitFunction (e) {

        e.preventDefault()

        const email = emailValue.current.value
        const password = passwordValue.current.value

        setUsername(username.trim())

        if (username === '' || Object.values(text.defaultUsername).indexOf(username) > -1) {

            enqueueSnackbar(text.snackbar.error.emptyUsername[language], {
                variant: "error"
            })

            return
        }

        if (username.includes("/")) {

            enqueueSnackbar(text.snackbar.error.invalidUsername[language], {
                variant: "error"
            })

            return
        }

        if (email === '') {

            enqueueSnackbar(text.snackbar.error.emptyEmail[language], {
                variant: "error"
            })

            return
        }

        if (!validateEmail(email)) {

            enqueueSnackbar(text.snackbar.error.invalidEmail[language], {
                variant: "error"
            })

            return
        }

        if (password === '') {

            enqueueSnackbar(text.snackbar.error.emptyPassword[language], {
                variant: "error"
            })

            return
        }

        if (password.length < 6) {

            enqueueSnackbar(text.snackbar.error.passwordTooShort[language], {
                variant: "error"
            })

            return
        }

        const creatingAccountMessage = enqueueSnackbar(text.snackbar.info.creatingAccount[language], {
            variant: "info",
        })
        
        const usernameTaken = await checkUsername(username)
        
        if (usernameTaken) {
            enqueueSnackbar(text.snackbar.error.usernameAlreadyOnUse[language], {
                variant: "error",
                persist: false
            })

            closeSnackbar(creatingAccountMessage)
            return
        }

        const createUserResponse = await createUser(email, password)
        
        if (createUserResponse === 'auth/email-already-in-use') {

            enqueueSnackbar(text.snackbar.error.emailAlreadyOnUse[language], {
                variant: "error",
                persist: false
            })

            closeSnackbar(creatingAccountMessage)
            return
        }

        enqueueSnackbar(text.snackbar.success[language], {
            variant: "success",
            persist: false
        })

        const userData = createUserResponse

        await createUserDocumentOnFirestore(userData, username, displayUsername)
        
        setTimeout(() => {
            props.history.push(`../${username}`)
        }, 3000);
    }
  
    return (
        <div className='page' id='register-user-page'>
            <MainHeader link={"../"}/>
            <div className='flex-container'>
                <AccountForm action={'register'}
                    
                    username={username}
                    setUsername={setDisplayUsername}
                    
                    email={emailValue}
                    
                    password={passwordValue}

                    submitFunction={submitFunction}
                />
                <LinkPreview text={username}/>
            </div>
        </div>
    )
}

export default withRouter(RegisterUserPage)