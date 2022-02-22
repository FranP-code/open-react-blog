import React from 'react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const GoBackArrow = ({onClickFunction}) => {

    const arrowWidth = "2vw"

    const GoBackArrowStyles = styled.div`

        .back-arrow {

            min-width: 55px;
            width: ${arrowWidth};
            max-width: 125px;
            
            min-height: 55px;
            height: ${arrowWidth};
            max-height: 125px;

            margin-right: 0.2vw;

            cursor: pointer;
        }

        @media (max-width: 640px) {
            .back-arrow {
                min-width: 42px;
                min-height: 42px
            }
        }
    `
  return (
      <GoBackArrowStyles>
        <FontAwesomeIcon
            icon={faChevronLeft}
            color="#aabbdd"
            className='back-arrow'
            onClick={onClickFunction}
        />
    </GoBackArrowStyles>
  )
}

export default GoBackArrow