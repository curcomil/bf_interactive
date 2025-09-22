import { useEffect, useState, useContext } from "react";
import { AppContext } from "./Context";

function Menu() {
  const [shake, setShake] = useState(false);
  const { setContext } = useContext(AppContext);

  useEffect(() => {
    let timeout;
    const interval = setInterval(() => {
      setShake(true);
      timeout = setTimeout(() => {
        setShake(false);
      }, 2000);
    }, 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const shake_state = shake ? "simple_shake" : "";

  return (
    <div className="relative min-h-screen text-white flex flex-col items-center justify-center normal-text overflow-hidden">
      <img
        src="/patio_convento.png"
        alt="Fondo"
        className="absolute inset-0 w-full h-full object-fill -z-0 blur-sm kenburns-top"
      />
      <div className="bg-white/60 w-[45vw] h-[21vw] rounded-2xl p-2 flex flex-col items-center justify-center relative z-10 text-[#83481ee7]">
        <div className="alternative-title flex items-center flex-col w-full">
          <p className="text-[2vw]">Exposición</p>
          <div className="flex w-full items-baseline justify-center ">
            <p className="text-[3vw]">Emblemas</p>
            <span className="text-[2vw] ml-3 font-light">del</span>
          </div>
          <div className="flex text-[3vw] font-bold justify-center items-center-safe">
            <p>PODER</p>
            <span className="font-light text-[2vw] mx-3">y la</span>
            <p>FE:</p>
          </div>
          <p className="text-[2vw] font-light text-[#a2744a]">
            Entre lo personal, lo militar y lo sagrado
          </p>
        </div>

        <div className="flex text-[1.5vw] mt-6 text-white alternative-title">
          <button
            className={`p-2 w-[12vw] mr-9 rounded-xl bg-[#7b704c] ${shake_state}`}
            onClick={() => setContext("game")}
          >
            Jugar
          </button>
          <button
            className="p-2  w-[12vw] rounded-xl bg-[#e0bc86]"
            onClick={() => setContext("presentacion")}
          >
            Presentación
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
