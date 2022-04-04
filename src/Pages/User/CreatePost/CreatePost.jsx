import React, { useRef, useState } from 'react'
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

const CreatePost = ({history}) => {

    const readingTime = require('reading-time/lib/reading-time');

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

        const waitSnackbar = enqueueSnackbar("Processing data.", {
            variant: "info"
        })

        const postTitle = title

        //* Validation
        if (postTitle === "" || !postTitle) {
            enqueueSnackbar("Please, write a title for your post.", {
                variant: "error"
            })
            closeSnackbar(waitSnackbar)
            return
        }

        if (post === "" || !post) {
            enqueueSnackbar("Please, write your post.", {
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
            enqueueSnackbar("All right!, post published. Coming back to profile in 3 seconds...", {
                variant: 'success'
            })

            setTimeout(() => {
                history.push(`/${username}`)
            }, 3000)

            return
        }

        if (result === 'error') {
            enqueueSnackbar("There has been an error, please try again later.", {
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
                            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className='title-input title-one' placeholder='Title'/>
                        </div>
                        <MDEditor
                            value={post}
                            onChange={setPost}
                            className="animate_animated animate__fadeIn"
                            // fullscreen={MDeditorMobile}
                        />
                        <p className='animate_animated animate__fadeIn guide-pragraph'>You don't know markdown? <a href="https://culturedcode.com/things/support/articles/4651820/">Here</a> is a guide and <a href="https://www.markdownguide.org/cheat-sheet/">here</a> is a Cheat Sheet!</p>
                        <ButtonComponent
                            width="20vw"
                            text="Submit Post"
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