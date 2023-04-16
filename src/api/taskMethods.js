import { axiosReq, axiosRes } from "./axiosDefaults";
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
      user_id
    }
  ) => {
  const { category_name, progress, order_by } = filters;
  try {
    if (todoTasksOnly) {
      const { data } = await axiosReq.get(
        `/tasks/?due_date=&progress=to-do&category=${category_name}&ordering=${order_by ? order_by : ""}`
      );
      setTasks(data);
    } else if (overdueTasksOnly) {
      const { data } = await axiosReq.get(
        `/tasks/?due_date=&progress=overdue&category=${category_name}&ordering=${order_by ? order_by : ""}`
      );
      setTasks(data);
    } else if (completedTasksOnly) {
      const { data } = await axiosReq.get(
        `/tasks/?due_date=&progress=completed&category=${category_name}&ordering=${order_by ? order_by : ""}`
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
        `/tasks/?shared_to=${user_id}&progress=${progress}&category=${category}&ordering=${order_by ? order_by : ""}`
      ); 
      setTasks(data);
    } else {
      const { data } = await axiosReq.get(
        `/tasks/?due_date=${moment(due_date).format("yyyy-MM-DD")}&progress=${progress
        }&category=${category_name}&ordering=${order_by ? order_by : ""}`
      );
      setTasks(data);
    }

  } catch (err) {
    console.log(err.response)
    setError(err.response);
  }
}

export const deleteTask = async (task, setTasks) => {
  let task_id = ""

  if (typeof task === 'object') {
    task_id = task.id
  } else if (typeof task === 'string') {
    task_id = task
  } else {
    console.log(typeof task)
  }

  try {
    await axiosRes.delete(`/tasks/${task_id}`)

    if (setTasks) {
      setTasks(prevState => (
        {results: prevState.results.filter(item => item.id !== task.id)}
      ))
    }
  } catch (err) {
    console.log(err.response?.data)
  }
}