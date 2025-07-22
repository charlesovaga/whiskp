import {useQuery} from "@tanstack/react-query"
import axiosInstance from "../utils/axiosInstance"


// fetch  seller data from api
const fetchSeller = async () => {
    try {
      const response = await axiosInstance.get("/api/logged-in-vendor");

      if (!response) {
        throw new Error("Vendor not found in response");
      }
      return response.data?.existingVendor;

      
    } catch (err) {
      console.error("Failed to fetch user", err);
      throw err;
    }
  };
  

const useVendor = () => {
    const { data: existingVendor, isLoading, isError,  refetch } = useQuery({
        queryKey: ["existingVendor"],
        queryFn: fetchSeller,
        staleTime: 1000 * 60 * 5,
        retry: 1,
      })
      
    

    return {existingVendor, isLoading,isError, refetch}
}

export default useVendor