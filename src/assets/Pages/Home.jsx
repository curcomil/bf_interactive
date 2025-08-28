import { Card } from "../../Components/Card";
import contein from "../../db/contein";
import duplicateAndShuffle from "../../Utils/Funtions";
import { useState, useEffect } from "react";

function Home() {
  const [onPlay, setOnPlay] = useState(0);
  const [selX, setSelX] = useState(null);
  const [selY, setSelY] = useState(null);
  const [data, setData] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    setData(duplicateAndShuffle(contein));
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

  return (
    <div className="bg-amber-950 min-h-screen text-white flex">
      <div className="basis-3/4 grid grid-cols-6 grid-rows-3 place-content-center place-items-center border">
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

export default Home;
