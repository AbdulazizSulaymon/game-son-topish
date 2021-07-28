import { useState } from 'react';
import './App.css';

function App() {
  const [chance, setChance] = useState(10);
  const [value, setValue] = useState("");
  const [number, setNumber] = useState(Math.floor(Math.random() * 100));
  const [isWin, setIsWin] = useState(false);
  const [isLoose, setIsLoose] = useState(false);
  const [status, setStatus] = useState(0)

  const player = document.getElementById("player");

  const answer = () => {
    if (value == "") return;

    if (chance > 1) {
      if (value == number) {
        setIsWin(true)
        setStatus(0);
        player.src = "audio/win.mp3";
        player.play();
      }
      else if (value > number) setStatus(2);
      else setStatus(1);
    }
    else {
      setIsLoose(true)
      player.src = "audio/over.mp3";
      player.play();
    }

    setChance(chance - 1);
  }

  const typing = (e) => {
    const v = e.target.value;

    const lastChar = v[v.length - 1];
    if ((lastChar >= 0 && lastChar <= 9 || v.length == 0) && v.length <= 2) setValue(e.target.value)
  }

  return (
    <div className="App">
      <div
        className="
        container
        py-5
        text-center
        d-flex
        flex-column
        justify-content-center
      "
      >
        <h1 className="text-white display-3 mb-5 fw-bold title">
          <span id="count">{chance}</span> ta imkoniyatingiz bor
        </h1>
        <p className={`mt-5 text-primary fs-3 ${status == 0 && "invisible" || ""}`} id="statusp">
          Siz kiritgan son <span id="status">{status == 1 && "kichik" || "katta"}</span>
        </p>
        <div className="mt-5">
          <input
            type="text"
            id="number"
            placeholder="Kompyuter o'ylagan sonni toping"
            value={value}
            onChange={typing}
          />
          <br />
          <button className="mt-5 btn-blue" onClick={answer}>Topdim</button>
        </div>
      </div>

      {
        (isWin || isLoose) && <div id="modal" >
          {isWin && <div id="success" className="p-4 modal-panel ">
            <img src="img/happy.png" className="icon" alt="" />
            <p className="fw-bold text-white fs-3">
              Tabriklaymiz. O’yin g’olibi bo’ldingiz!
              <button className="btn text-white fs-2" onclick="reload()">
                {/* <FontAwesomeIcon icon={faRedo} /> */}
              </button>
            </p>
          </div>}
          {isLoose && <div id="error" className="p-4 modal-panel ">
            <img src="img/sad.png" className="icon" alt="" />
            <p className="fw-bold text-white fs-3">
              Biz sizni g’olib bo’lishingizni xohlagandik. Lekin yutqazdingiz!
              <button className="btn text-white fs-2" onclick="reload()">
                <i className="fas fa-redo-alt"></i>
              </button>
            </p>
          </div>}
        </div>
      }

      <audio src={""} id="player"></audio>
    </div>
  );
}

export default App;
