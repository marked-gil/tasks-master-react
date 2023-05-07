import { useState } from 'react';
import UserSharingPopover from './UserSharingPopover';


function ProfileAvatar(props) {

  const {
    owner, 
    isOwner, 
    showName, 
    imageWidth,
    nameFontSize,
    img_src,
    taskData,
    setTaskData,
    className,
    setError
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
      {showName && <span style={{ fontWeight: "600", fontSize: nameFontSize }}>{owner}</span>}
      {isOwner && <span style={{ fontSize:"12px" }}>(owner)</span>}

      {(taskData?.is_owner && showDelete && !taskData?.is_completed) && 
        <UserSharingPopover
          taskData={taskData}
          setTaskData={setTaskData}
          sharingUser={owner}
          setError={setError}
        >
          <i className="fa-solid fa-trash-can fa-lg position-absolute" 
          style={{ color:"red", top:"10px", left:"10px", cursor:"pointer" }}></i>
        </UserSharingPopover>
      }
    </div>
  )
}

export default ProfileAvatar;