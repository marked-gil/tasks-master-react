import { axiosReq } from "./axiosDefaults";
import moment from 'moment';


export const getTasks = async (setTasks) => {

  try {
    const { data } = await axiosReq.get(
      `/tasks/?due_date=${moment().format("yyyy-MM-DD")}`
    );
    setTasks(data)
  } catch (err) {
    console.log(err.response?.data)
  }
}

