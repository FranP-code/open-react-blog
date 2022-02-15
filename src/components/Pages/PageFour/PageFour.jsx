import React from 'react'
import {useParams} from 'react-router-dom'
import UserHeader from '../../UserHeader/UserHeader'
import UserPosts from '../../UserPosts/UserPosts'

const PageFour = () => {
  
  return (
    <div className='page'>
      <UserHeader displayUsername={useParams().displayUsername} signedIn={true}/>
      <UserPosts/>
    </div>
  )
}

export default PageFour