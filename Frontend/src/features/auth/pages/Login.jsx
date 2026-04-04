import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router';
import '../style/auth.form.scss'
import { useAuth } from '../hooks/useAuth';



const Login = () => {

  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null);
  const { login, loading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(identifier, password);
    } catch (err) {
      setError(err); // show backend message
    }
    navigate("/")
  }



  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="email">Username or Email</label>
            <input
              onChange={(e) => { setIdentifier(e.target.value) }}
              type="identifier" id='identifier' name='identifier' placeholder='Username or Email' />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => { setPassword(e.target.value) }}

              type="password" id='password' name='password' placeholder='Enter password' />
          </div>

          <button
            className="button primary-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>

        <p>Don't have an account ?<Link to='/register'> Register</Link></p>
        {/* <p>Don't have an account ? <a href="/register">Register</a></p> */}
        <p><Link href="/forgot-password">Forgot password ?</Link></p>
      </div>

    </main>
  )
}

export default Login
