import Menu from "../../Context/Menu";
import Game from "../../Context/Game";
import Transition from "../../Context/Transition";

import { useContext } from "react";
import { AppContext } from "../../Context/Context";

function Home() {
  const { context } = useContext(AppContext);

  const components = {
    menu: <Menu />,
    game: <Game />,
    transition: <Transition />,
  };

  return <div>{components[context] || <p>Contexto no encontrado</p>}</div>;
}

export default Home;
