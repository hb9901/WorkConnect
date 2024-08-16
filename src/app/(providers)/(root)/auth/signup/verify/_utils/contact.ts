import axios from 'axios';
import { ContactType } from './email';

export const sendContactEmail = async (emailForm: ContactType) => {
  try {
    const response = await axios.post('/api/contact', emailForm, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || '서버 요청에 실패했어요');
    }
    throw new Error('서버 요청에 실패했어요');
  }
};
