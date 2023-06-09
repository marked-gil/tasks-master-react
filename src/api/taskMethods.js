import { axiosReq } from "./axiosDefaults";
import moment from 'moment';

export const getFilteredTasks = async (
    {
      filters,
      setTasks,
      setError,
      sharedTasksOnly,
      completedTasksOnly,
      overdueTasksOnly,
      todoTasksOnly,
      due_date,
      category,
      user_id,
      setIsLoaded
    }
  ) => {
  const { category_name, progress, order_by } = filters;
  try {
    setIsLoaded(false);
    if (todoTasksOnly) {
      const { data } = await axiosReq.get(
        `/tasks/?due_date=&progress=to-do&category=${category_name}&ordering=${
          order_by ? order_by : ""}`
      );
      setTasks(data);
    } else if (overdueTasksOnly) {
      const { data } = await axiosReq.get(
        `/tasks/?due_date=&progress=overdue&category=${category_name}&ordering=${
          order_by ? order_by : ""}`
      );
      setTasks(data);
    } else if (completedTasksOnly) {
      const { data } = await axiosReq.get(
        `/tasks/?due_date=&progress=completed&category=${category_name}&ordering=${
          order_by ? order_by : ""}`
      );
      setTasks(data);
    } else if (category) {
      const { data } = await axiosReq.get(
        `/tasks/?due_date=&progress=${progress}&category=${category}&ordering=${
          order_by ? order_by : ""}`
      );
      setTasks(data);
    } else if (sharedTasksOnly) {
      const { data } = await axiosReq.get(
        `/tasks/?shared_to=${user_id}&progress=${progress}&category=${category_name}&ordering=${
          order_by ? order_by : ""}`
      ); 
      setTasks(data);
    } else {
      const { data } = await axiosReq.get(
        `/tasks/?due_date=${moment(due_date).format("yyyy-MM-DD")}&progress=${progress
        }&category=${category_name}&ordering=${order_by ? order_by : ""}`
      );
      setTasks(data);
    }
    setIsLoaded(true)
  } catch (err) {
    setError(
      "Sorry, an error has occured while filtering data. Please try refreshing the page and filter again."
    );
    setIsLoaded(true)
  }
}