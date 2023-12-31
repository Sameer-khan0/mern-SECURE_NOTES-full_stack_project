import React from 'react'
import Register from './components/register'
import Login from './components/login'
import Mainpoint from './components/webcomponents/mainpoint'
import Mainpage from './components/webcomponents/mainpage'
import About from './components/webcomponents/About'
import { BrowserRouter as Router ,Route ,Routes } from 'react-router-dom'
import Cnotes from './components/webcomponents/Cnotes'
import Anotes from './components/webcomponents/Anotes'
import NoteState from './context/notes/Notestate'
import Profile from './components/webcomponents/Profile'

function App() {
  return (
    <>
    <NoteState>
    <Router>
<Routes>
 <Route path='/' element={ <Register /> } />   
 <Route path='/login' element={ <Login /> } />   
 <Route path='/mainpoint' element={ <Mainpoint /> } />   
 <Route path='/mainpage' element={ <Mainpage /> } />   
 <Route path='/about' element={<About/>}/>
 <Route path='/createnotes' element={<Cnotes/>}/>
 <Route path='/allnotes' element={<Anotes/>}/>
 <Route path='/profile' element={<Profile/>}/>
</Routes>
    </Router>
    </NoteState>
    </>
  )
}

export default App;