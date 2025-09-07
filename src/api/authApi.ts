import {api} from './axios';

export const registerUser = async (userData: { first_name: string; last_name: string; email: string; password_hash: string }) => {
  try {
    const response = await api.post("/user/signup", userData);
    return { message: response.data.message, suggestions: response.data.suggestion, warning: response.data.warning, error: null };
  } catch (error: any) {
    let errorMsg = "Something went wrong!";
      let suggestions = null;
      let warning = null;
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          errorMsg = error.response.data.message;
        }
        if (error.response.data.suggestions || error.response.data.suggestion) {
          suggestions = error.response.data.suggestions || error.response.data.suggestion;
        }
        if (error.response.data.warning) {
          warning = error.response.data.warning;
        }
      }
      return { message: null, suggestions, warning, token: null, error: errorMsg };
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

export const forgotPassword = async (userData: { email: string }) => {
  try {
    const response = await api.post("/user/forgot-password", userData);
    return { message: response.data.message, token: response.data.token, error: null };
  } catch (error: any) {
    let errorMsg = "Something went wrong!";
    if (error.response && error.response.data && error.response.data.message) {
      errorMsg = error.response.data.message;
    }
    return { message: null, token: null, error: errorMsg };
  }
};

export const verifyOtp = async (userData: { otp: string }, token: string) => {
  try {
    const response = await api.post("/user/verify-otp", userData, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return { message: response.data.message, token: response.data.token, error: null };
  } catch (error: any) {
    let errorMsg = "Something went wrong!";
    if (error.response && error.response.data && error.response.data.message) {
      errorMsg = error.response.data.message;
    }
    return { message: null, token: null, error: errorMsg };
  }
};

export const changePassword = async (userData: { password_hash: string }, token: string) => {
  try {
    const response = await api.post("/user/change-password", userData, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  return { message: response.data.message, suggestions: response.data.suggestion, warning: response.data.warning, error: null };
  } catch (error: any) {
    let errorMsg = "Something went wrong!";
      let suggestions = null;
      let warning = null;
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          errorMsg = error.response.data.message;
        }
        if (error.response.data.suggestions || error.response.data.suggestion) {
          suggestions = error.response.data.suggestions || error.response.data.suggestion;
        }
        if (error.response.data.warning) {
          warning = error.response.data.warning;
        }
      }
      return { message: null, suggestions, warning, token: null, error: errorMsg };
  }
};

export const productListing = async ( page: number, limit: number ) => {
  try {
    const response = await api.get(`/products/list-products?page=${page}&limit=${limit}`);
    return { products: response.data.data, total:response.data.total , error: null };
  } catch (error: any) {
    let errorMsg = "Something went wrong!";
    if (error.response && error.response.data && error.response.data.message) {
      errorMsg = error.response.data.message;
    }
    return { products: null, total: null, error: errorMsg };
  }
};