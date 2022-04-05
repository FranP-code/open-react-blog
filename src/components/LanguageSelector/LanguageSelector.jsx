import React, { useContext } from 'react'

import './LanguageSelector.css'

import LanguageContext from '../../contexts/LanguageContext'

const LanguageSelector = () => {

    const languageContext = useContext(LanguageContext)

    return (
        <ul className='language-list'>
            {
                languageContext.availableLanguages.map(lan => (
                    <li
                        key={lan}
                        children={
                            lan[0].toUpperCase()
                            +
                            lan[1].toUpperCase()
                        }
                        onClick={() => {
                            //Save language on local storage
                            localStorage.setItem('favoriteLanguage', lan)
                            
                            //Set language on app
                            languageContext.setLanguage(lan)
                        }}
                    />
                ))
            }
        </ul>
    )
}

export default LanguageSelector