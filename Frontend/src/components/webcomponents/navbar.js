import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NoteContexts from '../../context/notes/noteContext';
import '../maincss/navbar.css';
import avatar from '../webpics/user.jpg';

export default function Navbar() {
  const [uname, setuserd] = useState();
  const [udp, setudp] = useState({ myfile: '' });
  const history = useNavigate();
  const user = useContext(NoteContexts);
  const { fetchuser, userdetail } = user;

  useEffect(() => {
    fetchuser();
  }, []);

  useEffect(() => {
    if (userdetail.user) {
      const { name } = userdetail.user;
      const { myfile } = userdetail.profile_img;
      setuserd(name);
      setudp({ myfile });
    }
  }, [userdetail]);

  const location = useLocation();
  const pathlocation = location.pathname;

  const getLinkStyles = (path, property) => {
    return {
      fontWeight: pathlocation === path ? 'bolder' : 'small',
      background: pathlocation === path ? 'rgb(32, 159, 250)' : 'white',
      color: pathlocation === path ? 'white' : 'black',
      boxShadow: pathlocation === path ? '0px 0px 5px rgb(32, 159, 250)' : '0px 0px 1px rgb(95, 94, 94)',
      ...property,
    };
  };

  return (
    <div className="navbar">
      <div className="mainnavbar">
        <div className="navprofile">
          <div className="imgbox">
            <Link to="/profile">
              <img className="proimage" src={udp.myfile ? udp.myfile : avatar} alt="png" />
            </Link>
          </div>
          <div className="profiledetali">{uname}</div>
        </div>
        <div className="comname">
          <div className="navul">
            <Link to="/mainpage" className="spannav" style={getLinkStyles('/mainpage')}>
              Home
            </Link>
            <Link to="/about" className="spannav" style={getLinkStyles('/about')}>
              About
            </Link>
            <Link to="/allnotes" className="spannav" style={getLinkStyles('/allnotes')}>
              All-Notes
            </Link>
            <Link to="/createnotes" className="spannav" style={getLinkStyles('/createnotes')}>
              Create-Notes
            </Link>
          </div>
        </div>
        <div className="logout">
          <div className="logoutmain" onClick={() => history('/')}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}
