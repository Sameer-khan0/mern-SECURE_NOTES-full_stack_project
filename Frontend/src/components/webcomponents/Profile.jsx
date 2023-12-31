import React, { useEffect, useState } from 'react';
import avatar from '../webpics/user.jpg';
import NoteContexts from '../../context/notes/noteContext';
import { useContext } from 'react';
import '../maincss/profile.css';

export default function Profile() {
  const [uname, setuserd] = useState();
  const [uemail, setuemail] = useState();
  const [udp, setudp] = useState({ myfile: '' });
  const [upic, setupic] = useState({ myfile: '' });

  const user = useContext(NoteContexts);
  const { fetchuser, userdetail } = user;

  useEffect(() => {
    fetchuser();
  }, []);

  useEffect(() => {
    if (userdetail.user) {
      const username = userdetail.user.name;
      const useremail = userdetail.user.email;
      const dp = userdetail.profile_img.myfile;
      setuserd(username);
      setuemail(useremail);
      setudp({ myfile: dp });
    }
  }, [userdetail]);

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setupic({ myfile: base64 });
  }

  const handelsubmitclick = async () => {
    try {
      const url = `http://localhost:9000/auth/dp/update/${userdetail.profile_img._id}`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userdetail.user._id,
          myfile: upic.myfile,
        }),
      });
      const data = await res.json();
      console.log(data)
      setupic({ myfile: '' });
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <div className="Profile_box">
        <div className="profile">
          <div className="dp">
            <label htmlFor="img_uploader" style={{ width: '100%', height: '100%' }}>
              <img src={udp.myfile ? udp.myfile : avatar} alt="profile_pic" />
            </label>
            <input type="file" name="img_uploader" id="img_uploader" onChange={handleFileUpload} style={{ display: 'none' }} />
            {upic.myfile ? <button className="DP_submit" onClick={handelsubmitclick}>Change DP</button> : ''}
          </div>
          <div className="name">
            <span className="label">Name</span>: {uname ? uname : 'Null'}
          </div>
          <div className="email">
            <span className="label">Email</span>: {uemail ? uemail : 'Null'}
          </div>
        </div>
      </div>
    </>
  );
}

function convertToBase64(file) {
  return new Promise((res, rej) => {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      res(e.target.result);
    };
    fileReader.onerror = (err) => {
      rej('Error', err);
    };
  });
}
