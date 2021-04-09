import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/user`).then((res) => {
      console.log(res.data);
      setUser(res.data.user);
    });
  }, []);
  return (
    <div>
      <h3>Profile</h3>
      <p>{user.name}</p>
      {user && (
        <a href={`${process.env.REACT_APP_SERVER_HOST}/api/auth/logout`}>
          Logout
        </a>
      )}
    </div>
  );
}
