import React, { useContext, useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import moment from 'moment';
import {withRouter} from 'react-router'
import {useParams} from 'react-router-dom'
import { useSnackbar } from 'notistack';

import "./CreatePost.css"

import { getAuth, onAuthStateChanged } from "firebase/auth";

import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent'
import Loading from '../../../components/Loading/Loading';
import GoBackArrow from '../../../components/GoBackArrow/GoBackArrow';

import addPostToDatabase from './Firebase Querys/addPostToDatabase';
import checkUsernameExistance from './Firebase Querys/checkUsernameExistance';
import editPostOnDatabase from './Firebase Querys/editPostOnDatabase'
import getPost from './Firebase Querys/getPost'
import LanguageContext from '../../../contexts/LanguageContext';

const CreatePost = ({history}) => {

    const readingTime = require('reading-time/lib/reading-time');

    const language = useContext(LanguageContext).language

    const text = {
        titlePlaceholder: {
            english: "Title",
            spanish: "Título"
        },
        markdownGuide: {
            english: [
                "You don't know markdown?",
                {
                    link: "https://culturedcode.com/things/support/articles/4651820/",
                    text: "Here"
                },
                "is a guide and",
                {
                    link: "https://www.markdownguide.org/cheat-sheet/",
                    text: "here"
                },
                "is a Cheat Sheet!"
            ],
            spanish: [
                "¿No sabes usar Markdown?",
                {
                    link: "https://markdown.es",
                    text: "Aquí"
                },
                "hay una pequeña guía, y",
                {
                    link: "https://comika.es/chuleta-de-mark-down/",
                    text: "aquí"
                },
                "hay un Cheat Sheet (Machete, chuleta...)"
            ]
        },
        submitText: {
            english: "Submit post",
            spanish: "Enviar post"
        },
        snackbar: {
            info: {
                processingData: {
                    english: "Processing data",
                    spanish: "Procesando información"
                }
            },
            error: {
                emptyTitle: {
                    english: "Please, write a title for your post",
                    spanish: "Por favor, escribe un título para tu post"
                },
                emptyPost: {
                    english: "Please, write your post",
                    spanish: "Por favor, escribe tu post"
                },
                firebaseError: {
                    english: "There has been an error, please try again later",
                    spanish: "Ha ocurrido un error. Inténtelo más tarde"
                }
            },
            success: {
                english: "All right!, post published. Coming back to profile in 3 seconds...",
                spanish: "Post publicado! Volviendo al perfil en 3 segundos..."
            }
        }
    }

    const [title, setTitle] = useState("")
    const [post, setPost] = useState("");
    
    const username = useParams().username
    const postId = useParams().postId

    const [loading, setLoading] = useState(true)
    const [userLoged, setUserLoged] = useState(false)
    const [MDeditorMobile, setMDEditorMobile] = useState(false)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    
    React.useEffect(() => {

        async function createPostHandler() {
    
            const data = await checkUsernameExistance(username)
            const auth = getAuth()

            //* If post id is passed on URL, search the post on DB amd set it as post
            if (postId) {
                const response = await getPost(postId, data.id)
                setPost(response.post)
                setTitle(response.title)
            }
        
            onAuthStateChanged(auth, (user) => {
        
                if (user.uid === data.id) {
                    setUserLoged(true)
                } else {
                    history.push('/')
                }
            })

            setLoading(false)
        } 

        createPostHandler()
    }, [])

    async function submitFunction() {

        const waitSnackbar = enqueueSnackbar(text.snackbar.info.processingData[language], {
            variant: "info"
        })

        const postTitle = title

        //* Validation
        if (postTitle === "" || !postTitle) {
            enqueueSnackbar(text.snackbar.error.emptyTitle[language], {
                variant: "error"
            })
            closeSnackbar(waitSnackbar)
            return
        }

        if (post === "" || !post) {
            enqueueSnackbar(text.snackbar.error.emptyPost[language], {
                variant: "error"
            })
            closeSnackbar(waitSnackbar)
            return
        }

        //* Check if user is loged
        const data = await checkUsernameExistance(username)
        const auth = getAuth()
        
            onAuthStateChanged(auth, (user) => {
        
                if (user.uid === data.id) {
                    
                } else {
                    history.push('/')
                }
            })
        
        //* Inizializate object
        const postObject = {}
        
        //* Add title
        postObject.title = postTitle
        
        //* Add post data
        postObject.post = post

        //* Add short post data
        let shortPost = post
        shortPost = shortPost.substring(0, 100).split(' ')
        shortPost.pop()
        shortPost = shortPost.join(' ')

        if (shortPost.slice(-1) !== '.') {
        
            shortPost = shortPost + '...'
        }

        postObject.shortPost = shortPost

        //* Add date
        postObject.date = {seconds: moment().unix()}

        //* Add reading time
        postObject.readingTime = readingTime(post).text.replace(' read', '.')

        let result

        //* If not are a post ID
        if (!postId) {
            //* Add post to DB
            result = await addPostToDatabase(data.id, postObject)
        } else {
            //* Update doc on DB
            result = await editPostOnDatabase(data.id, postId, postObject)
        }

        closeSnackbar(waitSnackbar)

        if (result === 'success') {
            enqueueSnackbar(text.snackbar.success[language], {
                variant: 'success'
            })

            setTimeout(() => {
                history.push(`/${username}`)
            }, 3000)

            return
        }

        if (result === 'error') {
            enqueueSnackbar(text.snackbar.error.firebaseError[language], {
                variant: "error"
            })

            return
        }
    }

    function defineMDEditorStyle() {

        const width = document.body.clientWidth

        if (width <= 900) {
            setMDEditorMobile(true)
        } else {
            setMDEditorMobile(false)
        }
    }

    React.useEffect(() => {
        defineMDEditorStyle()

        window.addEventListener('resize', defineMDEditorStyle)
    }, [])
    
    return (
        <>
            {
                !userLoged ?
                    <Loading loading={loading} userLoged={userLoged} />
                : null
            }
            {
                userLoged ? 
                    <div className="page" id="user-create-post">
                        <div className="animate_animated animate__fadeIn title-container">
                            <GoBackArrow onClickFunction={() => history.push(`/${username}`)}/>
                            <input
                                type="text"
                                className='title-input title-one'
                                placeholder={text.titlePlaceholder[language]}
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </div>
                        <MDEditor
                            value={post}
                            onChange={setPost}
                            className="animate_animated animate__fadeIn"
                            // fullscreen={MDeditorMobile}
                        />
                        <p className='animate_animated animate__fadeIn guide-pragraph'>
                            {
                                text.markdownGuide[language].map(obj => {
                                    if (obj.hasOwnProperty('link')) {
                                        return <>
                                            <a href={obj.link}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {obj.text}
                                            </a>
                                            &nbsp;
                                        </>
                                    } else {
                                        return <>{obj}&nbsp;</>
                                    }
                                })
                            }
                        </p>
                        <ButtonComponent
                            width="20vw"
                            text={text.submitText[language]}
                            color="#4CAF50"
                            className="submit"
                            onClickFunction={submitFunction}
                        />
                    </div>
                : null
            }
        </>
    )
}

export default withRouter(CreatePost)