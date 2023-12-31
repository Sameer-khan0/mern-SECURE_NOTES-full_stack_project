import React, { useEffect, useState, useContext, useRef } from "react";
import Navbar from "./navbar";
import "../maincss/Allcom.css";
import NoteContexts from "../../context/notes/noteContext";
import Notes from "./Notes";
import '../maincss/noteslayout.css'
import { Link } from "react-router-dom";

export default function Anotes() {
  const [NOTES, setallnotes] = useState([]);

  const notes = useContext(NoteContexts);
  const { getnotes, rnote ,editnote} = notes;

  useEffect(() => {
    getnotes();
  }, []);

  useEffect(() => {
    setallnotes(rnote);
  }, [rnote]);

  const ref = useRef(null);
const closeref=useRef(null)

  const [enote, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" });

  const handlechange = (e) => {
    setNote({...enote, [e.target.name]: e.target.value})
  };

  const handleclick=()=>{
    editnote(enote.id,enote.etitle,enote.edescription,enote.etag)
    console.log(enote)
    closeref.current.click();
  }
  
  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
  };

  return (
    <>
      <div className="alltcom">
        <div className="comnavview">
          <div className="nav">
            <Navbar />
          </div>
        </div>
        <div className="mainanotes">
          <div className="innercom">
            <div className="notpre">
              <h2>Your Notes</h2>
            </div>
            <div className="notlayout">
              <div className="allnotes">
                <button
                  ref={ref}
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  style={{ display: "none" }}
                >
                  modal
                </button>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                  style={{ flexDirection: "column" }}
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Update note
                        </h5>
                        <form className="cnotesfoam">
                          <div className="alllables1">
                            <label htmlFor="title">Title</label>
                            <input
                              type="text"
                              value={enote.etitle}
                              id="etiile"
                              name="etitle"
                              onChange={handlechange}
                              minLength={3}
                              maxLength={10}
                            />
                            <label htmlFor="description">Description</label>
                            <input
                              type="text"
                              value={enote.edescription}
                              id="edescription"
                              name="edescription"
                              onChange={handlechange}
                            />
                            <label htmlFor="tag">Tag</label>
                            <input
                              type="text"
                              value={enote.etag}
                              name="etag"
                              id="etag"
                              minLength={3}
                              maxLength={5}
                              onChange={handlechange}
                            />
                          </div>
                          <div className="btnsubcnote"></div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                          ref={closeref}
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={()=>{handleclick()}}>
                          Update note
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {NOTES.length <= 0 ? (
                  <div className="add-box">
                  <div className="box">
                  <Link to='/createnotes'><div className="plus">+</div></Link>
                  </div>
              </div>
                ) : (
                  NOTES.map((note) => (
                    <Notes
                      key={note._id}
                      note={note}
                      updatenote={() => {updatenote(note)}}/>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
