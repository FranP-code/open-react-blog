import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import Loading from '../../Loading/Loading'
import UserHeader from '../../UserHeader/UserHeader'
import UserPosts from '../../UserPosts/UserPosts'
import NoDataPage from '../NoDataPage/NoDataPage'
import checkUsernameExistance from './Firebase Querys/checkUsernameExistance'
import { faFaceTired } from '@fortawesome/free-solid-svg-icons'
import TitleTwo from '../../Titles/TitleTwo'
import checkUsernameLoged from "./Firebase Querys/checkUsernameLoged";
import returnAndFormatUsernameDocuments from './Firebase Querys/returnAndFormatUsernameDocuments'

const PageFour = () => {

  const [loading, setLoading] = useState(true)
  const [displayUsername, setDisplayUsername] = useState(false)
  const username = useParams().username
  const [userLoged, setUserLoged] = useState(false)
  const [posts, setPosts] = useState([[], [], []])

  async function pageFourHandler() {

    const checkUsernameData = await checkUsernameExistance(username)
    console.log(checkUsernameData)

    if (checkUsernameData.userExists) {
      setDisplayUsername(checkUsernameData.data.displayUsername)
      checkUsernameLoged(checkUsernameData.id, setUserLoged)
      
      const docs = await returnAndFormatUsernameDocuments(checkUsernameData.id)
      setPosts(docs)
    }
    

    setLoading(false)
  }
  
  React.useEffect(() => {
    pageFourHandler()
  }, [])
  
  return (
    <div className='page'>
      <Loading loading={loading}/>
      {
        displayUsername ?
          <>
            <UserHeader displayUsername={displayUsername} signedIn={userLoged}/>
            <UserPosts posts={posts}/>
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