import React from "react";

const Reminder = () => {
  return (
    <div className="reminders">
      <div className="header">
        <h2>Reminders</h2>
        <span className="material-icons-sharp"> notifications_none </span>
      </div>

      <div className="notification">
        <div className="icon">
          <span className="material-icons-sharp"> volume_up </span>
        </div>
        <div className="content">
          <div className="info">
            <h3>Workshop</h3>
            <small className="text_muted"> 08:00 AM - 12:00 PM </small>
          </div>
          <span className="material-icons-sharp"> more_vert </span>
        </div>
      </div>

      <div className="notification deactive">
        <div className="icon">
          <span className="material-icons-sharp"> edit </span>
        </div>
        <div className="content">
          <div className="info">
            <h3>Workshop</h3>
            <small className="text_muted"> 08:00 AM - 12:00 PM </small>
          </div>
          <span className="material-icons-sharp"> more_vert </span>
        </div>
      </div>

      <div className="notification add-reminder">
        <div>
          <span className="material-icons-sharp"> add </span>
          <h3>Add Reminder</h3>
        </div>
      </div>
    </div>
  );
};

export default Reminder;
