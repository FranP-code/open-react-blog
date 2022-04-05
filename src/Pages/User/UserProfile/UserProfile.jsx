/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useContext } from 'react'
import {useParams} from 'react-router-dom'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'

import LanguageContext from '../../../contexts/LanguageContext'

import UserHeader from './UserHeader/UserHeader'
import UserPosts from './UserPosts/UserPosts'

import Loading from '../../../components/Loading/Loading'
import NoDataPage from '../../NoDataPage/NoDataPage'
import TitleTwo from '../../../components/Titles/TitleTwo'

import checkUsernameExistance from './Firebase Querys/checkUsernameExistance'
import checkUsernameLoged from "./Firebase Querys/checkUsernameLoged";
import getPosts from './Firebase Querys/getPosts'
import formatDocs from './Firebase Querys/formatDocs'
import getMorePosts from './Firebase Querys/getMorePosts'

import { faFaceTired } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'

const UserProfile = (props) => {

  const language = useContext(LanguageContext).language

  const text = {
    //No users? https://knowyourmeme.com/memes/no-bitches
    noUser: {
      english: "This user doesn't exists... yet...",
      spanish: "Este usuario no existe... aún..."
    },
    backToMainPage: {
      english: "Back to main page",
      spanish: "Volver a la página principal"
    }
  }

  const [loading, setLoading] = useState(true)
  const [displayUsername, setDisplayUsername] = useState(false)
  const username = useParams().username
  const [userLoged, setUserLoged] = useState(false)
  const [lastPost, setLastPost] = useState(false)
  const [rawPosts, setRawPosts] = useState([])
  const [formatedPosts, setFormatedPosts] = useState([[], [], []])
  const [executionGetMoreData, setExecutionGetMoreData] = useState(false)

  async function userProfileHandler() {

    const checkUsernameData = await checkUsernameExistance(username)

    if (checkUsernameData.userExists) {
      setDisplayUsername(checkUsernameData.data.displayUsername)
      checkUsernameLoged(checkUsernameData.id, setUserLoged)
      
      const docs = await getPosts(checkUsernameData.id, setLastPost)
      setRawPosts(docs)
      
      const formatedDocs = formatDocs(docs)
      setFormatedPosts(formatedDocs)
    }

    setLoading(false)
  }
  
  React.useEffect(() => {
    userProfileHandler()
  }, [])

  const getMoreData = async () => {
    
    const checkUsernameData = await checkUsernameExistance(username)
    const userId = checkUsernameData.id
    
    const docs = await getMorePosts(userId, lastPost, setLastPost)
    setRawPosts([...rawPosts, ...docs])

    const formatedDocs = formatDocs(docs)
    const formatedPostCopy = formatedPosts

    for (let i = 0; i < 3; i++) {

      formatedPostCopy[i].push(...formatedDocs[i])
    }

    setFormatedPosts(formatedPostCopy)
    setExecutionGetMoreData(!executionGetMoreData)
  }

  React.useEffect(() => {

    if (setExecutionGetMoreData === true) {
      getMoreData()
      setExecutionGetMoreData(false)
    }
    //! WTF REACT. THE UNIQUE WAY TO APPLY THE *MOREDATA* ON THE USERPOST COMPONENT
  }, [setExecutionGetMoreData])

  useBottomScrollListener(getMoreData)
  
  return (
    <div className='page'>
      <Loading loading={loading}/>
      {
        displayUsername && !loading ?
          <>
            <UserHeader username={username} displayUsername={displayUsername} signedIn={userLoged}/>
            <UserPosts rawPosts={rawPosts} formatedPosts={formatedPosts} getMoreData={getMoreData} username={username}/>
          </>
        :
        <NoDataPage color="#aabdd6">
          <FontAwesomeIcon
                icon={faFaceTired}
                className={loading ? "" : "stop"}
          />
            <TitleTwo>
              {text.noUser[language]}
            </TitleTwo>
          <span className="back-to-main-page" onClick={() => {props.history.push('/')}}>{text.backToMainPage[language]}</span>
        </NoDataPage>
      }
    </div>
  )
}

export default withRouter(UserProfile)