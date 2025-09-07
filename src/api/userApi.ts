import {api} from './axios';

export const userDashboard = async () => {
  try {
    const response = await api.get("/user/dashboard");
    return { data: response.data, error: null };
  } catch (error: any) {
    let errorMsg = "Something went wrong!";
    if (error.response && error.response.data && error.response.data.message) {
      errorMsg = error.response.data.message;
    }
    return { data: null, error: errorMsg };
  }
};