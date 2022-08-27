import axios from 'axios';
import { API_ROOT } from '../../utils/constant';
export const fetchBoardDetail = async (id) => {
  const req = await axios.get(`${API_ROOT}/v1/boards/${id}`);
  console.log(req);
  return req.data;
};
