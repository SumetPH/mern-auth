import React from "react";

export default function Home() {
  return (
    <div>
      <h3>Home</h3>
      <a href={`${process.env.REACT_APP_SERVER_HOST}/api/auth/google`}>
        Google
      </a>
    </div>
  );
}
