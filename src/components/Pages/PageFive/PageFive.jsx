import React, { useRef, useState } from 'react'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./PageFive.css"
import MDEditor from '@uiw/react-md-editor';
import {withRouter} from 'react-router'
import {useParams} from 'react-router-dom'
import ButtonComponent from '../../ButtonComponent/ButtonComponent'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import checkUsernameExistance from './Firebase Querys/checkUsernameExistance';
import Loading from '../../Loading/Loading';

const PageFive = ({history}) => {

    const title = useRef('')
    const [post, setPost] = useState("");
    const username = useParams().username
    const [loading, setLoading] = useState(true)
    const [userLoged, setUserLoged] = useState(false)
    
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
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                color="#aabbdd"
                                className='back-arrow'
                                onClick={() => history.push(`/${username}`)}
                            />
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
                        />
                    </div>
                : null
            }
        </>
    )
}

export default withRouter(PageFive)