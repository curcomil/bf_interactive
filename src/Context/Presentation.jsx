import contein from "../db/contein";
import { useState } from "react";

function Presentacion() {
  const [number, setNumber] = useState(0);

  function setIndex(action) {
    if (action === "increase") {
      setNumber((prev) => (prev + 1) % contein.length);
    } else if (action === "decrease") {
      setNumber((prev) => (prev - 1 + contein.length) % contein.length);
    }
  }

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

      <div className="border-2 flex flex-col items-center justify-center">
        <p className="title text-[5vw]">{selection.name}</p>
        <div className="p-3 bg-amber-200 max-w-[25vw]">
          <p>
            {selection.description ??
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit."}
          </p>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => setIndex("decrease")}
          >
            ⬅ Izquierda
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => setIndex("increase")}
          >
            Derecha ➡
          </button>
        </div>
      </div>
    </div>
  );
}

export default Presentacion;
