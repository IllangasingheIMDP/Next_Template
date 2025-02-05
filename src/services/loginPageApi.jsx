import api from "@/redux/api"

export const loginUser = async (email, password) => {
  try {
    const response = await api.post(`/auth/login`, { email, password });
    return response.data; // Return data to the cal ler
  } catch (error) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};
export const loginAdmin = async (email, password) => {
  try {
    const response = await api.post(`/admin/login`, { email, password });
    return response.data; // Return data to the cal ler
  } catch (error) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};
export const register = async (username,email, password) => {
    try {
      const response = await api.post(`/auth/register`, {username, email, password });
      return response.data; // Return data to the caller
    } catch (error) {
      throw new Error(error.response?.data?.error || "Registration failed");
    }
  }
export const getUserData=async()=>{
  try {
    
    const response=await api.get(`/common/userdata`);
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch user data");
  }
}