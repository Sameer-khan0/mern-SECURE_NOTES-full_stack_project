import { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./webcomponents/Alert";

export default function Register() {
  const history = useNavigate();
  const [values, setvalues] = useState({ name: "", email: "", password: "" });
  const [pass1, setpass1] = useState(false)
  const [showalert,setShowAlert]=useState(false)
  const [alertmsg,setalertmsg]=useState('')

  const handlefoam = async (e) => {
    const { name, email, password } = values;
    console.log(name)
    console.log(email)
    console.log(password)
    e.preventDefault();
    const url = "http://localhost:9000/auth/regesterd";
    const fdata = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await fdata.json();
    if (data.token) {
      console.log(data);
      localStorage.setItem("token", data.token);
      history("/mainpoint");
    } else {
      history("/");
      setShowAlert(true)
      setalertmsg("Not register")
      setTimeout(() => {
        setShowAlert(false)
          setalertmsg("Not Register")
      }, 3000);
    }
  };
  const showpassword = () => {
    let a = document.getElementById("pname");
    if (pass1) {
      a.setAttribute("type", "text");
      setpass1(false);
    } else {
      a.setAttribute("type", "password");
      setpass1(true);
    }
  };

  function handlechanges(e) {
    setvalues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <div className="main">
      <div className="main0">
        <div className="message">
          <div className="header">
            <div className="mainmessage" style={{ padding: "1px" }}>
              <span style={{ fontSize: " xxx-large" }}>Welcome to</span>
              <br /> S-notes (secure-notes)
            </div>
            <div className="downmessage">
              Please registerd and make a touch whith us and enjoy our free
              servacis
            </div>
          </div>
        </div>

        <div className="foam">
          <div className="form0">
            <div className="mainfoam">
              <h2 className="loginname">Sign-in</h2>
              <span className="loginpoint">
                Have an account?{" "}
                <Link to="/login">
                  <span>login</span>
                </Link>{" "}
              </span>
              <form onSubmit={handlefoam} className="formmain">
                <main className="inputs">
                  <div className="inputin">
                    <input
                      style={{ width: "260px" }}
                      type="text"
                      placeholder="Name"
                      onChange={handlechanges}
                      name="name"
                      id="name"
                      className="name"
                    />
                    <span className="inputemo">👨‍⚕️</span>
                  </div>
                  <br />
                  <div className="inputin">
                    <input
                      style={{ width: "260px" }}
                      type="email"
                      placeholder="Email"
                      onChange={handlechanges}
                      name="email"
                      id="ename"
                      className="ename"
                    />
                    <span className="inputemo">🔓</span>
                  </div>
                  <br />
                  <div className="inputin">
                    <input
                      style={{ width: "260px" }}
                      type="password"
                      placeholder="Password"
                      onChange={handlechanges}
                      name="password"
                      id="pname"
                      className="pname"
                    />
                    <span
                      className="inputemo"
                      id="showpass"
                      onClick={showpassword}
                    >
                      🔑
                    </span>
                  </div>
                  <br />
                </main>
                <div className="downbtn">
                  <input type="submit" value="Sign in" className="btnsubmit" />
                </div>
              </form>
              {showalert && <Alert message={alertmsg} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
