import React, { useEffect } from 'react';
import './CrewSignout.scss';
import CrewSignoutBack from './CrewSignoutBack';
import axios from 'axios';
axios.defaults.withCredentials = true;

function CrewSignout({ crewSignoutOpen }) {

    const currentUserId = sessionStorage.getItem('userId');
    const currentCrewId = sessionStorage.getItem('userCrewId');
    console.log(currentCrewId)



    const crewSignoutHandler = () => {
        axios.delete(`http://localhost:3001/crew/${currentUserId}`)
            .then((res) => {
                // console.log('크루 탈퇴 요청에 대한 응답입니다', res)
                if (res.data.message === 'success') {
                    sessionStorage.setItem('userCrewId', 'null')
                    location.reload()
                }
            })
            .catch(e => console.log(e))
    }

    return (
        <div className="crewSignout">
            크루 나가기
            {crewSignoutOpen ?
                (<div className="crewSignoutModal">
                    <div className="crewSignoutModalNotice"> 참여한 크루를 나가시겠습니까? </div>
                    <div className="crewSignoutModalBtn" onClick={crewSignoutHandler}> 네, 현재 크루에서 나가겠습니다 </div>
                </div>) : ''}
        </div>
    )
}

export default CrewSignout
