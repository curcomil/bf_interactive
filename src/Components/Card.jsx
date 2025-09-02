import { useState, useEffect } from "react";

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
  const [status, setStatus] = useState("closed"); // "closed" | "flipped" | "reversed" | "matched"
  const [removed, setRemoved] = useState(false);

  const handleClick = () => {
    if (onPlay >= 2) return;
    if (onPlay === 1 && selX?.uid === uid) return;

    onPlay === 0 ? setSelX({ id, uid }) : setSelY({ id, uid });
    setOnPlay((c) => c + 1);

    setStatus("flipped");
  };

  // Cuando entra en matched, correr animación y luego ocultar manteniendo espacio
  useEffect(() => {
    if (matched.includes(id)) {
      setStatus("matched");
      const timer = setTimeout(() => {
        setRemoved(true);
      }, 2000); // mismo tiempo que la animación roll-out-right
      return () => clearTimeout(timer);
    }
  }, [matched, id]);

  // Reset cuando no hay cartas seleccionadas
  useEffect(() => {
    if (onPlay === 0 && status === "flipped") {
      setStatus("shake");
      const timer = setTimeout(() => {
        setStatus("reversed");
      }, 1000); // duración del shake
      return () => clearTimeout(timer);
    }
  }, [onPlay]);

  // Volver a "closed" después de reverse
  useEffect(() => {
    if (status === "reversed") {
      const timer = setTimeout(() => {
        setStatus("closed");
      }, 400); // duración animación reverse
      return () => clearTimeout(timer);
    }
  }, [status]);

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
        return src;

      case "matched":
        return src;
      case "shake":
        return src;

      case "reversed":
        return "/tarjeta.png";
      default:
        return "/tarjeta.png";
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
      className={`relative text-white bg-gray-700 w-[9.5vw] h-[13vw] mb-3 shadow-2xl border-[#c39952] border-4 rounded-xl cursor-pointer select-none overflow-hidden ${flipClass}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <img
        src={background(status)}
        alt=""
        className="absolute inset-0 w-full h-full object-fill"
      />
      <div className="absolute bottom-1 left-1 text-xs">
        <p className="text-3xl">{title ?? "title"}</p>
        <p>{id ?? "id"}</p>
      </div>
    </div>
  );
};
