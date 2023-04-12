import { axiosReq } from "./axiosDefaults";

export const getCategories = async (setter) => {
  try {
    const { data } = await axiosReq.get(`/categories/`);
    setter(data)
  } catch (err) {
    console.log(err);
  }
};

export const getCategory = async (categoryID, setCategoryData, setError) => {
  try {
    const { data } = await axiosReq.get(`/categories/${categoryID}`);
    setCategoryData(data);
  } catch (err) {
    console.log(err.response?.data)
    setError(err.response?.data);
  }
}