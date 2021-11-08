import React from 'react'
import './CrewSignoutBack.scss';

function CrewSignoutBack({ crewSignoutOpen }) {
    return (
        <>
            {crewSignoutOpen ?
                (<div className="crewSignoutModalBack">
                </div>) : ''}
        </>

    )
}

export default CrewSignoutBack
