import React from "react";
import Image from "next/image";
import Profile1 from "@/assets/images/profile-1.jpg";
import Profile2 from "@/assets/images/profile-2.jpg";
import Profile3 from "@/assets/images/profile-3.jpg";
import Profile4 from "@/assets/images/profile-4.jpg";
import Plus from "@/assets/images/plus.png";

const NewUser = () => {
  return (
    <div className="new-users">
      <h2>New Users</h2>
      <div className="user-list">
        <div className="user">
          <Image src={Profile2} alt="" width="100" height="100" />
          <h2>Jack</h2>
          <p>54 Min Ago</p>
        </div>
        <div className="user">
          <Image src={Profile3} alt="" width="100" height="100" />
          <h2>Amir</h2>
          <p>3 Hours Ago</p>
        </div>
        <div className="user">
          <Image src={Profile4} alt="" width="100" height="100" />
          <h2>Ember</h2>
          <p>6 Hours Ago</p>
        </div>
        <div className="user">
          <Image src={Plus} alt="" width="100" height="100" />
          <h2>More</h2>
          <p>New User</p>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
