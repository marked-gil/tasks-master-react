import React, { useState } from 'react';
import styles from '../styles/ProfileAvatar.module.css';
import UserSharingPopover from './UserSharingPopover';

function ProfileAvatar(props) {

  const {
    owner, 
    isOwner, 
    showName, 
    imageWidth, 
    img_src,
    isDeletable,
    taskData,
    setTaskData,
    className
  } = props;

  const [ showDelete, setShowDelete ] = useState(false);

  const handleMouseHover = () => {
    setShowDelete(true);
  };

  const handleMouseLeave = () => {
    setShowDelete(false);
  };

  return (
    <div
      className={`d-flex flex-column align-items-center ${className}`}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseLeave}
    > 
      <img 
        src={img_src} 
        alt="profile avatar" 
        style={{ width: imageWidth }}
        className="rounded"
      />
      {showName && <span className={styles.bold}>{owner}</span>}
      {isOwner && <span className={styles.smallFont}>(owner)</span>}

      {(taskData?.is_owner && showDelete && isDeletable) && 
        <UserSharingPopover
          taskData={taskData}
          setTaskData={setTaskData}
          sharingUser={owner}
        >
          <i className="fa-solid fa-trash-can fa-lg position-absolute" 
          style={{ color:"red", top:"10px", left:"10px", cursor:"pointer" }}></i>
        </UserSharingPopover>
      }
    </div>
  )
}

export default ProfileAvatar;