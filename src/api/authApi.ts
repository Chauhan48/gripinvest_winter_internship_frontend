import api from './axios';

export const registerUser = async (userData: { first_name: string; last_name: string; email: string; password_hash: string }) => {
  try {
    const response = await api.post("/user/signup", userData);
    return { message: response.data.message, error: null };
  } catch (error: any) {
    let errorMsg = "Something went wrong!";
    if (error.response && error.response.data && error.response.data.message) {
      errorMsg = error.response.data.message;
    }
    return { message: null, error: errorMsg };
  }
};

export const loginUser = async (userData: { email: string; password_hash: string }) => {
  try {
    const response = await api.post("/user/login", userData);
    return { message: response.data.message, error: null };
  } catch (error: any) {
    let errorMsg = "Something went wrong!";
    if (error.response && error.response.data && error.response.data.message) {
      errorMsg = error.response.data.message;
    }
    return { message: null, error: errorMsg };
  }
};