import MDEditor from '@uiw/react-md-editor'
import React, { useContext, useState } from 'react'
import {useParams} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSnackbar } from 'notistack'
import { getAuth, onAuthStateChanged } from "firebase/auth";

import getPost from './Firebase Querys/getPost'
import checkUsernameExistance from './Firebase Querys/checkUsernameExistance'
import deletePost from './Firebase Querys/deletePost'

import TitleTwo from '../../../components/Titles/TitleTwo'
import TitleThree from '../../../components/Titles/TitleThree'
import NoDataPage from '../../NoDataPage/NoDataPage'
import Loading from '../../../components/Loading/Loading'
import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent'

import EditImg from './img/edit.svg'
import DeleteImg from './img/delete.svg'

import { faFaceDizzy, faFaceGrinBeam } from '@fortawesome/free-solid-svg-icons'
import LanguageContext from '../../../contexts/LanguageContext'

const ViewPost = ({history}) => {

    const ViewPostStyles = styled.div`
        height: 100%;

        display: flex;
        /* justify-content: space-around; */
        flex-direction: initial;
        
        padding: 0;
        margin-bottom: 2vh;

        .user-data {
            height: 100vh;
            width: 15vw;

            position: fixed;
            top: 0vh;
            border-right: 1px solid #c0d6ff;

            display: flex;
            flex-direction: column;
            align-items: center;

            padding-top: 22vh;
            
            .user-icon {
                min-width: 55px;
                width: 2vw;
                max-width: 125px;
                
                min-height: 55px;
                height: 2vw;
                max-height: 125px;
            }

            h3 {
                font-size: 18pt;
                margin: 0px 2vw;
                text-align: center;
            }

            a {
                margin-top: 1vh;
            }

            .post-button {
                max-width: 50px;
                max-height: 50px;

                margin-top: 1vh;

                img {
                    max-width: calc(50px - 1vw)
                }
            }

            .delete-confirmation {
                width: 100vw;
                height: 100vh;
                
                position: absolute;
                left: 0;
                top: 0;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                background: radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,0.9) 0%, rgba(32,45,58,0.9) 81.3% ); //https://cssgradient.io/gradient-backgrounds/

                z-index: 3000;

                .button-container {
                    width: 50%;

                    display: flex;
                    justify-content: space-around;

                    margin-top: 5vh;
                }
            }
        }
        .content-container {
            
            width: 100vw;
            height: 100vh;

            display: flex;
            justify-content: center;

            /* border: 1px solid #c0d6ff; */

            .content {
                /* height: 100vh; */
                width: 70vw;

                padding: 0px 17vw;

                header {
                    display: flex;
                    align-items: center;
                    
                    padding: 1vh 0px;
                    
                    user-select: initial;

                    /* border-bottom: 1px solid #8d9dbb; */
                }

                .wmde-markdown {

                    margin-top: 2vh;
                    padding-bottom: 2vh;

                    p {
                        text-align: justify;
                    }
                }
            }
        }

        .right-empty-column {
            height: 100vh;
            width: 15vw;

            position: fixed;
            top: 0vh;
            left: calc(100vw - 15vw);

            border-left: 1px solid #c0d6ff;
            
            z-index: -100;
        }

        @media (max-width: 900px) {
            flex-direction: column;
            
            .user-data {
                height: auto;
                width: auto;
                position: initial;
                padding-top: 2vh;

                flex-direction: initial;

                .user-icon {
                    margin: 0px 2vw;
                }

                h3 {
                    margin: 0px 2vw;
                    text-align: center;
                }

                a {
                    margin-left: 1vh;
                    margin-top: 0;
                    /* background-color: #66A3FF;
                    
                    color: #fff;
                    text-decoration: none;
                    font-weight: bold;
                    padding: 1vh 2vw; */
                }

                .post-button {
                    margin-top: 0px;
                    margin-left: 2vw;
                }

                .delete-confirmation {
                    width: 98vw;
                }
            }
            .content-container {
                width: 100%;

                .content {
                    border: none;
                    width: 100%;
                    
                    header {
                        height: 10vh;
                        margin-top: 5vh;
                    }
                }
            }
            .right-empty-column {
                height: 0;
                width: 0;
                position: initial;
            }
        }

        .fade-out {
            animation: fade-out 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) ease-out both;
        }

        .fade-in {
            animation: fade-in 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
        }

        /* ----------------------------------------------
        * Generated by Animista on 2022-3-30 17:53:43
        * Licensed under FreeBSD License.
        * See http://animista.net/license for more info. 
        * w: http://animista.net, t: @cssanimista
        * ---------------------------------------------- */

        /**
         * ----------------------------------------
         * animation fade-out
         * ----------------------------------------
         */
        
            
        @keyframes fade-out {
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }

        @keyframes fade-in {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    `
    
    const language = useContext(LanguageContext).language

    const text = {
        noPost: {
            english: "Post don't found",
            spanish: "Post no encontrado"
        },
        profileLinkText: {
            english: "Profile page",
            spanish: "Perfil"
        },
        buttonsText: {
            delete: {
                english: "Delete",
                spanish: "Eliminar"
            },
            edit: {
                english: "Edit",
                spanish: "Editar"
            }
        },
        deletePostPage: {
            firstTitle: {
                english: "You are gonna delete this post",
                spanish: "Vas a eliminar este post"
            },
            secondTitle: {
                english: "Are you sure?",
                spanish: "¿Estás seguro?"
            },
            yesButton: {
                english: "YES",
                spanish: "Sí"
            },
            noButton: {
                english: "Nah",
                spanish: "Nah"
            }
        },
        snackbar: {
            info: {
                deletingPost: {
                    english: "Deleting post...",
                    spanish: "Eliminando post..."
                }
            },
            success: {
                deletingPost: {
                    english: "Post deleted",
                    spanish: "Post eliminado"
                }
            },
            error: {
                deletingPost: {
                    english: "There has been an error deleting the post",
                    spanish: "Ha habido un error eliminando el post"
                }
            }
        }
    }

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    
    const [post, setPost] = useState(false)
    const [displayUsername, setDisplayUsername] = useState(false)

    const username = useParams().username
    const postId = useParams().postId
    
    const [loading, setLoading] = useState(true)
    const [postFound, setPostFound] = useState(false)

    const [userLoged, setUserLoged] = useState(false)

    const [deletePostSelection, setDeletePostSelection] = useState(false)

    async function viewPostHandler() {

        //* Check if username exists
        const usernameData = await checkUsernameExistance(username)
        setDisplayUsername(usernameData.data.displayUsername)

        //* Get Post Data
        const postData = await getPost(postId, usernameData.id)

        //* Error case
        if (postData.state === "error") {

            setLoading(false)
            return
        }

        //* Stablish post data
        setPostFound(true)
        setPost({
            title: postData.title,
            data: postData.post
        })

        //* Check if signed user is the username of this post
        const auth = getAuth()
        
        onAuthStateChanged(auth, (user) => {

            if (!user) {
                return
            }
    
            if (user.uid === usernameData.id) {

                //* User is loged
                setUserLoged(true)
            }
        })

        setLoading(false)
    }

    async function deletePostFunction() {
        const waitSnackbar = enqueueSnackbar(text.snackbar.info.deletingPost[language], {
            variant: "info"
        })

        const usernameData = await checkUsernameExistance(username)
        const result = await deletePost(usernameData.id, postId)

        closeSnackbar(waitSnackbar)

        if (result === 'success') {
            enqueueSnackbar(text.snackbar.success.deletingPost[language], {
                variant: 'success'
            })

            setTimeout(() => {
                history.push(`/${username}`)
            }, 3000)

            return
        }

        if (result === 'error') {
            enqueueSnackbar(text.snackbar.error.deletingPost[language], {
                variant: "error"
            })

            setDeletePostSelection(false)
        }
    }

    React.useEffect(() => {
        viewPostHandler()
    }, [])

    return (
        <>  
            <Loading loading={loading}/>
            {
                !loading && !postFound ?
                    <NoDataPage>
                        <FontAwesomeIcon
                            icon={faFaceDizzy}
                            color="#aabbdd"
                            className='user-icon'
                        />
                        <h2>{text.noPost[language]}</h2>
                        <Link to={`/${username}`} children="Profile Page"/>
                    </NoDataPage>
                : null
            }
            {
                !loading && postFound ? 
                    <ViewPostStyles className="page">
                        <div className="user-data">
                            <FontAwesomeIcon 
                                icon={faFaceGrinBeam}
                                color="#aabbdd"
                                className='user-icon'
                            />
                            <h3>
                                {displayUsername}
                            </h3>
                            <Link to={`/${username}`} children={text.profileLinkText[language]}/>
                            {
                                userLoged ?
                                    <>
                                        {
                                            [
                                                {image: EditImg, text: text.buttonsText.edit[language], hoverPostition:  "top", onClickFunction: () => history.push(`/${username}/write/${postId}`)},
                                                {image: DeleteImg, text: text.buttonsText.delete[language], hoverPostition:  "bottom", onClickFunction: () => setDeletePostSelection(true)}
                                            ].map(obj => (
                                                <ButtonComponent
                                                    width="5vw"
                                                    height="5vw"
                                                    style={{padding: "1vw", minWidth: 0, borderRadius: "100%"}}
                                                    color="#4c8ad5"
                                                    className={`post-button ${obj.text.toLowerCase()}`}
                                                    disableDefaultPadding={true}
                                                    hoverText={obj.text}
                                                    hoverPosition={obj.hoverPostition}
                                                    onClickFunction={obj.onClickFunction}
                                                    key={obj.text}
                                                >
                                                    <img src={obj.image} alt={`${obj.text.toLowerCase()}-button`} style={{width: '3vw', height: '3vw'}}/>
                                                </ButtonComponent>
                                            ))
                                        }
                                    </>
                                : null
                            }
                            {
                                deletePostSelection ?
                                    <div className={`delete-confirmation ${deletePostSelection ? "fade-in" : "fade-out"}`}>
                                        <TitleTwo
                                            text={text.deletePostPage.firstTitle[language]}
                                            style={{color: "#fff"}}
                                        />
                                        <TitleThree
                                            text={text.deletePostPage.secondTitle[language]}
                                            style={{color: "#fff"}}
                                        />
                                        <div className="button-container">
                                            <ButtonComponent
                                                text={text.deletePostPage.yesButton[language]}
                                                onClickFunction={() => deletePostFunction()}
                                                width="20vw"
                                                color="rgb(211, 47, 47)"
                                            />
                                            <ButtonComponent
                                                text={text.deletePostPage.noButton[language]}
                                                onClickFunction={() => setDeletePostSelection(false)}
                                                width="20vw"
                                            />
                                        </div>
                                    </div>
                                : null
                            }
                        </div>
                        <div className="content-container">
                            <div className="content">
                                <header>
                                    <TitleTwo>
                                        {post.title}
                                    </TitleTwo>
                                </header>
                                <MDEditor.Markdown source={post.data} />
                            </div>
                        </div>
                        <div className="right-empty-column">

                        </div>
                    </ViewPostStyles>
                : null
            }
        </>
    )
}

export default withRouter(ViewPost)