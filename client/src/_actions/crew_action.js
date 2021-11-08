import axios from 'axios';
import { CREATE_CREW } from './types';

export function createCrew(dataToSubmit) {
  const request = axios
    .post('http://localhost:3001/crew', dataToSubmit)
    .then((response) => {
      console.log('등록된 크루에 대한 정보입니다', response.data)
      return response
    })
    .catch(e => console.log(e))
  return {
    type: CREATE_CREW,
    payload: request,
  };
}
