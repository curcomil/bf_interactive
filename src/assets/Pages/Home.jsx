import Menu from "../../Context/Menu";
import Game from "../../Context/Game";
import Transition from "../../Context/Transition";
import Presentacion from "../../Context/Presentation";

import { useContext } from "react";
import { AppContext } from "../../Context/Context";

import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const { context } = useContext(AppContext);

  const components = {
    menu: <Menu />,
    game: <Game />,
    transition: <Transition />,
    presentacion: <Presentacion />,
  };

  // Definimos las variantes de animación
  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    out: { opacity: 0, scale: 1.05, transition: { duration: 0.4, ease: "easeIn" } },
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={context} // 👈 importantísimo para que AnimatePresence detecte cambios
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          className="w-full h-full"
        >
          {components[context] || <p>Contexto no encontrado</p>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Home;
