# Documento de Diseño — 15 Días (Fullstack)

## Integrantes del Grupo
- Diego Alvarez
- Matias Moraga

## Repositorio GitHub
[https://github.com/DiegoUC-01/Solemne2](https://github.com/DiegoUC-01/Solemne2)

---

## 1. Descripción del Juego

### Género
Aventura narrativa / Survival / Toma de decisiones

### Premisa
Tras el estallido de una Tercera Guerra Mundial, múltiples potencias lanzaron ataques nucleares que devastaron gran parte del planeta. Las ciudades quedaron reducidas a ruinas, el aire se volvió peligroso de respirar y los recursos básicos comenzaron a escasear rápidamente. La mayoría de la población no sobrevivió.

El jugador asume el rol de un sobreviviente que ha logrado resguardarse en un departamento. Desde allí, deberá tomar decisiones críticas día a día para mantenerse con vida, administrar recursos limitados como comida, agua y suministros médicos, y enfrentar eventos impredecibles que pondrán a prueba su juicio y moral.

Cada decisión tendrá consecuencias, y no siempre existirá una opción correcta. El objetivo es **sobrevivir 15 días** hasta que llegue el helicóptero de rescate.

### Mecánicas del Juego

El juego se basa en un sistema de supervivencia por días. Tras cada evento narrativo, el jugador debe tomar decisiones que afectan sus recursos. Los recursos se consumen diariamente y también cambian según las decisiones.

- **Cada día tiene hasta 3 eventos**: eventos fijos predefinidos + eventos generados por IA (Google Gemini).
- **Los días 5, 10 y 15 tienen minijuegos**: Recoger agua de lluvia, buscar latas esquivando enemigos y escapar al helicóptero.
- **El diario registra** cada decisión y evento para consulta del jugador.
- **Modo local**: partida sin conexión, todo en el navegador.
- **Modo online**: partida guardada en servidor con login. Permite cerrar el navegador y retomar la partida más tarde al volver a iniciar sesión (misma máquina).

### Sistema de Recursos

| Recurso | Inicial | Máximo | ¿Qué representa? | Efecto si llega a 0 |
|---------|---------|--------|------------------|---------------------|
| Comida | 6 | 20 | Alimento disponible | -4 salud extra por día |
| Agua | 4 | 20 | Hidratación | -6 salud extra por día |
| Salud | 80 | 100 | Condición física | **Game Over** |
| Moral | 70 | 100 | Salud mental | **Game Over** |

### Consumo diario base

| Recurso | Cambio por día |
|---------|---------------|
| Comida | -1 |
| Agua | -1 |
| Salud | -4 |
| Moral | -3 |

---

## 2. Mockups de Pantallas Principales

### Pantalla 1: Inicio / Día 0 — Noticia en TV
<img width="1901" height="1065" alt="Pantalla de inicio - Día 0" src="https://github.com/user-attachments/assets/b0f8c0c8-dd36-4218-860c-bec558fb8f36" />

### Pantalla 2: Juego — Día con decisión
<img width="1886" height="1062" alt="Pantalla de juego con decisión" src="https://github.com/user-attachments/assets/6c098853-d8e6-4ca2-aa0d-a2fc53629898" />

### Pantalla 3: Game Over
<img width="1884" height="1050" alt="Pantalla de Game Over" src="https://github.com/user-attachments/assets/4200dfb3-980c-49c6-8520-516b6ae27d83" />

---

## 3. Tecnologías del Frontend

### Framework: Vue.js 3 + Pinia

La elección de **Vue.js 3** como framework principal se justifica porque:
- Su **reactividad nativa** actualiza automáticamente la UI al cambiar recursos (comida, agua, salud, moral).
- **Pinia** centraliza el estado global del juego (día, recursos, decisiones, flags) evitando el paso manual de props.
- La **Composition API** permite organizar la lógica por funcionalidad (`useAudio`, stores).
- **Comunidad extensa** con documentación activa y soluciones rápidas.

### Frameworks Visuales: NES.css + Pixelium Design

| Framework | Propósito |
|-----------|-----------|
| **NES.css** | Estilo retro 8-bit (botones, contenedores, barras de progreso, iconos pixelados). CSS puro, compatible con Vue. |
| **Pixelium Design** | Componentes Vue 3 listos para usar (`<px-button>`, `<px-card>`). Optimizado para Composition API. |

**Tipografías:** `Press Start 2P` (títulos) + `VT323` (texto narrativo), importadas desde Google Fonts.

### Dependencias principales

| Dependencia | Versión | Propósito |
|-------------|---------|-----------|
| `vue` | ^3.5.0 | Framework principal |
| `pinia` | ^2.1.0 | Estado global |
| `nes.css` | ^2.3.0 | Framework CSS retro (NES) |
| `@pixelium/web-vue` | ^0.1.4 | Componentes pixel art para Vue |
| `vite` | ^8.0.0 | Build tool |
| `vitest` | ^4.0.0 | Testing unitario |
| `jsdom` | ^29.0.0 | DOM simulado para pruebas |
| `oxlint` | ^0.15.0 | Linter |

---

## 4. Arquitectura Fullstack

### Diagrama

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│    ┌──────────┐          ┌──────────────────┐          ┌──────────────┐    │
│    │ JUGADOR  │ ──clics──▶│    FRONTEND      │──HTTP────▶│   BACKEND    │    │
│    │ (persona)│◄──UI─────│   (Vue 3 + Vite) │◄─HTTP─────│  (Express)   │    │
│    └──────────┘          └──────────────────┘   JSON    └──┬───┬───────┘    │
│                                                            │   │            │
│                                              ┌─────────────┘   │            │
│                                              │ guardar/leer     │ si no      │
│                                              ▼ partidas         │ cacheado   │
│                                        ┌──────────┐            │            │
│                                        │ MongoDB  │            │            │
│                                        │ users    │            │            │
│                                        │ games    │            │            │
│                                        │ dialogues│ ← caché    │            │
│                                        └──────────┘            │            │
│                                              │                 │            │
│                                              │ si no está      │            │
│                                              │ en caché        ▼            │
│                                              │          ┌─────────────┐     │
│                                              └──────────│   GEMINI    │     │
│                                                         │  (IA)       │     │
│                                                         └─────────────┘     │
│  ┌──────────────────────────────────────────────────────────────────┐       │
│  │              DOCKER — 3 contenedores orquestados                  │       │
│  │  ┌─────────────┐   ┌────────────────┐   ┌──────────────────────┐ │       │
│  │  │  mongodb    │◀──│    backend     │◀──│      frontend        │ │       │
│  │  │  mongo:7    │──▶│  Node 20 Alpine│──▶│  Node 20 Alpine+Vite │ │       │
│  │  │  :27017     │   │  :3000         │   │  :5173               │ │       │
│  │  └─────────────┘   └────────────────┘   └──────────────────────┘ │       │
│  └──────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────┐       │
│  │              GITHUB ACTIONS — CI/CD en cada push                  │       │
│  │    push → lint frontend → lint backend → tests → build Docker →  │       │
│  │    push imágenes a DockerHub                                      │       │
│  └──────────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Stack tecnológico completo

| Capa | Tecnología | Propósito |
|------|-----------|-----------|
| Frontend | Vue.js 3 + Pinia + Vite | UI del juego, estado local, minijuegos |
| Backend | Node.js 20 + Express 5 | API REST, lógica de juego, auth |
| Base de datos | MongoDB 7 + Mongoose 8 | Persistencia de usuarios, partidas, caché IA |
| IA externa | Google Gemini API (gemini-2.5-flash) | Diálogos y eventos dinámicos |
| Testing | Vitest | 48 pruebas unitarias (19 frontend + 29 backend) |
| Linter | oxlint | Análisis estático (frontend y backend) |
| CI/CD | GitHub Actions | Lint → Test → Build y Push a DockerHub |
| Containerización | Docker + Docker Compose | 3 servicios: frontend, backend, mongodb |
| Registro | DockerHub | Imágenes pre-built para producción |

---

## 5. Mejoras y Correcciones (Solemne 2 → Solemne 3)

- **Eventos múltiples por día**: El sistema original tenía 1 evento por día. Ahora cada día puede tener hasta 3 eventos, combinando eventos fijos predefinidos con eventos generados por IA.
- **Persistencia en servidor**: Las partidas se guardan en MongoDB. Al cerrar y volver a abrir el navegador, el jugador puede iniciar sesión y su progreso se mantiene. Nota: con MongoDB local no funciona entre distintos dispositivos; para cross-device se requiere MongoDB Atlas (cloud).
- **Autenticación de usuarios**: Registro y login con JWT (cookies httpOnly) para identificar jugadores.
- **Diálogos dinámicos con IA**: Eventos narrativos generados por Google Gemini que complementan los eventos fijos, enriqueciendo la experiencia sin repetir contenido.
- **Caché de IA**: Las respuestas generadas por Gemini se almacenan en MongoDB indexadas por SHA256 del contexto, evitando llamadas repetidas a la API externa.
- **Docker Compose**: Orquestación de 3 servicios (MongoDB, backend, frontend) con un solo comando.
- **CI/CD real**: GitHub Actions construye y pushea imágenes a DockerHub automáticamente en cada push.
- **Valores iniciales balanceados**: Ajustados a 6/4/80/70 para mayor dificultad (antes 10/8/100/100).

---

## 6. Servicio REST Externo: Google Gemini

### Justificación

Google Gemini API (modelo `gemini-2.5-flash`) fue elegido porque:
- Es **gratuito** en su tier gratuito (1,500 requests/día)
- Genera texto en español de alta calidad
- Responde en formato JSON estructurado, ideal para parsear eventos del juego
- Su latencia es baja (~1-2 segundos por request)

### Endpoints consumidos

| Endpoint | Método | Uso en el juego |
|----------|--------|----------------|
| `generateContent` | POST | Generar eventos narrativos dinámicos con decisiones y efectos |


### Sistema de caché

Si Gemini falla o devuelve JSON inválido, el sistema usa **5 eventos fallback** rotativos por día con narrativa predefinida. Esto garantiza que el juego nunca se quede sin contenido.

### Prompt enviado a Gemini

El prompt (`buildGamePrompt` en `services/gemini.js`) incluye:
- Día actual, etapa de la historia (temprana, intermedia, final)
- Recursos actuales (comida, agua, salud, moral)
- Flags de decisiones anteriores
- Contexto narrativo del día
- Instrucciones para devolver JSON estructurado con título, ubicación, imagen, segmentos y decisiones

---

## 7. Modelo de Datos MongoDB

### Colección `users`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `_id` | ObjectId | Identificador único |
| `username` | String, unique | Nombre de usuario |
| `password` | String | Bcrypt hasheado (nunca se envía al frontend) |
| `createdAt` | Date | Fecha de registro |
| `updatedAt` | Date | Última modificación |

### Colección `games`

| Campo | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `_id` | ObjectId | — | Identificador único |
| `userId` | ObjectId (ref: User) | — | Dueño de la partida |
| `day` | Number | 0 | Día actual (0 = intro, 1-15 = juego) |
| `phase` | String (enum) | `intro` | menu, intro, story, decision, result, minigame, victory, gameover |
| `food` | Number | 6 | Comida (0-20) |
| `water` | Number | 4 | Agua (0-20) |
| `health` | Number | 80 | Salud (0-100) |
| `morale` | Number | 70 | Moral (0-100) |
| `maxStat` | Number | 20 | Máximo de comida/agua |
| `maxHealth` | Number | 100 | Máximo de salud |
| `maxMorale` | Number | 100 | Máximo de moral |
| `flags` | Mixed | `{}` | Flags de historia (ej: `{ refugees: true }`) |
| `journal` | Array\<JournalEntry\> | `[]` | Bitácora de eventos y decisiones |
| `currentEvent` | Mixed | null | Evento narrativo actual (objeto JSON) |
| `currentSegment` | Number | 0 | Índice del segmento actual dentro del evento |
| `decisionResult` | Mixed | null | Resultado de la última decisión |
| `usedRandomEvents` | [Number] | `[]` | Índices de eventos random ya usados |
| `gameOverReason` | String | null | `health` o `morale` |
| `eventsThisDay` | Number | 0 | Eventos jugados en el día actual |
| `maxEventsPerDay` | Number | 3 | Máximo de eventos por día |
| `status` | String (enum) | `active` | active, won, lost |
| `createdAt` | Date | — | Fecha de creación |
| `updatedAt` | Date | — | Última modificación |

#### Subdocumento JournalEntry

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `day` | Number | Día en que ocurrió |
| `type` | String (enum) | evento, decision, minijuego |
| `title` | String | Título del evento |
| `decision` | String | Texto de la decisión tomada |
| `result` | String | Resultado narrativo |
| `description` | String | Descripción adicional |
| `effects` | Mixed | Efectos sobre recursos |
| `success` | Boolean | Si la decisión fue exitosa |
| `timestamp` | Date | Momento del registro |

### Colección `dialogues`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `_id` | ObjectId | Identificador único |
| `contextHash` | String, unique, indexed | Hash SHA256 del contexto del juego |
| `prompt` | String | Prompt enviado a Gemini |
| `response` | Mixed | Respuesta parseada (título, segmentos, decisiones) |
| `model` | String | `gemini-2.5-flash` |
| `tokensUsed` | Number | Tokens consumidos en la llamada |
| `createdAt` | Date | Fecha de creación |
| `updatedAt` | Date | Última modificación |

---

## 8. Endpoints de la API REST

### Auth (`/api/auth`) — Sin autenticación previa requerida (excepto `/me`)

| Método | Ruta | Auth | Body | Respuesta |
|--------|------|------|------|-----------|
| POST | `/register` | No | `{ username, password }` | `{ user }` + cookie httpOnly |
| POST | `/login` | No | `{ username, password }` | `{ user }` + cookie httpOnly |
| GET | `/me` | JWT | — | `{ user }` |
| POST | `/logout` | No | — | `{ message }` + clear cookie |

### Games (`/api/games`) —Requiere JWT

| Método | Ruta | Body | Descripción |
|--------|------|------|-------------|
| POST | `/` | — | Crear nueva partida (día 0, fase intro) |
| GET | `/user` | — | Listar partidas del usuario (ordenadas por updatedAt desc) |
| GET | `/:id` | — | Obtener estado completo de una partida |
| PUT | `/:id/start` | — | Iniciar día 1 (consumo diario + primer evento) |
| PUT | `/:id/advance-segment` | — | Avanzar al siguiente segmento de texto del evento actual |
| PUT | `/:id/decision` | `{ decisionIndex }` | Procesar decisión, aplicar efectos, guardar en diario |
| PUT | `/:id/continue` | — | Continuar tras ver el resultado de una decisión |
| PUT | `/:id/minigame` | `{ result }` | Registrar resultado de minijuego (`win` o `lose`) |

### Diálogos IA (`/api/dialogue`) — Requiere JWT

| Método | Ruta | Body | Descripción |
|--------|------|------|-------------|
| POST | `/generate` | `{ day, flags, food, water, health, morale, context }` | Generar evento narrativo con Gemini (con caché) |
| GET | `/cache/stats` | — | Estadísticas del caché (cantidad de diálogos cacheados) |

---

## 9. Estructura de Carpetas (Fullstack)

```
Solemne2/
├── compose.yml                          
├── docker-compose.prod.yml              
├── .gitignore                           
├── .gitattributes                       
├── .env                                 
├── DESIGN.md                            
├── PLANNING.md                          
├── README.md                            
├── .github/
│   └── workflows/
│       └── main.yml                     
├── Game/                                
│   ├── Dockerfile                       
│   ├── .dockerignore
│   ├── .gitignore
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── vite.config.js                   
│   ├── index.html
│   ├── public/
│   │   └── Imagen/                      
│   │       ├── antes_final.png
│   │       ├── casa_con_tablones.png
│   │       ├── casadia1.png
│   │       ├── FARMACIA1.png
│   │       ├── helicóptero_irse.png
│   │       ├── noticiadia0.png
│   │       ├── plaza.png
│   │       └── superme.png
│   └── src/
│       ├── main.js                      
│       ├── App.vue                      
│       ├── api/
│       │   └── index.js                 
│       ├── stores/
│       │   ├── gameStore.js             
│       │   └── serverStore.js           
│       ├── components/
│       │   ├── StatBar.vue              
│       │   ├── StoryText.vue            
│       │   ├── DecisionButtons.vue      
│       │   ├── PixelBackground.vue      
│       │   ├── SceneArt.vue             
│       │   └── minigames/
│       │       ├── CatchRainGame.vue   
│       │       ├── FindcansGame.vue    
│       │       └── EscapeGame.vue      
│       ├── composables/
│       │   └── useAudio.js             
│       ├── data/
│       │   └── events.js               
│       ├── assets/
│       │   └── styles/
│       │       └── retro.css           
│       └── tests/
│           └── gameStore.spec.js       
└── backend/                            
    ├── Dockerfile                      
    ├── .dockerignore
    ├── .gitignore
    ├── .env                            
    ├── .env.example                    
    ├── package.json
    ├── pnpm-lock.yaml
    └── src/
        ├── index.js                    
        ├── config/
        │   └── db.js                   
        ├── models/
        │   ├── User.js                 
        │   ├── Game.js                 
        │   └── Dialogue.js             
        ├── middleware/
        │   └── auth.js                 
        ├── routes/
        │   ├── auth.js                 
        │   ├── games.js                
        │   └── dialogue.js             
        ├── services/
        │   └── gemini.js               
        ├── data/
        │   └── events.js               
        └── tests/
            ├── auth.spec.js             
            ├── games.spec.js            
            └── gemini.spec.js           
```
---

## 10. Modo Online vs Modo Local

### Modo Local
- Partida en memoria del navegador (Pinia store).
- Sin persistencia: al recargar la página se pierde el progreso.
- No requiere registro ni backend.
- Ideal para partidas rápidas o pruebas.

### Modo Online
- Requiere registro/login (JWT en cookie httpOnly).
- Partida persistida en MongoDB.
- Cada acción (avanzar, decidir, continuar, minijuego) se envía al backend via `PUT /api/games/:id/*`.
- El backend responde con el estado completo de la partida.
- El frontend aplica el estado recibido con `applyServerState()`.
- Permite retomar la partida al volver a iniciar sesión.

---

## 11. Nuevas Pantallas (Solemne 3)

### Pantalla de Login
Formulario con campos usuario y contraseña. Botón para cambiar a registro. Validación de errores (credenciales inválidas, usuario ya existe, contraseña muy corta).

### Pantalla de Registro
Similar al login pero crea una cuenta nueva. Requiere contraseña de mínimo 6 caracteres.

### Indicador de usuario logueado
Badge en el header con el nombre de usuario. Botón "SALIR" para cerrar sesión.

### Indicador de modo ONLINE
Badge amarillo en el header que aparece cuando la partida está conectada al servidor (`game.serverGameId` no es null).

### Selector de partidas (pendiente)
Lista las partidas guardadas del usuario desde `GET /api/games/user`. Permite continuar una partida existente o empezar una nueva. *(Nota: implementado en el backend, pendiente de UI en frontend.)*

---

## 12. Minijuegos

| Día | Minijuego | Tipo | Objetivo | Condición de victoria | Penalización por derrota |
|-----|-----------|------|----------|----------------------|--------------------------|
| 5 | CatchRain | Canvas | Mover balde con flechas para atrapar gotas | ≥ 7.5 gotas en 25s | -3 agua, -10 salud, -5 moral |
| 10 | FindCans | Canvas | Esquivar enemigos (cuchillos) que caen | Sobrevivir 20s (3 vidas) | -4 comida, -15 salud, -8 moral |
| 15 | Escape | Canvas | Mover triángulo hacia el helicóptero esquivando bombas | Llegar a la zona segura (3 vidas) | Game Over inmediato |

---

## 13. Sistema de Audio

Implementado con Web Audio API (`useAudio.js`):

| Sonido | Tipo | Gatillo |
|--------|------|---------|
| Click | Oscilador corto (800Hz, 50ms) | Click en botones |
| Daño | Oscilador descendente (400→200Hz, 300ms) | Decisiones con efecto negativo |
| Victoria | Secuencia ascendente (3 notas) | Fase victory |
| Game Over | Tono grave sostenido (150Hz, 500ms) | Fase gameover |
| Evento aleatorio | Tono agudo (1000Hz, 100ms) | Evento tipo random |
| Música ambiente | Oscilador grave continuo (80Hz) | Durante el juego (toggleable) |

Control de muteo desde el header y desde la pantalla de configuración.

---

## 14. Testing

| Suite | Archivo | Tests | Cobertura |
|-------|---------|-------|-----------|
| Game Store | `Game/src/tests/gameStore.spec.js` | 19 | Estado inicial, startGame, advanceSegment, makeDecision, consumo diario, game over, victoria, flags |
| Auth | `backend/src/tests/auth.spec.js` | 5 | Generación JWT, decodificación, token inválido, secret incorrecto, expiración |
| Games | `backend/src/tests/games.spec.js` | 11 | Consumo diario, penalizaciones, efectos de decisión, clamping, game over, victoria, flags |
| Gemini | `backend/src/tests/gemini.spec.js` | 8 | clamp, generateContextHash, buildGamePrompt |
| **Total** | | **48** | |

Comando: `pnpm test` en cada carpeta (`Game/` y `backend/`).

---

## 15. CI/CD

Workflow unificado en `.github/workflows/main.yml`:

```
Push a main/master
  │
  ├── Job 1: lint-and-test-frontend
  │   ├── pnpm install
  │   ├── pnpm lint (oxlint)
  │   └── pnpm test (vitest, 19 tests)
  │
  ├── Job 2: lint-and-test-backend
  │   ├── pnpm install
  │   ├── pnpm lint (oxlint)
  │   └── pnpm test (vitest, 29 tests)
  │
  └── Job 3: build-and-push (needs jobs 1 y 2)
      ├── Login a DockerHub
      ├── Build + push 15dias-frontend:latest
      └── Build + push 15dias-backend:latest
```

---

## 16. Despliegue

### Desarrollo local

```bash
# Terminal 1: MongoDB
docker run -d --name mongo-dev -p 27017:27017 mongo:7

# Terminal 2: Backend
cd backend && pnpm dev

# Terminal 3: Frontend (con proxy /api → localhost:3000)
cd Game && pnpm dev
# Abrir http://localhost:5173
```

### Docker Compose (desarrollo)

```bash
docker compose up --build
# Construye y levanta los 3 servicios
# Frontend: http://localhost:5173
# Backend:  http://localhost:3000
# MongoDB:  localhost:27017
```

### Docker Compose (producción)

```bash
docker compose -f docker-compose.prod.yml up
# Usa imágenes pre-built de DockerHub
# No requiere código fuente
```
---

## 17. Variables de Entorno

### Backend (`.env`)

| Variable | Descripción | Default |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | 3000 |
| `MONGODB_URI` | URI de conexión a MongoDB | `mongodb://localhost:27017/15dias` |
| `JWT_SECRET` | Secreto para firmar tokens JWT | (requerido en producción) |
| `GEMINI_API_KEY` | API key de Google Gemini | (requerido para eventos IA) |
| `ALLOWED_ORIGIN` | Origen permitido para CORS | `http://localhost:5173` |

### Frontend (`VITE_API_URL` en Docker)

| Variable | Descripción | Default |
|----------|-------------|---------|
| `VITE_API_URL` | URL base de la API | `http://localhost:3000/api` |
