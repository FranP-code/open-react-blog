import React, { useContext } from 'react'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { useSnackbar } from 'notistack';

import ButtonComponent from '../../../../components/ButtonComponent/ButtonComponent';

import getUsernameByUid from './Firebase Querys/getUsernameByUid';

import LanguageContext from '../../../../contexts/LanguageContext';

const LoginForm = ({username, loginFormHidden, emailInput, passwordInput, alternateLoginForm}) => {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const language = useContext(LanguageContext).language

    const text = {
        formPlaceholers: {
            email: {
                english: "Email",
                spanish: "Correo electrónico"
            },
            password: {
                english: "Password",
                spanish: "Contraseña"
            },
            submit: {
                english: "Submit",
                spanish: "Enviar"
            }
        },
        snackbar: {
            error: {
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
                loginFail: {
                    english: "The password don't match or this account is not yours",
                    spanish: "La contraseña es incorrecta o esta cuenta no es tuya"
                }
            },
            info: {
                processingData: {
                    english: "Processing introduced data, please wait a minute",
                    spanish: "Procesando información, por favor espere un minuto"
                }
            },
            success: {
                english: "Welcome back!",
                spanish: "¡Bienvenido!"
            }
        }
    }

    async function submitCredentials(e) {
        e.preventDefault()

        const email = emailInput.current.value
        const password = passwordInput.current.value
        
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

        const processingDataMessage = enqueueSnackbar(text.snackbar.info.processingData[language], {
            variant: "info"
        })

        const loginResponse = await loginUser(email, password)
        closeSnackbar(processingDataMessage)

        if (loginResponse.response === "success") {

            const welcomeBack = enqueueSnackbar(text.snackbar.success[language], {
                variant: "success"
            })

            setTimeout(() => {
                closeSnackbar(welcomeBack)
            }, 1000);

            return
        }

        if (loginResponse.response === "error") {

            enqueueSnackbar(text.snackbar.error.loginFail, {
                variant: "error"
            })

            return
        }
    }

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      }; //https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript

    async function loginUser(email, password) {
        const auth = getAuth()

        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            const user = await getUsernameByUid(response.user.uid)

            if (user.username === username) {
                return {response: 'success', data: response.user}
            } else {
                auth.signOut()
                return {response: "error"}
            }
        } catch (error) {
            console.log(error)
            return {response: 'error'}
        }
    }

  return (
      <div
        className={`${loginFormHidden ? "form-container hidden fade-out" : "form-container fade-in" }`}
        onClick={e => {
            
            if (e.target.tagName === "DIV") {
                alternateLoginForm()
            }

        }}
    >
        <form className='login-form' onClick={() => {}}>
            <input type="email" ref={emailInput} placeholder={text.formPlaceholers.email[language]}/>
            <input type="password" ref={passwordInput} placeholder={text.formPlaceholers.password[language]}/>
            <ButtonComponent
                text={text.formPlaceholers.submit[language]}
                width="100%"
                type="submit"
                onClickFunction={submitCredentials}
            />
        </form>
    </div>
  )
}

export default LoginForm