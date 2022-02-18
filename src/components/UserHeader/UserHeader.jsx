import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import {withRouter} from 'react-router'
import { useSnackbar } from 'notistack'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const UserHeader = ({displayUsername, signedIn, history, username}) => {

    const UserHeaderStyles = styled.header`
        
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 2vh 0px;

        --animate-duration: 0.2s;

        .login-form {
            position: absolute;

            width: 20vw;
            left: 77vw;
            top: 9vh;
            z-index: 9000;
            
            background: #0e1855bd;

            padding: 2vh 2vw;
            border-radius: 3px;

            input {
                height: 5vh;
                width: 100%;
                margin-bottom: 1vh;
                outline: none;
                border: none;
                border-bottom: 2px solid #a1a1a1;

                color: #fff;
                font-size: 2.3vh;

                background: none;
            }

            /* input[type="email"] {
            } */
         }
    `

    const [loginFormHidden, setLoginFormHidden] = useState(true)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const emailInput = useRef('')
    const passwordInput = useRef('')

    function redirectPage() {
        history.push(`/${username}/write`)
    }

    function alternateLoginForm() {
        setLoginFormHidden(!loginFormHidden)
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
            return {response: 'success', data: response.user}
        } catch (error) {
            console.log(error)
            return {response: 'error'}
        }
    }

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

            enqueueSnackbar("Welcome back!", {
                variant: "success"
            })

            return
        }

        if (loginResponse.response === "error") {

            enqueueSnackbar("There was an error login in, please try again.", {
                variant: "error"
            })

            return
        }
    }
  
    return (
        <UserHeaderStyles>
            <h1>
                {displayUsername}'s lasts posts
            </h1>
            <ButtonComponent
                color="#66A3FF"
                text={signedIn ? "Write One!" : "Log In"}
                width="20vw"
                onClickFunction={signedIn ? redirectPage : alternateLoginForm}
                showHover={!signedIn ? true : false}      
                hoverText={!signedIn ? "This is your account?" : null}
            />
            {
                !signedIn ?
                    <form className={`${loginFormHidden ? "animate__fadeOut" : "animate__fadeIn"} animate__animated login-form`}>
                        <input type="email" ref={emailInput}/>
                        <input type="password" ref={passwordInput}/>
                        <ButtonComponent
                            text={"Submit"}
                            width="100%"
                            type="submit"
                            onClickFunction={submitCredentials}
                        />
                    </form>
                : null
            }

        </UserHeaderStyles>
    )
}

export default withRouter(UserHeader)