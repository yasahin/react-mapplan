import { useRef, useState, useEffect } from "react";
import "./App.css";
import MainContext from "./MainContext";
import Note from "./components/Note";
import NoteBox from "./components/NoteBox";
import LeaveCommentText from "./components/LeaveCommentText";

function App() {
  const screen = useRef(null);
  const [mode, setMode] = useState(false);
  const [notes, setNotes] = useState(
    (localStorage.notes && JSON.parse(localStorage.notes)) || []
  );
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [boxVisible, setBoxVisible] = useState(false);
  const [boxPosition, setBoxPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    screen.current.focus();
    document.title = "mapplan";
  }, []);

  useEffect(() => {
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleKeyUp = (e) => {
    if (!mode)
      if (e.key === "c") {
        setMode(!mode);
        setBoxVisible(false);
      }
    if (e.key === "Escape") {
      setBoxVisible(false);
    }
  };

  const handleMouseMove = (e) => {
    setPosition({
      x: [e.pageX, e.clientX],
      y: [e.pageY, e.clientY],
    });
  };

  const handleClick = (e) => {
    if (mode) {
      setBoxPosition({
        x: position.x[0],
        y: position.y[0],
      });
      setBoxVisible(true);
    }
  };

  const data = {
    position,
    boxPosition,
    setMode,
    setNotes,
    setBoxVisible,
    notes,
  };

  return (
    <MainContext.Provider value={data}>
      <div
        ref={screen}
        tabIndex={0}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onKeyUp={handleKeyUp}
        className={`screen${mode ? " editable" : ""}`}
      >
        <img
          className="image"
          style={{ opacity: "1" }}
          src="https://db4sgowjqfwig.cloudfront.net/campaigns/205699/assets/904791/MiddleearthMap01.jpg?1538255282"
          alt=""
        />

        {mode && <LeaveCommentText />}

        {notes && notes.map((note, key) => <Note key={key} {...note} />)}

        {boxVisible && <NoteBox />}
      </div>
      <div className="sticky-bar">
        <button onClick={() => setMode(!mode)} className={mode ? "active" : ""}>
          Yorum Modu <code>c</code>
        </button>
        {boxVisible && (
          <button onClick={() => setBoxVisible(false)} className="active">
            Kapat <code>Esc</code>
          </button>
        )}
      </div>
    </MainContext.Provider>
  );
}

export default App;
