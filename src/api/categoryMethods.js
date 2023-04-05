import { axiosReq } from "./axiosDefaults";

export const getCategories = async (setter) => {
  try {
    const { data } = await axiosReq.get(`/categories/`);
    setter(data)
  } catch (err) {
    console.log(err);
  }
};