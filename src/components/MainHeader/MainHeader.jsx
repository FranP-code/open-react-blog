import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import logo from '../../logo.png'
import TitleOne from '../Titles/TitleOne'
import TitleTwo from '../Titles/TitleTwo'

import './Header.css'

const MainHeader = (props) => {
  
    return (
        <header className='main-header'>
            <div className="logo-container" onClick={props.link ? () => props.history.push(props.link) : null} style={{cursor: props.link ? "pointer" : null}}>
                <img src={logo} alt="logo" />
                <TitleOne>ORB</TitleOne>
                <TitleTwo>(Open React Blog)</TitleTwo>
            </div>
            <h2 className='additional-text'>{props.additionalText}</h2>
        </header>
    )
}

export default withRouter(MainHeader)