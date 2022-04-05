import React, { useContext } from 'react'
import TitleOne from '../../../../components/Titles/TitleOne'
import TitleTwo from '../../../../components/Titles/TitleTwo'
import LanguageContext from '../../../../contexts/LanguageContext'

const LinkPreview = (props) => {

    const language = useContext(LanguageContext).language

    const text = {
        title: {
            english: "Your link it's gonna be",
            spanish: "Tu link va a ser"
        }
    }
  
    return (
        <div className='link-preview'>
            <TitleOne text={text.title[language]}/>
            <TitleTwo>
                <>
                    open-react-blog.netlify.app/<span className='username'>{props.text}</span>
                </>
            </TitleTwo>
        </div>
    )
}

export default LinkPreview