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
      }, 600); // mismo tiempo que la animación roll-out-right
      return () => clearTimeout(timer);
    }
  }, [matched, id]);

  // Reset cuando no hay cartas seleccionadas
  useEffect(() => {
    if (onPlay === 0 && status !== "closed" && status !== "matched") {
      setStatus("reversed");
    }
  }, [onPlay, status]);

  // Volver a "closed" después de reverse
  useEffect(() => {
    if (status === "reversed") {
      const timer = setTimeout(() => {
        setStatus("closed");
      }, 500); // duración animación reverse
      return () => clearTimeout(timer);
    }
  }, [status]);

  const getFlipClass = (status) => {
    switch (status) {
      case "flipped":
        return "flip-vertical-right";
      case "reversed":
        return "flip-vertical-left";
      case "matched":
        return "roll-out-right";
      default:
        return "";
    }
  };

  const flipClass = getFlipClass(status);

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
      className={`text-white bg-gray-700 w-[11vw] h-[13vw] mb-3 rounded-lg grid place-items-center cursor-pointer select-none ${flipClass}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <p>{title ?? "title"}</p>
      <p>{id ?? "id"}</p>
    </div>
  );
};
