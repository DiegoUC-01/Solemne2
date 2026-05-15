export const fixedEvents = {
  0: {
    day: 0,
    title: 'ALERTA NACIONAL',
    location: 'casa',
    segments: [
      {
        text: 'La pantalla de la televisión parpadea con interferencia. De repente, una transmisión de emergencia interrumpe toda programación...',
      },
      {
        text: '"ATENCIÓN CIUDADANOS. UN BROTE INCONTROLADO ESTÁ TRANSFORMANDO A LAS PERSONAS EN SERES AGRESIVOS. NO SALGA DE SU HOGAR. RACIONE COMIDA Y AGUA."',
      },
      {
        text: '"UN OPERATIVO DE EVACUACIÓN SERÁ REALIZADO EN 25 DÍAS. MANTÉNGASE VIVO. QUÉDATE EN CASA. EL RESCATE VIENE."',
      },
      {
        text: 'La pantalla vuelve a la normalidad. Miras por la ventana: las calles están vacías. Solo se escuchan gritos lejanos...',
      },
    ],
    type: 'intro',
  },
  1: {
    day: 1,
    title: 'DECISIÓN MORAL',
    location: 'casa',
    segments: [
      {
        text: 'Es tu segundo día en el refugio. El silencio es interrumpido por golpes desesperados en la puerta.',
      },
      {
        text: 'Mirás por la mirilla: una mujer con su hijo pequeño, ambos demacrados, con miedo en los ojos. La mujer susurra: "Por favor... mi hijo tiene hambre..."',
      },
    ],
    decisions: [
      {
        text: 'Dejar entrar',
        effects: { food: -2, water: -1, health: 0, morale: 18 },
        result: 'La mujer entra llorando de gratitud. Su hijo se esconde detrás de ella. Ahora no estás solo.',
        setsFlag: 'refugees',
      },
      {
        text: 'No abrir',
        effects: { food: 0, water: 0, health: -3, morale: -20 },
        result: 'Escuchas los pasos alejarse. Los gritos del niño te perseguirán toda la noche. El silencio vuelve, pero algo se rompió dentro de ti.',
      },
    ],
  },
  3: {
    day: 3,
    title: 'HAMBRE',
    location: 'supermercado',
    segments: [
      {
        text: 'El estómago te gruñe. Las provisiones escasean y necesitas actuar.',
      },
      {
        text: 'A dos cuadras hay un supermercado. La vidriera está rota. Podría haber comida... pero también peligros.',
      },
    ],
    decisions: [
      {
        text: 'Buscar comida en supermercado',
        effects: {
          success: { food: 4, water: 2, health: -8, morale: 5 },
          failure: { food: -1, water: -1, health: -18, morale: -5 },
        },
        successRate: 0.5,
        successResult: 'Encontrás latas y botellas de agua entre los escombros. Una figura te persigue pero lográs escapar.',
        failureResult: 'Algo te ataca en la oscuridad del supermercado. Salís herido y con las manos vacías.',
        random: true,
      },
      {
        text: 'Comer comida podrida',
        effects: { food: 2, water: 0, health: -22, morale: -8 },
        result: 'La comida sabe horrible y te revuelve el estómago, pero al menos calma el hambre por ahora.',
      },
    ],
  },

  8: {
    day: 8,
    title: 'MANUAL',
    location: 'casa',
    segments: [
      {
        text: 'Revisando un cajón olvidado, encontrás un manual de primeros auxilios cubierto de polvo.',
      },
      {
        text: 'Las páginas están intactas. Podrías aprender algo útil... o usar las hojas para mantener el fuego esta noche.',
      },
    ],
    decisions: [
      {
        text: 'Aprender',
        effects: { food: 0, water: 0, health: 12, morale: 10 },
        result: 'Pasás horas estudiando técnicas de vendaje y purificación de agua. Conocimiento que puede salvarte la vida.',
      },
      {
        text: 'Usar hojas para fuego',
        effects: { food: 0, water: 0, health: -2, morale: -5 },
        result: 'El fuego dura unas horas. Después te quedás en la oscuridad con la sensación de haber desperdiciado algo valioso.',
      },
    ],
  },
  12: {
    day: 12,
    title: 'COOPERACIÓN',
    location: 'casa',
    segments: [
      {
        text: 'La mujer que acogiste se acerca. "He estado observando el vecindario", dice. "Sé dónde hay provisiones. Puedo ayudarte a buscarlas."',
      },
      {
        text: 'Su mirada es decidida. El niño juega en silencio en el rincón.',
      },
    ],
    requiresFlag: 'refugees',
    decisions: [
      {
        text: 'Aceptar',
        effects: { food: 3, water: 1, health: 0, morale: 12 },
        result: 'Salen juntos. Ella conoce atajos y escondites. Vuelven con provisiones y una renovada esperanza.',
      },
      {
        text: 'Rechazar',
        effects: { food: 0, water: -1, health: -4, morale: -9 },
        result: 'Ella baja la mirada. El silencio entre ustedes se vuelve pesado. La desconfianza crece.',
      },
    ],
  },
  17: {
    day: 17,
    title: 'ATAQUE',
    location: 'casa',
    segments: [
      {
        text: 'Gritos en la calle. Golpes contra la puerta. ¡Saqueadores!',
      },
      {
        text: 'Son tres o cuatro. Llevan palos y cadenas. La puerta no aguantará mucho más.',
      },
    ],
    decisions: [
      {
        text: 'Luchar',
        effects: {
          success: { food: 2, water: 1, health: -12, morale: 8 },
          failure: { food: -3, water: -2, health: -28, morale: -10 },
        },
        successRate: 0.6,
        successResult: 'Lográs repelerlos con lo que encontraste. Estás lastimado pero victorioso.',
        failureResult: 'Te superan en número. Roban tus provisiones y te dejan malherido en el suelo.',
        random: true,
      },
      {
        text: 'Negociar',
        effects: { food: -3, water: -1, health: -2, morale: -10 },
        result: 'Les das parte de tu comida a cambio de que se vayan. Sobrevivís, pero con menos recursos.',
      },
    ],
  },
  22: {
    day: 22,
    title: 'SEÑAL DE RESCATE',
    location: 'casa',
    segments: [
      {
        text: 'La radio crepita. Entre la estática, una voz clara: "Equipo de rescate en camino. Llegaremos en 3 días. Preparen señales de localización."',
      },
      {
        text: 'Tu corazón se acelera. Solo 3 días más. Pero necesitas que te encuentren.',
      },
    ],
    decisions: [
      {
        text: 'Preparar señal de humo',
        effects: { food: -1, water: 0, health: 0, morale: 18 },
        result: 'Armás una señal de humo en la azotea con trapos y madera. La esperanza renace en tu pecho.',
      },
      {
        text: 'Ignorar',
        effects: { food: 0, water: 0, health: -3, morale: -15 },
        result: 'Apagás la radio. ¿Y si es una trampa? La duda te carcome pero el miedo te paraliza.',
      },
    ],
  },
  25: {
    day: 25,
    title: '¡RESCATADO!',
    location: 'rescate',
    type: 'victory',
    segments: [
      {
        text: 'Un rugido en el cielo. El sonido más hermoso que escuchaste en tu vida: un helicóptero.',
      },
      {
        text: 'La señal de humo funcionó. El helicóptero desciende sobre el edificio vecino. Personas con trajes de protección corren hacia ti.',
      },
      {
        text: '"¡Estás a salvo!", dice uno de ellos. Mientras te suben al helicóptero, mirás hacia abajo. El mundo cambió para siempre... pero vos sobreviviste.',
      },
      {
        text: 'Has sobrevivido 25 días. FIN.',
      },
    ],
  },
}

