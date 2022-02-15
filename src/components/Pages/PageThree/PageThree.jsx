import React, { useRef, useState } from 'react'
import './PageThree.css'
import AccountForm from '../../AccountForm/AccountForm'
import LinkPreview from '../../LinkPreview/LinkPreview'
import MainHeader from '../../MainHeader/MainHeader'
import { useSnackbar } from 'notistack';

import checkUsername from './Firebase Querys/checkUsername'
import createUser from './Firebase Querys/createUser'
import createUserDocumentOnFirestore from './Firebase Querys/createUserDocumentOnFirestore'

const PageThree = () => {

    const [displayUsername, setDisplayUsername] = useState('username')
    const [username, setUsername] = useState('username')
    
    const emailValue = useRef(undefined)
    const passwordValue = useRef(undefined)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    React.useEffect(() => {

        if (displayUsername === '') {

            setUsername('username')
            return
        }

        let newUsername = displayUsername
        newUsername = newUsername.toLowerCase()

        if (newUsername.includes(' ')) {

            newUsername = newUsername.replace(' ', '-')
            // const usernameTrimed = username.split(' ')
            // console.log(usernameTrimed)
            // console.log(typeof usernameTrimed)

            // if (typeof username === 'object' && usernameTrimed.length > 1) {

            //     let newUsername = ''

            //     usernameTrimed.forEach((subString, index) => {

            //         if (index === 0) {
                        
            //             newUsername = subString
            //             return
            //         }
            //         newUsername = newUsername + '-' + subString
            //     });
                
        }
        
        setUsername(newUsername)

        // document.getElementById('username-input').focus()
    
    
    }, [displayUsername])

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      }; //https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript

    async function submitFunction (e) {

        console.log(displayUsername)
        console.log(username)

        e.preventDefault()

        const email = emailValue.current.value
        const password = passwordValue.current.value

        if (username === '' || username === 'username') {

            enqueueSnackbar("Please, write a username.", {
                variant: "error"
            })

            return
        }

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

        const creatingAccountMessage = enqueueSnackbar("Creating account", {
            variant: "info",
        })

        const usernameTaken = await checkUsername(username, enqueueSnackbar)

        if (usernameTaken) {

            closeSnackbar(creatingAccountMessage)
            return
        }

        const createUserResponse = await createUser(email, password)
        
        if (createUserResponse === 'auth/email-already-in-use') {

            enqueueSnackbar("Email already in use", {
                variant: "error",
                persist: false
            })

            closeSnackbar(creatingAccountMessage)
            return
        }

        enqueueSnackbar("Account created!, you will be redirected in 3 seconds", {
            variant: "success",
            persist: false
        })

        const userData = createUserResponse

        createUserDocumentOnFirestore(userData, username, displayUsername)
    }
  
    return (
        <div className='page' id='page-three'>
            <MainHeader additionalText={"Create Account"}/>
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

export default PageThree