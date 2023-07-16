import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
    <Link to="/org">Login</Link>
      <h1>Home</h1>
      <p>Home page content</p>
    </div>
  );
}