export const randomEvents = [
  {
    title: 'Mochila abandonada',
    segments: [
      { text: 'Encontrás una mochila militar abandonada. Dentro hay latas de comida, botellas de agua y unas vendas.' },
    ],
    effects: { food: 2, water: 1, health: 2, morale: 3 },
    location: 'calle',
  },
  {
    title: 'Extraño amable',
    segments: [
      { text: 'Un anciano en la ventana de enfrente te hace señas. Te ofrece un plato de sopa caliente a través de la reja.' },
    ],
    effects: { food: 0, water: 0, health: 8, morale: 10 },
    location: 'casa',
  },
  {
    title: 'Botiquín',
    segments: [
      { text: 'Debajo de un auto volcado encontrás un botiquín de primeros auxilios casi intacto.' },
    ],
    effects: { food: 0, water: 0, health: 18, morale: 5 },
    location: 'calle',
  },
  {
    title: 'Lluvia',
    segments: [
      { text: 'Una tormenta fuerte cae sobre la ciudad. Colocás recipientes para recoger agua de lluvia. El sonido es relajante.' },
    ],
    effects: { food: 0, water: 3, health: 2, morale: 4 },
    location: 'casa',
  },
  {
    title: 'Rata muerta',
    segments: [
      { text: 'Encontrás una rata muerta cerca de tu refugio. Podrías comerla... pero el riesgo de enfermedad es alto.' },
    ],
    effects: { food: 1, water: 0, health: -7, morale: -9 },
    location: 'calle',
  },
  {
    title: 'Radio funcional',
    segments: [
      { text: 'Entre los escombros encontrás una radio de emergencia funcional. Captás música y mensajes de otros supervivientes.' },
    ],
    effects: { food: 0, water: 0, health: 3, morale: 12 },
    location: 'casa',
  },
]

export const minigameEvents = {
  5: {
    day: 5,
    type: 'catchRain',
    title: 'RECOGER AGUA DE LLUVIA',
    location: 'casa',
    win: { water: 3, morale: 5, message: 'Recolectaste suficiente agua de lluvia.' },
    lose: { water: -1, morale: -5, message: 'No juntaste suficiente agua.' },
  },
  10: {
    day: 10,
    type: 'findCans',
    title: 'BUSCAR LATAS',
    location: 'supermercado',
    win: { food: 4, morale: 8, message: 'Encontraste 5 latas de comida.' },
    lose: { food: -2, morale: -5, message: 'No alcanzaste a juntar suficientes latas.' },
  },
  15: {
    day: 15,
    type: 'escape',
    title: 'ESCAPE FINAL',
    location: 'calle',
    win: { health: 5, morale: 15, message: 'Esquivaste las bombas y llegaste al helicóptero.' },
    lose: { health: -20, morale: -10, message: 'Una bomba te golpeó de lleno.' },
  },
}

export const transitionTexts = [
  'El sol se oculta tras los edificios destruidos...',
  'Otra noche de gritos y silencio...',
  'Amanece un nuevo día en el apocalipsis...',
  'La noche fue tranquila... demasiado tranquila...',
  'Despertás con el sonido de cristales rotos...',
  'Un nuevo día. Otro día más...',
]