import React, { useState } from 'react';
import './test.scss';
import CrewModal from '../components/CrewModal/CrewModal';
import CreateModal from '../components/CreateModal/CreateModal';

const test = () => {
  const [crewModalPosition, setCrewModalPosition] = useState('down');
  const crewModalHandler = () => {
    crewModalPosition === 'down'
      ? setCrewModalPosition('up')
      : setCrewModalPosition('down');
  };

  const [createModalPosition, setCreateModalPosition] = useState('createDown');
  const createModalHandler = () => {
    createModalPosition === 'createDown'
      ? setCreateModalPosition('createUp')
      : setCreateModalPosition('createDown');
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
      <button
        onClick={() => {
          setCreateModalPosition('createUp');
        }}
      >
        createModal
      </button>
      <div className={crewModalPosition}>
        <CrewModal crewModalHandler={crewModalHandler} />
      </div>
      <div className={createModalPosition}>
        <CreateModal createModalHandler={createModalHandler} />
      </div>
    </div>
  );
};

export default test;
