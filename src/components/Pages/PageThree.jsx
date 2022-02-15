import React, { useRef, useState } from 'react'
import './PageThree.css'
import AccountForm from '../AccountForm/AccountForm'
import LinkPreview from '../LinkPreview/LinkPreview'
import MainHeader from '../MainHeader/MainHeader'
import { useSnackbar } from 'notistack';

const PageThree = () => {

    const [username, setUsername] = useState('username')
    
    const emailValue = useRef(undefined)
    const passwordValue = useRef(undefined)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    React.useEffect(() => {

        if (username === '') {

            setUsername('username')
            return
        }

        let newUsername = username
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
    
    
    }, [username])

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      }; //https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript

    function submitFunction(e) {

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

        enqueueSnackbar("Creating account", {
            variant: "info",
            
        })
    }
  
    return (
        <div className='page' id='page-three'>
            <MainHeader additionalText={"Create Account"}/>
            <div className='flex-container'>
                <AccountForm action={'register'}
                    
                    username={username}
                    setUsername={setUsername}
                    
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