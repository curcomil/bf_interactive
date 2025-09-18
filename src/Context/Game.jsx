import { Card } from "../Components/Card";
import contein from "../db/contein";
import duplicateAndShuffle from "../Utils/Funtions";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AppContext } from "./Context";
import { p } from "framer-motion/client";

function Game() {
  const [onPlay, setOnPlay] = useState(0);
  const [selX, setSelX] = useState(null);
  const [selY, setSelY] = useState(null);
  const [data, setData] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameKey, setGameKey] = useState(0);
  const [timer, setTimer] = useState(90); // 1.5 minutos en segundos
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const { setContext } = useContext(AppContext);

  const restartGame = () => {
    console.log("🔄 Reiniciando juego...");
    setOnPlay(0);
    setSelX(null);
    setSelY(null);
    setMatched([]);
    setTimer(90); // Resetear timer
    setGameStarted(false);
    setGameEnded(false);
    setLastActivity(Date.now());

    // Generar nuevos datos
    const newData = duplicateAndShuffle([...contein]);
    console.log(
      "🎯 Nuevas cartas generadas:",
      newData.map((card) => `${card.id}-${card.uid}`)
    );

    setData(newData);
    setGameKey((prev) => prev + 1);
  };

  // Formatear tiempo en MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    restartGame();
  }, []);

  // Efecto para manejar la inactividad del usuario
  useEffect(() => {
    const handleUserActivity = () => {
      setLastActivity(Date.now());
    };

    // Eventos que consideramos como actividad del usuario
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    // Agregar listeners
    events.forEach((event) => {
      document.addEventListener(event, handleUserActivity, true);
    });

    // Cleanup
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleUserActivity, true);
      });
    };
  }, []);

  // Efecto para verificar inactividad cada segundo
  useEffect(() => {
    const inactivityCheck = setInterval(() => {
      const now = Date.now();
      const inactiveTime = now - lastActivity;
      const twoMinutesInMs = 2 * 60 * 1000; // 2 minutos en millisegundos

      if (inactiveTime >= twoMinutesInMs && !gameEnded) {
        console.log("⚠️ Usuario inactivo por 2 minutos, regresando al menú...");
        clearInterval(inactivityCheck);

        Swal.fire({
          title: "Inactividad detectada",
          text: "Has estado inactivo por 2 minutos. Regresando al menú principal.",
          icon: "info",
          timer: 3000,
          timerProgressBar: true,
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
        }).then(() => {
          setContext("menu");
        });
      }
    }, 1000);

    return () => clearInterval(inactivityCheck);
  }, [lastActivity, gameEnded, setContext]);

  // Efecto para el temporizador
  useEffect(() => {
    let intervalId;

    if (gameStarted && !gameEnded && timer > 0 && matched.length < 9) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            // Tiempo agotado
            setGameEnded(true);
            Swal.fire({
              title: "¡Lástima!",
              text: "Se acabó el tiempo. ¿Quieres intentarlo de nuevo?",
              icon: "error",
              allowEscapeKey: false,
              allowOutsideClick: false,
              showDenyButton: true,
              showCancelButton: false,
              confirmButtonText: "Nuevo juego",
              denyButtonText: "Menú",
            }).then((result) => {
              if (result.isConfirmed) {
                restartGame();
              } else if (result.isDenied) {
                setContext("menu");
              }
            });
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [gameStarted, gameEnded, timer, matched.length, setContext]);

  useEffect(() => {
    if (onPlay === 2 && selX && selY && !gameEnded) {
      // Registrar actividad cuando el usuario juega
      setLastActivity(Date.now());

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
  }, [onPlay, selX, selY, gameEnded]);

  useEffect(() => {
    if (matched.length === 9 && !gameEnded) {
      setGameEnded(true);
      Swal.fire({
        title: "¡Felicidades!",
        text: `¡Completaste el juego en ${formatTime(90 - timer)}!`,
        timerProgressBar: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        icon: "success",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Volver a jugar",
        denyButtonText: `Menú`,
      }).then((result) => {
        if (result.isConfirmed) {
          restartGame();
        } else if (result.isDenied) {
          setContext("menu");
        }
      });
    }
  }, [matched, gameEnded, timer, setContext]);

  useEffect(() => {
    if (data.length > 0) {
      Swal.fire({
        title: "Memorama",
        text: "¡Encuentra todos los pares antes de que se acabe el tiempo!",
        timer: 5000,
        timerProgressBar: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
      }).then(() => {
        // Iniciar el temporizador después de cerrar el SweetAlert
        setGameStarted(true);
      });
    }
  }, [data]);

  return (
    <div className="min-h-screen text-white flex normal-text">
      <div
        key={gameKey}
        className="basis-3/4 grid grid-cols-6 grid-rows-3 place-content-center place-items-center p-3"
      >
        {data.map((card) => (
          <Card
            key={`${gameKey}-${card.uid}`}
            id={card.id}
            uid={card.uid}
            onPlay={gameEnded ? -1 : onPlay} // Bloquear cartas cuando termina el juego
            setOnPlay={setOnPlay}
            selX={selX}
            setSelX={setSelX}
            selY={selY}
            setSelY={setSelY}
            title={card.name}
            matched={matched}
            src={card.src_juego}
          />
        ))}
      </div>
      <div className="flex basis-1/4 flex-col p-4">
        <div className="bg-white/40 h-full rounded-2xl p-4 aside-container flex flex-col">
          {/* Temporizador destacado - Altura fija compacta */}
          <div className="bg-gradient-to-r from-red-400 to-orange-400 p-3 rounded-lg text-center flex-shrink-0">
            <h3 className="text-base font-bold mb-1">⏱️ Tiempo</h3>
            <div
              className={`text-2xl font-mono font-bold ${
                timer <= 30 ? "text-yellow-100 animate-pulse" : "text-white"
              }`}
            >
              {formatTime(timer)}
            </div>
            <div className="w-full bg-black bg-opacity-30 rounded-full h-1.5 mt-2">
              <div
                className={`h-1.5 rounded-full transition-all duration-1000 ${
                  timer <= 30 ? "bg-yellow-400" : "bg-green-400"
                }`}
                style={{ width: `${(timer / 90) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Información del juego - Altura fija compacta */}
          <div className="text-black/80 mt-3 text-xl flex-shrink-0">
            <p>Pares: {matched.length}/9</p>
          </div>

          {/* Contenedor de cartas matcheadas - Toma el espacio restante */}
          <div className="match-container flex-1 flex flex-col mt-4">
            <h4 className="font-bold mb-3 text-black/80 text-lg flex-shrink-0">
              ✅ Pares Encontrados:
            </h4>

            {/* Grid 3x3 para mostrar los iconos de las cartas matcheadas */}
            <div className="flex-1 bg-green-900/20 rounded-lg p-3 flex items-center justify-center">
              <div className="grid grid-cols-3 grid-rows-3 gap-3 w-full h-full">
                {matched.map((item) => {
                  const card = contein.find((c) => c.id === item);
                  return (
                    <div
                      key={item}
                      className="bg-white/30 rounded-lg flex items-center justify-center p-1 aspect-square w-full"
                    >
                      <img
                        src={card?.src_solo}
                        alt={card?.name}
                        className="object-contain"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Botones - Altura fija en la parte inferior */}
          <div className="flex w-full gap-3 justify-center text-lg mt-4 flex-shrink-0">
            <button
              className="p-2 px-4 rounded-xl bg-[#7b704c] hover:bg-[#6b5f3c] transition-colors"
              onClick={() => setContext("presentacion")}
            >
              Presentación
            </button>
            <button
              className="p-2 px-4 rounded-xl bg-[#c6a778] hover:bg-[#b8956a] transition-colors"
              onClick={() => setContext("menu")}
            >
              Menú
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
