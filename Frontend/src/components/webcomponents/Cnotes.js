import React from 'react'
import Navbar from './navbar'
import '../maincss/Allcom.css'
import { useState,useContext } from 'react'
import NoteContexts from '../../context/notes/noteContext'

export default function Cnotes() {
const contexts=useContext(NoteContexts);
const {addnote}=contexts;

const [note, setNote] = useState({title: "", description: "",tag: ""})

const handleClick = (e)=>{
  e.preventDefault();
  addnote(note.title, note.description,note.tag);
  setNote({title: "",description: "",tag: ""})
console.log(note)
}

  const handlechange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
}

  return (
    <>
    {/* <Alert message='error hallo i am line' /> */}
      <div className='alltcom'>
      <div className='comnavview'>
      <div className='nav'>
      <Navbar />
      </div>
      </div>
      <div className='cnotesview'>
      <div className='cnotesinner'>
    <div className='maincnotes' onSubmit={handleClick}>
<form className='cnotesfoam'>
  <h1 className='cnoteshader'>Create Note</h1>
  <div className='alllables'>
<label htmlFor='title'>Title</label>
<input type='text' value={note.title} id='tiile' name='title'  onChange={handlechange}/>
<label htmlFor='description'>Description</label>
<input type='text' value={note.description} id='description' name='description' onChange={handlechange} />
<label htmlFor='tag'>Tag</label>
<input type='text' value={note.tag} name='tag' id='tag' onChange={handlechange} />
</div>
<div className='btnsubcnote' >
<button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</div>
</form>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}
