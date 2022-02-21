import React, { useRef, useState } from 'react'
import "./PageFive.css"
import MDEditor from '@uiw/react-md-editor';
import {withRouter} from 'react-router'
import {useParams} from 'react-router-dom'
import ButtonComponent from '../../ButtonComponent/ButtonComponent'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import checkUsernameExistance from './Firebase Querys/checkUsernameExistance';
import Loading from '../../Loading/Loading';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import addPostToDatabase from './Firebase Querys/addPostToDatabase';
import GoBackArrow from '../../GoBackArrow/GoBackArrow';

const PageFive = ({history}) => {

    const readingTime = require('reading-time/lib/reading-time');

    const title = useRef('')
    const [post, setPost] = useState("");
    const username = useParams().username
    const [loading, setLoading] = useState(true)
    const [userLoged, setUserLoged] = useState(false)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    
    React.useEffect(() => {

        async function pageFiveHandler() {
    
            const data = await checkUsernameExistance(username)
            const auth = getAuth()
        
            onAuthStateChanged(auth, (user) => {

                console.log(user.uid)
                console.log(data.id)
                console.log(user.uid === data.id)
        
                if (user.uid === data.id) {
                    setUserLoged(true)
                } else {
                    history.push('/')
                }
            })

            setLoading(false)
        } 

        pageFiveHandler()
    }, [])

    async function submitFunction() {

        const waitSnackbar = enqueueSnackbar("Processing data.", {
            variant: "info"
        })

        const postTitle = title.current.value

        //* Validation
        if (postTitle === "" || !postTitle) {
            enqueueSnackbar("Please, write a title for your post.", {
                variant: "error"
            })
            return
        }

        if (post === "" || !post) {
            enqueueSnackbar("Please, write your post.", {
                variant: "error"
            })
            return
        }

        //* Check if user is loged
        const data = await checkUsernameExistance(username)
        const auth = getAuth()
        
            onAuthStateChanged(auth, (user) => {

                console.log(user.uid)
                console.log(data.id)
                console.log(user.uid === data.id)
        
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
            console.log('STRING NO TERMINA CON PUNTO')
            shortPost = shortPost + '...'
        } else {
            console.log('STRING TERMINA CON PUNTO')
        }
    
        console.log(shortPost)
        postObject.shortPost = shortPost

        //* Add date
        console.log(moment().unix())
        postObject.date = {seconds: moment().unix()}

        //* Add reading time
        postObject.readingTime = readingTime(post).text.replace(' read', '.')
        console.log(postObject.readingTime)
        
        //* Add post to DB
        const result = await addPostToDatabase(data.id, postObject)

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
    
    return (
        <>
            {
                !userLoged ?
                    <Loading loading={loading} userLoged={userLoged} />
                : null
            }
            {
                userLoged ? 
                    <div className="page">
                        <div className="animate_animated animate__fadeIn title-container">
                            <GoBackArrow onClickFunction={() => history.push(`/${username}`)}/>
                            <input type="text" ref={title} className='title-input title-one' placeholder='Title'/>
                        </div>
                        <MDEditor
                            value={post}
                            onChange={setPost}
                            className="animate_animated animate__fadeIn"
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

export default withRouter(PageFive)