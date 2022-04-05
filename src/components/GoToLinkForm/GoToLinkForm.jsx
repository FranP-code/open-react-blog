import React, {useRef, useContext} from 'react'
import styled from 'styled-components'
import { useSnackbar } from 'notistack';
import LanguageContext from '../../contexts/LanguageContext'

const GoToLinkForm = () => {

    const GoToLinkFormStyles = styled.div`

        form {            
            display: flex;
            justify-content: space-around;

            width: 94vw;

            input {
                
                height: 6vw;

                border: solid #000 5px;
                border-radius: 4px;
                
                outline: none;
                
                box-shadow: 17px 19px #000;
            }

            input[type="text"] {

                width: 85vw;

                font-size: 2vw;
                padding-left: 1vw;
            }

            input[type="submit"] {

                width: 6vw;

                background-color: #7CFF79;

                font-size: 2vw;
                font-weight: bold;

                &:active {

                    transform: translate(17px, 19px);
                    box-shadow: none;
                }
            }
        }

        @media (max-width: 640px) {
            form {
                flex-direction: column;
                align-items: center;

                input {
                    box-shadow: none;
                    border: #000 solid 2px;
                }

                input[type="text"] {
                    width: 90vw;
                    height: 5vh;
                    font-size: 18pt;
                }
                input[type="submit"] {
                    width: 90vw;
                    height: 5vh;
                    font-size: 18pt;

                    margin-top: 1.5vh;
                    /* box-shadow: none; */
                }
            }
        }
    `
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const language = useContext(LanguageContext).language
    
    const text = {
        snackbar: {
            error: {
                emptyInput: {
                    english: "Please, put some text in the field",
                    spanish: "Por favor, escriba el usuario en el cuadro de texto"
                },
                invalidInput: {
                    english: "Please, write a VALID username",
                    spanish:"Por favor, escriba un usuario VALIDO"
                }
            },
            success: {
                english: user => `Moving to ${user}'s page.`,
                spanish: user => `Yendo a la página de ${user}`
            }
        }
    }

    const inputValue = useRef('')

    function submitValidation(e) {

        e.preventDefault()

        const value = inputValue.current.value.trim()

        if (value === '') {

            enqueueSnackbar(text.snackbar.error.emptyInput[language], {
                variant: "error"
            })

            return
        }

        if (value.includes("/")) {

            enqueueSnackbar(text.snackbar.error.invalidInput[language], {
                variant: "error"
            })

            return
        }

        let user = ''

        if (value.includes("open-react-blog.netlify.app/")) {
            user = value.split("open-react-blog.netlify.app/")[1]
        } else {
            user = value
        }

        enqueueSnackbar(text.snackbar.success[language](user), {
            variant: "success"
        })

        const espacedString = user.split(' ')

        if (espacedString.length !== 1) {

            user = ''

            espacedString.forEach((subString, index) => {

                if (index === 0) {
                    
                    user = subString
                    return
                }

                user = user + '-' + subString
            })
        }

        window.location.href = `https://open-react-blog.netlify.app/${user.toLowerCase()}`        
    }
  
    return (
        <GoToLinkFormStyles >
            <form spellCheck="false" onSubmit={submitValidation}>
                <input type="text" ref={inputValue}></input>
                <input type="submit" value="GO"></input>
            </form>
        </GoToLinkFormStyles>
    )
}

export default GoToLinkForm