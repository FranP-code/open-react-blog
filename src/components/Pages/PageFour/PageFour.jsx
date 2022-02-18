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
  const [formatedPosts, setFormatedPosts] = useState([[], [], []])
  const [executionGetMoreData, setExecutionGetMoreData] = useState(false)

  async function pageFourHandler() {

    const checkUsernameData = await checkUsernameExistance(username)
    console.log(checkUsernameData)

    if (checkUsernameData.userExists) {
      setDisplayUsername(checkUsernameData.data.displayUsername)
      checkUsernameLoged(checkUsernameData.id, setUserLoged)
      
      const docs = await getPosts(checkUsernameData.id, setLastPost)
      // setLastPost(docs[docs.length - 1])
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
    
    console.log(lastPost)
    const docs = await getMorePosts(userId, lastPost, setLastPost)

    const formatedDocs = formatDocs(docs)
    const formatedPostCopy = formatedPosts

    console.log("formatedPostCopy", formatedPostCopy)
    console.log("formatedDocs", formatedDocs)

    for (let i = 0; i < 3; i++) {
      
      console.log("formatedPostCopy", formatedPostCopy[i])
      console.log("formatedDocs", formatedDocs[i])

      formatedPostCopy[i].push(...formatedDocs[i])

      console.log("formatedPostCopy", formatedPostCopy[i])
    }

    setFormatedPosts(formatedPostCopy)
    console.log(formatedPosts)

    setExecutionGetMoreData(!executionGetMoreData)
  }

  React.useEffect(() => {

    if (setExecutionGetMoreData === true) {
      getMoreData()
      setExecutionGetMoreData(false)
    }
    //! WTF REACT. THE UNIQUE WAY TO APPLY THE *MOREDATA* ON THE USERPOST COMPONENT
  }, [setExecutionGetMoreData])


  // React.useEffect(() => {

  //   window.onscroll = function(ev) {
  //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //         console.log('bottom')
  //         getMoreData()
  //     }
  // };
  // }, [lastPost])

  useBottomScrollListener(getMoreData)
  // React.useEffect(() => {

  //   if (posts.length < 1) {

  //     return
  //   }

  //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //     getMoreData()
  //   }
  // }, [posts])
  
  return (
    <div className='page'>
      <Loading loading={loading}/>
      {
        displayUsername ?
          <>
            <UserHeader username={username} displayUsername={displayUsername} signedIn={userLoged}/>
            <UserPosts formatedPosts={formatedPosts} getMoreData={getMoreData}/>
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