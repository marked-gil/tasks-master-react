import { axiosReq } from "./axiosDefaults";


export const getCategory = async (categoryID, setCategoryData, setError) => {

  try {
    const { data } = await axiosReq.get(`/categories/${categoryID}`);
    setCategoryData(data);
  } catch (err) {
    setError(err.response?.data);
  }
}