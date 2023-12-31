// token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwNTg1YmQ2ZmJlZmY0NzVjMWY0MDI5In0sImlhdCI6MTY5NTU0OTU1NH0.JbJiIoyeBVFKFrU3yAaE90sZ28OegKK6mN-jMglBnH0"
import NoteContexts from './noteContext';
import { useState } from 'react';

const NoteState = ({ children }) => {

  const [rnote,setrnote]=useState([]);

const editnote =async(id,title,description,tag)=>{
const response=await fetch(`http://localhost:9000/notes/editnote/${id}`,{
method: 'PUT',
headers: {
'Content-Type': 'application/json',
  "token": localStorage.getItem("token")},
body: JSON.stringify({
  title: title,
 description: description,
 tag: tag
         }),
})

await response.json()
let newNotes = JSON.parse(JSON.stringify(rnote))
for (let index = 0; index < newNotes.length; index++) {
  const element = newNotes[index];
  if (element._id === id) {
    newNotes[index].title = title;
    newNotes[index].description = description;
    newNotes[index].tag = tag; 
    break; 
  }
}  
setrnote(newNotes)
}


const deleteNote=async(id)=>{
  const response=await fetch(`http://localhost:9000/notes/deletenote/${id}`,{
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      "token": localStorage.getItem("token")},
  });

  await response.json();
  const newnotes=rnote.filter((note)=>{return note._id !== id})
  setrnote(newnotes)
}




  const getnotes=async ()=>{
    const response=await fetch('http://localhost:9000/notes/fetchnotes',{
    method: 'GET',
    headers:{
      'Content-Type':'application/json',
      "token": localStorage.getItem('token') 
    }
  })
  const allnotes=await response.json();
  let allreversenote= (allnotes).reverse()
  setrnote(allreversenote);
  }

const [username,setusername]=useState('')
const [useremail,setuseremail]=useState('')


const addnote=async (title,description,tag)=>{
  const response=await fetch('http://localhost:9000/notes/addnote',{
    method: "POST",
    headers:{
      'Content-Type': "application/json",
      token: localStorage.getItem('token')
    },
    body: JSON.stringify({
      title: title,
      description: description,
      tag: tag
    })

  })
  const data=await response.json()
  console.log(data);
  if(data.errors){
    console.log("not added");
  }
  else if(data.user){
    alert('added')
    console.log("added");

  }
  
setrnote(rnote.concat(data))
}
const [userdetail,setuserdetail]=useState([])
  const fetchuser = async () => {
    const url = "http://localhost:9000/auth/getuser";
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        "token": localStorage.getItem('token')
      }
    });
    const userauthdata = await res.json();
    // console.log(userauthdata)
    if(userauthdata){
    const username=(userauthdata.user.name);
    const useremail=(userauthdata.user.emial);
     setusername(username);
     setuseremail(useremail);
     setuserdetail(userauthdata)
    }
  }

  return (
    <NoteContexts.Provider value={{userdetail,editnote,deleteNote,fetchuser,addnote,getnotes,rnote}}>
      {children}
    </NoteContexts.Provider>
  )
}

export default NoteState;
