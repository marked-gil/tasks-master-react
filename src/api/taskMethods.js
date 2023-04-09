import { axiosReq } from "./axiosDefaults";
import moment from 'moment';


export const getTasks = async (setTasks, due_date) => {

  try {
    const { data } = await axiosReq.get(
      `/tasks/?due_date=${moment(due_date).format("yyyy-MM-DD")}`
    );
    setTasks(data)
  } catch (err) {
    console.log(err.response?.data)
  }
}

export const getFilteredTasks = async (filters, due_date, setTasks, setError) => {

  const { category_name, progress, order_by } = filters;


  try {
    const status = progress === 'all' ? "" : progress
    const cat_name = category_name === 'all' ? "" : category_name
    
    const { data } = await axiosReq.get(
      `/tasks/?due_date=${moment(due_date).format("yyyy-MM-DD")}&progress=${status ? status : ""
      }&category=${cat_name ? cat_name : ""}&ordering=${order_by ? order_by : ""}`
    );
    setTasks(data);
  } catch (err) {
    console.log(err.response)
    setError(err.response);
  }
}


export const getTodoTasks = async (setTasks, setError) => {

  try {
    const { data } = await axiosReq.get(
      `/tasks/?progress=to-do`
    );
    setTasks(data);
  } catch (err) {
    console.log(err.response)
    setError(err.response);
  }
}