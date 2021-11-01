import axios from 'axios';
import { CREATE_CREW } from './types';

export function createCrew(dataToSubmit) {
  const request = axios
    .post('http://localhost:3001/crew/create', dataToSubmit)
    .then((response) => response.data);
  return {
    type: CREATE_CREW,
    payload: request,
  };
}
