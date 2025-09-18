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
  const [gameKey, setGameKey] = useState(0);
  const [timer, setTimer] = useState(90); // 2 minutos en segundos
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const { setContext } = useContext(AppContext);

  const restartGame = () => {
    console.log("🔄 Reiniciando juego...");
    setOnPlay(0);
    setSelX(null);
    setSelY(null);
    setMatched([]);
    setTimer(90); // Resetear timer a 2 minutos
    setGameStarted(false);
    setGameEnded(false);

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
        text: `¡Completaste el juego en ${formatTime(120 - timer)}!`,
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
    <div className="min-h-screen text-white flex">
      <div
        key={gameKey}
        className="basis-3/4 grid grid-cols-6 grid-rows-3 place-content-center place-items-center border p-3"
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
            src={card.src}
          />
        ))}
      </div>
      <div className="flex basis-1/4 flex-col border p-4 space-y-4">
        {/* Temporizador destacado */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4 rounded-lg text-center">
          <h3 className="text-lg font-bold mb-2">⏱️ Tiempo Restante</h3>
          <div
            className={`text-3xl font-mono font-bold ${
              timer <= 30 ? "text-yellow-300 animate-pulse" : "text-white"
            }`}
          >
            {formatTime(timer)}
          </div>
          <div className="w-full bg-black bg-opacity-30 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${
                timer <= 30 ? "bg-yellow-400" : "bg-green-400"
              }`}
              style={{ width: `${(timer / 90) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Información del juego */}
        <div className="bg-blue-900 bg-opacity-50 p-3 rounded-lg">
          <h4 className="font-bold mb-2">📊 Estado del Juego</h4>
          <p>Juego #{gameKey}</p>
          <p>Pares encontrados: {matched.length}/9</p>
          <p>
            Estado:{" "}
            {gameEnded
              ? "Terminado"
              : gameStarted
              ? "En curso"
              : "Iniciando..."}
          </p>
        </div>

        {/* Información de debug */}
        <div className="bg-gray-800 bg-opacity-50 p-3 rounded-lg text-sm">
          <h4 className="font-bold mb-2">🔧 Debug</h4>
          <p>En juego: {onPlay}</p>
          <p>Card X: {selX?.id ?? "Not yet"}</p>
          <p>Card Y: {selY?.id ?? "Not yet"}</p>
          <p>Total cartas: {data.length}</p>
        </div>

        {/* Lista de cartas encontradas */}
        {matched.length > 0 && (
          <div className="bg-green-900 bg-opacity-50 p-3 rounded-lg">
            <h4 className="font-bold mb-2">✅ Pares Encontrados</h4>
            <div className="grid grid-cols-3 gap-1">
              {matched.map((id) => (
                <div
                  key={id}
                  className="bg-green-700 text-xs p-1 rounded text-center"
                >
                  {id}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
