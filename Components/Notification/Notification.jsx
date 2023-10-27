import React from "react";

// INTERNAL IMPORT
import Style from "./Notification.module.css"

const Notification = ({ setNotification, notification }) => {
  return (
    <div onClick={() => setNotification("")} className={Style.alert}>
      {notification}
      <span>&times;</span>
    </div>
  );
};

export default Notification;
