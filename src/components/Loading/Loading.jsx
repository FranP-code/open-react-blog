import React, {useContext} from 'react'
import TitleTwo from '../Titles/TitleTwo'

import LanguageContext from '../../contexts/LanguageContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglass } from '@fortawesome/free-solid-svg-icons'
import "./Loading.css"


const Loading = ({loading, userLoged}) => {

    const language = useContext(LanguageContext).language

    const text = {
        english: "Loading",
        spanish: "Cargando"
    }
    
    return (
        <div
            className={loading && !userLoged ? "loading" : "loading animate__animated animate__fadeOut stop"}
            style={{zIndex: loading && !userLoged? "9001" : "-9001"}}
        >
            <FontAwesomeIcon
                icon={faHourglass}
                className={loading && !userLoged ? "" : "stop"}
            />
            <TitleTwo text={text[language]}/>
        </div>
    )
}

export default Loading