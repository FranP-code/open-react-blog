import React from 'react'
import TitleOne from '../Titles/TitleOne'
import TitleTwo from '../Titles/TitleTwo'

const LinkPreview = ({text}) => {
  
    return (
        <div className='link-preview'>
            <TitleOne text={"Your link it's gonna be"}/>
            <TitleTwo>
                <>
                open-react-blog.netlify.app/<span className='username'>{text}</span>
                </>
            </TitleTwo>
        </div>
    )
}

export default LinkPreview