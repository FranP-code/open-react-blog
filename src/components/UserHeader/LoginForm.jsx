import { getAuth, signInWithEmailAndPassword, getAdditionalUserInfo } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import React from 'react'
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import getUsernameByUid from './Firebase Querys/getUsernameByUid';

const LoginForm = ({username, loginFormHidden, emailInput, passwordInput, alternateLoginForm}) => {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    async function submitCredentials(e) {
        e.preventDefault()

        const email = emailInput.current.value
        const password = passwordInput.current.value
        
        if (email === '') {

            enqueueSnackbar("Please, write a email.", {
                variant: "error"
            })

            return
        }

        if (!validateEmail(email)) {

            enqueueSnackbar("Mmh, this doesn't look like an email.", {
                variant: "error"
            })

            return
        }

        if (password === '') {

            enqueueSnackbar("Please, write a password.", {
                variant: "error"
            })

            return
        }

        if (password.length < 6) {

            enqueueSnackbar("Password too short, please write other one.", {
                variant: "error"
            })

            return
        }

        const processingDataMessage = enqueueSnackbar("Processing introduced data, please wait a minute.", {
            variant: "info"
        })

        const loginResponse = await loginUser(email, password)
        closeSnackbar(processingDataMessage)

        if (loginResponse.response === "success") {

            const welcomeBack = enqueueSnackbar("Welcome back!", {
                variant: "success"
            })

            setTimeout(() => {
                closeSnackbar(welcomeBack)
            }, 1000);

            return
        }

        if (loginResponse.response === "error") {

            enqueueSnackbar("The password don't match or this account is not yours.", {
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
        {/* <form className={`${loginFormHidden ? "fade-out hidden" : "animate__fadeIn"} animate__animated login-form`}> */}
            <input type="email" ref={emailInput} placeholder="Email"/>
            <input type="password" ref={passwordInput} placeholder="Password"/>
            <ButtonComponent
                text={"Submit"}
                width="100%"
                type="submit"
                onClickFunction={submitCredentials}
            />
        </form>
    </div>
  )
}

export default LoginForm