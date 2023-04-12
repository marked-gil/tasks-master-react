import { axiosReq, axiosRes } from "./axiosDefaults";
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

export const getFilteredTasks = async (
    {
      filters,
      setTasks,
      setError,
      overdueTasksOnly,
      todoTasksOnly,
      due_date,
      category,
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
    } else if (category) {
      const { data } = await axiosReq.get(
        `/tasks/??due_date=&progress=${progress
        }&category=${category}&ordering=${order_by ? order_by : ""}`
      );
      console.log("filtered by Cat", data)
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

export const getTasksByCategory = async (categoryID, setTasks, setError) => {
  try {
    const { data } = await axiosReq.get(`/tasks/?category=${categoryID}`)
    setTasks(data)
  } catch (err) {
    console.log(err.response?.data)
    setError(err.response?.data)
  }
}

export const getOverdueTasks = async (setTasks, setError) => {
  try {
    const { data } = await axiosReq.get(
      `/tasks/?progress=overdue`
    );
    setTasks(data);
  } catch (err) {
    console.log(err.response?.data)
    setError(err.response?.data)
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