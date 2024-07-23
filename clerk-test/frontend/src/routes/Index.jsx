import { Link } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';

function IndexPage() {
  const call = async () => {
    console.log('calling')
    const resp = await axios.get("http://localhost:3000/protected-path");
    console.log(resp);
  }
  useEffect(() => {
    call();
  }, []) 

  return (
    <div>
      <h1>This is the index page</h1>
      <div>
        <ul>
          <li><Link to="/sign-up">Sign Up</Link></li>
          <li><Link to="/sign-in">Sign In</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default IndexPage;
