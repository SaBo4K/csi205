import { useRef } from "react";
import Form from "react-bootstrap/Form";
import { verifyUser } from "../../data/user";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Login.css";

function Login({ setToken, setRole }) {
    const userRef = useRef()
    const passRef = useRef()

  return (
    <div className="login-background">
      <div className="login-container">
        {/* Login Form */}
        <div className="login-form">
          <Form.Label htmlFor="username" className="login-label">USERNAME</Form.Label>
          <Form.Control
            type="text"
            id="username"
            placeholder="user"
            className="login-input"
            ref={userRef}
          />
          
          <Form.Label htmlFor="password" className="login-label">PASSWORD</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="pass"
            className="login-input"
            ref={passRef}
          />
          
          {/* Login Button */}
          <button 
            className="login-button"
            onClick={() => {
              const user = userRef.current.value.trim()
              const pass = passRef.current.value.trim()
              userRef.current.value = ''
              passRef.current.value = ''
              const userInfo = verifyUser({ user, pass })
              if (userInfo === null) {
                  alert('Wrong username or password')
                  userRef.current.focus()
              } else {
                  setToken(userInfo.token)
                  setRole(userInfo.role)
              }
            }}
          >
            LOG IN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
