import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'
import {useParams} from 'react-router-dom'
import Loading from '../../Loading/Loading'
import UserHeader from '../../UserHeader/UserHeader'
import UserPosts from '../../UserPosts/UserPosts'
import NoDataPage from '../NoDataPage/NoDataPage'
import checkUsernameExistance from './Firebase Querys/checkUsernameExistance'
import { faFaceTired } from '@fortawesome/free-solid-svg-icons'
import TitleTwo from '../../Titles/TitleTwo'
import checkUsernameLoged from "./Firebase Querys/checkUsernameLoged";
import getPosts from './Firebase Querys/getPosts'
import formatDocs from './Firebase Querys/formatDocs'
import getMorePosts from './Firebase Querys/getMorePosts'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'

const PageFour = () => {

  const [loading, setLoading] = useState(true)
  const [displayUsername, setDisplayUsername] = useState(false)
  const username = useParams().username
  const [userLoged, setUserLoged] = useState(false)
  const [lastPost, setLastPost] = useState(false)
  const [rawPosts, setRawPosts] = useState([])
  const [formatedPosts, setFormatedPosts] = useState([[], [], []])
  const [executionGetMoreData, setExecutionGetMoreData] = useState(false)

  async function pageFourHandler() {

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
    pageFourHandler()
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
              This user doesn't exists... yet...
            </TitleTwo>
          <a href='../'>Back to main page</a>
        </NoDataPage>
      }
    </div>
  )
}

export default PageFour