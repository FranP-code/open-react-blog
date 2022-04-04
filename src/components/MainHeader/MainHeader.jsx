import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import LanguageContext from '../../contexts/LanguageContext'

import logo from '../../logo.png'
import TitleOne from '../Titles/TitleOne'
import TitleTwo from '../Titles/TitleTwo'

import './Header.css'

const MainHeader = (props) => {

    const languageContext = useContext(LanguageContext)

    return (
        <header className='main-header'>
            <div className="logo-container" onClick={props.link ? () => props.history.push(props.link) : null} style={{cursor: props.link ? "pointer" : null}}>
                <img src={logo} alt="logo" />
                <TitleOne>ORB</TitleOne>
                <TitleTwo>(Open React Blog)</TitleTwo>
            </div>
            <h2 className='additional-text'>{props.additionalText}</h2>
            {
                languageContext ?
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
                                    onClick={() => languageContext.setLanguage(lan)}
                                />
                            ))
                        }
                    </ul>
                : null
            }
        </header>
    )
}

export default withRouter(MainHeader)