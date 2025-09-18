const contein = [
  {
    name: "Escudo de Pedro de Prado Arana",
    id: 4821,
    src_papel: "/escudos_papel/escudo_1.png",
    src_juego: "/escudos_juego/escudo_1.png",
    src_solo: "/escudos_solos/escudo_1.png",
    description:
      "Escudo partido. A la izquierda, cinco corazones (apellido Arana); a la derecha, león de sable coronado. Corresponde a un familiar del Santo Oficio y tesorero de los diezmos del mar para gastos secretos de la corona.",
  },
  {
    name: "Escudo con árbol central",
    id: 7392,
    src_papel: "/escudos_papel/escudo_2.png",
    src_juego: "/escudos_juego/escudo_2.png",
    description:
      "Escudo con un árbol al centro, flanqueado por dos animales en pose simétrica. Sobre el escudo, cruz de brazos iguales dentro de óvalo.",
  },
  {
    name: "Escudo de Antonio Agustín Albanell",
    id: 1598,
    src_papel: "/escudos_papel/escudo_3.png",
    src_juego: "/escudos_juego/escudo_3.png",
    description:
      "Escudo abacial (3 borlas). Vicecanciller de Aragón, consejero de los Reyes Católicos y embajador ante Francia y el papado.",
  },
  {
    name: "Escudo de Enrique Enríquez Manrique",
    id: 6047,
    src_papel: "/escudos_papel/escudo_4.png",
    src_juego: "/escudos_juego/escudo_4.png",
    description:
      "Escudo abacial (3 borlas), tipo cortinado con dos castillos y león de gules. Al centro, corazón atravesado por flecha (Orden Agustina). También se encuentra tallado en piedra en Osma, España.",
  },
  {
    name: "Escudo de linajes nobiliarios",
    id: 2786,
    src_papel: "/escudos_papel/escudo_5.png",
    src_juego: "/escudos_juego/escudo_5.png",
    description:
      "Composición heráldica con elementos de los apellidos Sotomayor, Altamirano, Chávez y Aragón. Incluye la leyenda “Ave María” y la Cruz de Santiago.",
  },
  {
    name: "Escudo de Juan III de Portugal",
    id: 9513,
    src_papel: "/escudos_papel/escudo_6.png",
    src_juego: "/escudos_juego/escudo_6.png",
    description:
      "Cinco quinas en cruz, símbolo de la victoria en Ourique (1139), y siete castillos en el borde, representando fortalezas conquistadas. Corresponde al escudo utilizado entre 1481 y 1911.",
  },
  {
    name: "Escudo arzobispal con armas de Felipe II",
    id: 4829,
    src_papel: "/escudos_papel/escudo_7.png",
    src_juego: "/escudos_juego/escudo_7.png",
    description:
      "Escudo coronado por mitra y galero. Combina elementos del monarca y del apellido Quintana (cinco castillos y trece roeles).",
  },
  {
    name: "Escudo del apellido Lloris",
    id: 7397,
    src_papel: "/escudos_papel/escudo_8.png",
    src_juego: "/escudos_juego/escudo_8.png",
    description:
      "Escudo cardenalicio (5 borlas). Medallón con laurel flanqueado por flores de lis (izquierda) y laurel sostenido por brazo armado (derecha).",
  },
  {
    name: "Escudo Franciscano",
    id: 1593,
    src_papel: "/escudos_papel/escudo_9.png",
    src_juego: "/escudos_juego/escudo_9.png",
    description:
      "Escudo cuadrado enmarcado en tacos tipográficos, dentro de una cartela. Contiene únicamente el escudo de las conformidades, rodeado por el cordón franciscano y la leyenda: Cordat rah itad seplvri morvm corda Francisci (El corazón de Francisco está enterrado en la tumba).",
  },
  {
    name: "Escudo compuesto de linajes",
    id: 8472,
    src_papel: "/escudos_papel/escudo_10.png",
    src_juego: "/escudos_juego/escudo_10.png",
    description:
      "Cuatro campos con armas de Aragón, Getino, Fonseca (estrellas) y Figueroa (hojas). En la base, corazón en llamas atravesado por flecha.",
  },
  {
    name: "Escudo de Felipe II",
    id: 4265,
    src_papel: "/escudos_papel/escudo_11.png",
    src_juego: "/escudos_juego/escudo_11.png",
    description:
      "Escudo coronado y cuartelado. Incluye armas de Castilla, León, Aragón, Dos Sicilias, Jerusalén, Borgoña, Brabante, Tirol y Flandes. Al centro, Toisón de Oro. Emblema de la monarquía hispánica.",
  },
  {
    name: "Escudo de Francisco de Sandoval y Rojas",
    id: 9734,
    src_papel: "/escudos_papel/escudo_12.png",
    src_juego: "/escudos_juego/escudo_12.png",
    description:
      "Escudo partido. A la izquierda, banda de sable sobre oro (Sandoval); a la derecha, estrellas de azur (Rojas). Bordura con compones de veros de plata y azur.",
  },
  {
    name: "Escudo de Carlos II",
    id: 5186,
    src_papel: "/escudos_papel/escudo_13.png",
    src_juego: "/escudos_juego/escudo_13.png",
    description:
      "Cuarteles con Castilla, León, Aragón, Dos Sicilias, Habsburgo, Borgoña y Brabante. Incluye Granada, Tirol, Flandes y el Toisón de Oro, símbolo de la Orden de caballería.",
  },
  {
    name: "Escudo de Carlos V",
    id: 6902,
    src_papel: "/escudos_papel/escudo_14.png",
    src_juego: "/escudos_juego/escudo_14.png",
    description:
      "Escudo imperial con águila bicéfala y corona. Incluye armas de Castilla, León, Aragón, Nápoles, Sicilia, Austria, Borgoña, Flandes y Tirol. Toisón de Oro y columnas con lema PLUS ULTRA.",
  },
  {
    name: "Escudo de Felipe II",
    id: 3351,
    src_papel: "/escudos_papel/escudo_15.png",
    src_juego: "/escudos_juego/escudo_15.png",
    description:
      "Escudo coronado y cuartelado. Incluye armas de Castilla, León, Aragón, Dos Sicilias, Jerusalén, Borgoña, Brabante, Tirol y Flandes. Al centro, Toisón de Oro. Emblema de la monarquía hispánica.",
  },
  {
    name: "Escudo franciscano",
    id: 2047,
    src_papel: "/escudos_papel/escudo_16.png",
    src_juego: "/escudos_juego/escudo_16.png",
    description:
      "Cartela ovalada decorada con mascarones. Al centro, escudo compuesto por las cinco llagas, el escudo de las conformidades y los tres clavos de Cristo, rodeado por el cordón franciscano. Incluye la leyenda: Signati domine servvm tvvm Franciscvm signis redeptionis nostrae (Señor, sella a tu siervo Francisco con los signos de nuestra redención).",
  },
];

export default contein;
