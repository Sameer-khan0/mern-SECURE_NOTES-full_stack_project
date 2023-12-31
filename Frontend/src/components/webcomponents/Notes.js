import React, { useState } from "react";
import '../maincss/noteslayout.css'
import Fprenote from "./Fprenote";
import noteimg from '../webpics/notes.png'
import { useContext } from "react";
import NoteContexts from "../../context/notes/noteContext";

function Notes(props) {
  const contxt=useContext(NoteContexts)
  const {deleteNote}=contxt
  const { title, description, tag ,_id} = props.note;
  const [showFprenote, setShowFprenote] = useState(false);

  const handledelet=()=>{
    const confrm=window.confirm('Do you want to delete this')
    if (confrm){
      deleteNote(_id)
    }
  }
  const handleclick = () => {
    console.log('clicked');
    setShowFprenote(true);
  };

  return (
    <div className="noteslayout">
      <div className="not" >
      <div className='adde2'>
        <i className="fa-solid fa-trash" id="deleticon" onClick={()=>handledelet()}></i>
        <i className="fa-solid fa-pen-nib" id="editicon" onClick={()=>{props.updatenote()}}></i>
        </div>
      <img src={noteimg} type='png'  onClick={handleclick} className="noteimg"/>
      </div>
          <p>{title.length<10?title:title.slice(0,10)}..</p>
      {showFprenote && <Fprenote title={title} description={description} tag={tag} show={setShowFprenote} key={_id} />}
    </div>
  );
}

export default Notes;
