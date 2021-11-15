import axios from 'axios';
import { CREATE_CREW, JOIN_CREW, WITHDRAWAL_CREW } from './types';

function createCrew(dataToSubmit) {
  const request = axios
    .post(`${process.env.REACT_APP_SERVER}/crew`, dataToSubmit)
    .then((response) => {
      const filtered = {
        ...response,
        data: {
          ...response.data,
          data: {
            ...response.data.data,
            crewId: response.data.data.id,
          },
        },
      };
      return filtered;
    })
    .catch((e) => console.log(e));
  return {
    type: CREATE_CREW,
    payload: request,
  };
}

function joinCrew(userId, crewId) {
  const request = axios
    .post(`${process.env.REACT_APP_SERVER}/crew/${userId}/${crewId}`)
    .then((response) => {
      return response;
    })
    .catch((e) => console.log(e));
  return {
    type: JOIN_CREW,
    payload: request,
  };
}

function withdrawalCrew(userId) {
  const request = axios
    .delete(`${process.env.REACT_APP_SERVER}/crew/${userId}`)
    .then((response) => {
      return response;
    })
    .catch((e) => console.log(e));
  return {
    type: WITHDRAWAL_CREW,
    payload: request,
  };
}
export { createCrew, joinCrew, withdrawalCrew };
