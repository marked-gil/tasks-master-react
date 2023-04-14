import React, { useState } from 'react';
import Avatar from '../assets/profile-avatar.jpg';
import styles from '../styles/ProfileAvatar.module.css';
import UserSharingPopover from './UserSharingPopover';

function ProfileAvatar(props) {

  const {
    owner, 
    isOwner, 
    showName, 
    imageWidth, 
    image,
    isDeletable,
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
      {(showDelete && isDeletable) && 
        <UserSharingPopover>
          <i className="fa-solid fa-trash-can fa-lg position-absolute" 
          style={{ color:"red", top:"10px", left:"10px", cursor:"pointer" }}></i>
        </UserSharingPopover>
      }
      <img src={image ? image : Avatar} alt="profile avatar" style={{ width: imageWidth }}/>
      {showName && <span className={styles.bold}>{owner}</span>}
      {isOwner && <span className={styles.smallFont}>(owner)</span>}
    </div>
  )
}

export default ProfileAvatar