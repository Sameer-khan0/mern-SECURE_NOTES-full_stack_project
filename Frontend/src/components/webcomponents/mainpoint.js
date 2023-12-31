import React from 'react'
import '../maincss/mainpointcss.css'
import img from '../scloud.png'
import {Link} from 'react-router-dom'

export default function mainpoint() {
  return (
    <div className='mainpnt'>

        <div className="mainp1">
            <div className="leftmainp">
                <div className="welcome">
                    THANK YOU FOR JOINING US
                </div>
                <div className="webname">
                    <span className='snmp'>
                    Secure-notes
                    </span>
                </div>
            </div>
            <div className="rightmainp">
            <div className="m2image">
                <img src={img} alt="png" />
            </div>
            <div className="maininto">
                Welcome to S-notes(Secure-notes)
                Make a touch whith us and enjoy our free servacis
                save your notes in cloud and make a CRUD operations on them
            </div>
            <div className="mwebbtn">
             <Link to='/mainpage'><button className='mwebbtn'>Start</button></Link> 
            </div>
            </div>
        </div>
    </div>
  )
}
