import React from 'react';
import './GuestModeModalBack.scss';

function GuestModeModalBack({ guestMode }) {
    return (
        <>
            {guestMode ?
                <div className="guestModalBack">
                </div>
                :
                ''}
        </>
    )
}

export default GuestModeModalBack
