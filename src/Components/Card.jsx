import { useState, useEffect, useRef } from "react";

export const Card = ({
  title,
  id,
  uid,
  onPlay,
  setOnPlay,
  selX,
  setSelX,
  selY,
  setSelY,
  matched,
  src,
}) => {
  const [status, setStatus] = useState("closed"); // "closed" | "flipped" | "reversed" | "matched" | "shake"
  const [removed, setRemoved] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false); // Bloquear interacciones durante animaciones
  const animationTimeoutRef = useRef(null);
  const reverseTimeoutRef = useRef(null);

  const handleClick = () => {
    // Bloquear si está en animación o si el juego no permite más clics
    if (isBlocked || onPlay >= 2) return;
    if (onPlay === 1 && selX?.uid === uid) return;
    if (status === "matched") return;

    onPlay === 0 ? setSelX({ id, uid }) : setSelY({ id, uid });
    setOnPlay((c) => c + 1);
    setStatus("flipped");
  };

  // Limpiar timeouts al desmontar
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current)
        clearTimeout(animationTimeoutRef.current);
      if (reverseTimeoutRef.current) clearTimeout(reverseTimeoutRef.current);
    };
  }, []);

  // Cuando entra en matched, correr animación y luego ocultar manteniendo espacio
  useEffect(() => {
    if (matched.includes(id) && status !== "matched") {
      setStatus("matched");
      setIsBlocked(true);

      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      animationTimeoutRef.current = setTimeout(() => {
        setRemoved(true);
        setIsBlocked(false);
      }, 2000); // mismo tiempo que la animación roll-out-right
    }
  }, [matched, id, status]);

  // Reset cuando no hay cartas seleccionadas - Solo si esta carta estaba flipped
  useEffect(() => {
    if (onPlay === 0 && status === "flipped" && !matched.includes(id)) {
      // Iniciar secuencia shake -> reversed -> closed
      setStatus("shake");
      setIsBlocked(true); // Bloquear durante toda la secuencia de animación

      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      animationTimeoutRef.current = setTimeout(() => {
        setStatus("reversed");

        reverseTimeoutRef.current = setTimeout(() => {
          setStatus("closed");
          setIsBlocked(false); // Liberar bloqueo al completar toda la secuencia
        }, 400); // duración animación reverse
      }, 1000); // duración del shake
    }
  }, [onPlay, matched, id, status]);

  // Cleanup de estados si la carta ya no está seleccionada y no está en matched
  useEffect(() => {
    if (onPlay === 0 && !matched.includes(id)) {
      const cleanupTimeout = setTimeout(() => {
        if (status !== "closed" && status !== "matched" && !isBlocked) {
          setStatus("closed");
        }
      }, 2000);

      return () => clearTimeout(cleanupTimeout);
    }
  }, [onPlay, matched, id, status, isBlocked]);

  const getFlipClass = (status) => {
    switch (status) {
      case "flipped":
        return "flip-vertical-right shadow-amber-100";
      case "reversed":
        return "flip-vertical-left";
      case "matched":
        return "roll-out-right";
      case "shake":
        return "shake-horizontal shadow-white";
      default:
        return "";
    }
  };

  const flipClass = getFlipClass(status);

  const background = (status) => {
    switch (status) {
      case "flipped":
      case "matched":
      case "shake":
        return src; // frente
      case "reversed":
      default:
        return "/tarjeta.png"; // trasera
    }
  };

  // Si ya fue removida, devolvemos un "placeholder invisible"
  if (removed) {
    return (
      <div
        className="w-[11vw] h-[13vw] mb-3 rounded-lg"
        style={{ visibility: "hidden" }}
      />
    );
  }

  return (
    <div
      className={`relative text-white w-[9.5vw] h-[13vw] mb-3 shadow-2xl border-[#c39952] border-4 rounded-xl select-none overflow-hidden ${flipClass} ${
        isBlocked
          ? "pointer-events-none opacity-90"
          : "cursor-pointer hover:scale-105"
      } transition-transform duration-150`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {/* Imagen visible (trasera o frontal según status) */}
      <img
        src={background(status)}
        alt={title || ""}
        className="absolute inset-0 w-full h-full object-fill"
        decoding="async"
      />

      {/* Imagen invisible para FORZAR la precarga del frente */}
      <img
        src={src}
        alt=""
        style={{ display: "none" }}
        aria-hidden="true"
        decoding="async"
        fetchpriority="low"
      />
    </div>
  );
};
