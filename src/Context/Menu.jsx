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
    <div className="relative min-h-screen text-white flex items-center justify-center normal-text overflow-hidden">
      <img
        src="/patio_convento.png"
        alt="Fondo"
        className="absolute inset-0 w-full h-full object-fill -z-0 blur-sm kenburns-top"
      />
      <div className="bg-white/60 w-[45vw] h-[18vw] rounded-2xl p-2 flex flex-col items-center justify-center relative z-10">
        <p className="text-[3vw] title text-[#8e5f4a]">
          Emblemas del Poder y la Fé:
        </p>
        <p className="text-[2.5vw] text-[#8e5f4a]">
          Entre lo personal, lo militar y lo sagrado
        </p>

        <div className="flex text-[1.5vw] mt-6">
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
