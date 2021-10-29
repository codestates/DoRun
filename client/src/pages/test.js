import React, { useState } from 'react';
import './test.scss';
import CrewModal from '../components/CrewModal/CrewModal';

const test = () => {
  const [crewModalPosition, setCrewModalPosition] = useState('down');
  const crewModalHandler = () => {
    crewModalPosition === 'down'
      ? setCrewModalPosition('up')
      : setCrewModalPosition('down');
  };
  return (
    <div>
      <button
        onClick={() => {
          setCrewModalPosition('up');
        }}
      >
        crewModal
      </button>
      <div className={crewModalPosition}>
        <CrewModal crewModalHandler={crewModalHandler} />
      </div>
    </div>
  );
};

export default test;
