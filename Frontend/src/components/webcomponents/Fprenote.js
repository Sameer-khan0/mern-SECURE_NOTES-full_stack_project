import React from 'react'
import '../maincss/notepreview.css'

export default function Fprenote(props) {
const handleClick=()=>{
  props.show(false);
}
  return (
    <div className='mainpre'>
    <div className='Fprenote'>
      <div className='toolsofnote' onClick={handleClick}>
          <div className='croscn'>
      <i className="fa-solid fa-xmark" id='cross'></i>
      </div></div>
      <div className='mainnotespre'>
       <div className='patatitle' ><h2>{props.title}</h2></div>
       <div className='patadec' ><p>{props.description}</p></div>
       <div className='patateg' ><h3>Tag: {props.tag}</h3></div>
       </div>
       </div>
        </div>
  )
}
