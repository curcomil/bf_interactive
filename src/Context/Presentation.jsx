import contein from "../db/contein";
import { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "./Context";

function Presentacion() {
  const [number, setNumber] = useState(0);
  const { setContext } = useContext(AppContext);
  const timerRef = useRef(null);

  function resetTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIndex("increase");
    }, 45000);
  }

  function setIndex(action) {
    if (action === "increase") {
      setNumber((prev) => (prev + 1) % contein.length);
    } else if (action === "decrease") {
      setNumber((prev) => (prev - 1 + contein.length) % contein.length);
    }
    resetTimer();
  }

  useEffect(() => {
    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const selection = contein[number];

  return (
    <div className="min-h-screen grid grid-cols-2 items-center justify-center p-10 normal-text">
      <div className=" w-[39vw] h-[40vw]">
        <img
          src={selection.src_papel}
          alt=""
          className="w-full h-full object-fill"
        />
      </div>

      <div className="flex flex-col items-center justify-between h-full">
        <p className="title text-[4vw] text-center">{selection.name}</p>
        <div className="p-10 mt-3 bg-gray-300 rounded-xl w-full text-3xl text-black/80">
          <p className="text-justify">
            {selection.description ??
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit."}
          </p>
        </div>
        <div className="w-full">
          <div className="flex mt-6 justify-center">
            <button
              className="px-4 py-2 mr-10 aspect-square w-[8vw] bg-gray-300 rounded"
              onClick={() => setIndex("decrease")}
            >
              <img src="/left-arrow.png" alt="" className="opacity-80" />
            </button>
            <button
              className="px-4 py-2 aspect-square w-[8vw] bg-gray-300 rounded"
              onClick={() => setIndex("increase")}
            >
              <img src="/right-arrow.png" alt="" className="opacity-80" />
            </button>
          </div>
          <div className="flex flex-col w-full items-end mt-15 text-4xl gap-8">
            <button
              onClick={() => setContext("game")}
              className="bg-gray-300 w-1/4 h-[3vw] rounded-bl-full rounded-tl-full text-black/80 p-3 title"
            >
              Jugar
            </button>
            <button
              onClick={() => setContext("menu")}
              className="bg-gray-300 w-1/4 h-[3vw] rounded-bl-full rounded-tl-full text-black/80 p-3 title"
            >
              Menú
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Presentacion;
