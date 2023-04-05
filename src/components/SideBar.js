import React, { useRef, useState } from 'react'
import { useCurrentUser } from '../contexts/CurrentUserContext'
import styles from '../styles/SideBar.module.css'

const SideBar = () => {
  const currentUser = useCurrentUser();

  return (
    <div className={styles.SideBar}>
      <p>Hi, {currentUser?.username}!</p>
      <ul className="ps-0 mb-5">
        <li className="mb-2"><a href="#"><i className="fa-solid fa-plus"></i> Add Task</a></li>
        <li className="mb-2"><a href="#"><i className="fa-solid fa-calendar-week"></i> Today</a></li>
        <li className="mb-2"><a href="#"><i className="fa-sharp fa-solid fa-forward"></i> Tomorrow</a></li>
        <li className="mb-2"><a href="#"><i className="fa-solid fa-list-check"></i> All My Tasks</a></li>
        <li className="mb-2"><a href="#"><i className="fa-sharp fa-solid fa-share"></i> Shared Tasks</a></li>
        <li className="mb-2"><a href="#"><i className="fa-sharp fa-solid fa-bell"></i> Overdue Tasks</a></li>
      </ul>
      <div>
        <div className="d-flex align-items-center">
          <h2 className="me-3">Categories</h2>
          <a href="#"><i className="fa-solid fa-plus"></i> Add New</a>
        </div>
        <ul className="ps-0">
          <li className="mb-2"><a href="#">At Home</a></li>
          <li className="mb-2"><a href="#">At Work</a></li>
        </ul>
      </div>
      <a href="#"><i className="fa-solid fa-check-double"></i> Recently Completed Tasks</a>
    </div>
  )
}

export default SideBar