import React from 'react'
import { Link } from 'react-router-dom'
import '../maincss/mainpage.css'
export default function Mainview() {


  return (
    <div>
      <div className="mainpagecomps">
      <div className='mainnavcom'>
        <div className='mnvcom'>
          <div className="span1">
           Secure-notes 
          </div>
          <div className="span2">
          <Link to='/mainpage' className='mnavcoms'>Home</Link>
          <Link to='/help' className='mnavcoms'>Help</Link>
          <Link to='/profile' className='mnavcoms'>Profile</Link>
          </div>
        </div>
      </div>
      <div className="maincontents">
        <div className="maincontent">
     <h3 className="mainwebh">Secure-Notes: Capturing Thoughts, Anytime, Anywhere</h3>
      <div className='ccnotesmn'>
    <div className='insidemain'>
      <div className='main002'>
        <div className='btnamin'>
<Link to='/createnotes'><button className='btnmv0'>Add note</button></Link>
<Link to='/allnotes'><button className='btnmv0'>View notes</button></Link>
</div>
      </div>
    </div>
     </div>
     </div>
      </div>
    </div>
    </div>
  )
}
