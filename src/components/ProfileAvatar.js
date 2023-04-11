import React from 'react';
import Avatar from '../assets/profile-avatar.jpg';
import styles from '../styles/ProfileAvatar.module.css';

function ProfileAvatar({ owner, isOwner, showName, imageWidth, className }) {
  return (
    <div 
      className={`d-flex flex-column align-items-center ${className}`}
    >
      <img src={Avatar} alt="profile avatar" style={{ width: imageWidth }}/>
      {showName && <span className={styles.bold}>{owner}</span>}
      {isOwner && <span className={styles.smallFont}>(owner)</span>}
    </div>
  )
}

export default ProfileAvatar