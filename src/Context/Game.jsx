import { Card } from "../Components/Card";
import contein from "../db/contein";
import duplicateAndShuffle from "../Utils/Funtions";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AppContext } from "./Context";

function Game() {
  const [onPlay, setOnPlay] = useState(0);
  const [selX, setSelX] = useState(null);
  const [selY, setSelY] = useState(null);
  const [data, setData] = useState([]);
  const [matched, setMatched] = useState([]);
  const { setContext } = useContext(AppContext);

  const restartGame = () => {
    setOnPlay(0);
    setSelX(null);
    setSelY(null);
    setMatched([]);
    setData(duplicateAndShuffle([...contein]));
  };

  useEffect(() => {
    restartGame();
  }, []);

  useEffect(() => {
    if (onPlay === 2 && selX && selY) {
      const sameCard = selX.uid === selY.uid;
      const match = selX.id === selY.id && !sameCard;

      if (match) {
        console.log("Las cartas coinciden");
        setMatched((prev) => [...prev, selX.id]);
      }
      if (!match) console.log("Las cartas no coinciden");

      setTimeout(() => {
        setSelX(null);
        setSelY(null);
        setOnPlay(0);
      }, 400);
    }
  }, [onPlay, selX, selY]);

  useEffect(() => {
    if (matched.length === 9) {
      Swal.fire({
        title: "¡Felicidades!",
        timerProgressBar: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        icon: "success",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Volver a jugar",
        denyButtonText: `Menú`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          restartGame();
        } else if (result.isDenied) {
          setContext("menu");
        }
      });
    }
  }, [matched]);

  return (
    <div className="min-h-screen text-white flex">
      <div className="basis-3/4 grid grid-cols-6 grid-rows-3 place-content-center place-items-center border p-3">
        {data.map((card) => (
          <Card
            key={card.uid}
            id={card.id}
            uid={card.uid}
            onPlay={onPlay}
            setOnPlay={setOnPlay}
            selX={selX}
            setSelX={setSelX}
            selY={selY}
            setSelY={setSelY}
            title={card.name}
            matched={matched}
            src={card.src}
          />
        ))}
      </div>
      <div className="flex basis-1/4 flex-col border">
        <p>En juego: {onPlay}</p>
        <p>Card X: {selX?.id ?? "Not yet"}</p>
        <p>Card Y: {selY?.id ?? "Not yet"}</p>
        {matched.length > 0 &&
          matched.map((id) => <p key={id}>Matched: {id}</p>)}
      </div>
    </div>
  );
}

export default Game;
