import {useQuery} from "@tanstack/react-query"
import axiosInstance from "../utils/axiosInstance"


// fetch  user data from api
const fetchUser = async () => {
  try {
    const response = await axiosInstance.get("/api/logged-in-user");
    console.log("Response data:", response.data); // <--- Add this
    return response.data.existingUser;
  } catch (err) {
    console.error("Failed to fetch user", err);
    throw err;
  }
};


const useUser = () => {
    const { data: existingUser, isLoading, isError,  refetch } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        staleTime: 1000 * 60 * 5,
        retry: 1,
      })
      
    

    return {existingUser, isLoading,isError, refetch}
}

export default useUser