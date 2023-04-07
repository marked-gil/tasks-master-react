import { axiosReq } from "./axiosDefaults";
import moment from 'moment';


export const getTasks = async (setTasks, date) => {

  try {
    if (date === moment().format()) {
      const { data } = await axiosReq.get(
        `/tasks/?due_date=${moment(date).format("yyyy-MM-DD")}`
      );
      setTasks(data)
    }

  } catch (err) {
    console.log(err.response?.data)
  }
}

