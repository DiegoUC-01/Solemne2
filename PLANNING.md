# Planificación Backend & Fullstack — Solemne 3

## Integrantes del Grupo
- Diego Alvarez
- Matias Moraga

## Repositorio GitHub
[https://github.com/DiegoUC-01/Solemne2]

## Tecnologías Principales
- **Frontend:** Vue.js 3 + Pinia + Vite
- **Backend:** Node.js 20 + Express 5
- **Base de datos:** MongoDB 7 + Mongoose 8
- **IA externa:** Google Gemini API (gemini-2.5-flash)
- **Autenticación:** JWT + bcryptjs
- **Testing:** Vitest (frontend y backend)
- **Linter:** oxlint
- **CI/CD:** GitHub Actions
- **Containerización:** Docker + Docker Compose

**Objetivo Principal:** Transformar el frontend standalone (Solemne 2) en una aplicación fullstack con backend Express, MongoDB, autenticación JWT, Google Gemini, Docker Compose y CI/CD.

---

## Semana 1 — Infraestructura, CI/CD y Setup (16 jun – 22 jun)

> **Objetivo:** Tener repo funcional desde el día 1. GitHub Actions corriendo en cada push. Documentación base lista.

### Tareas planificadas:
**Reorganizar estructura fullstack del proyecto**
- [x] Renombrar `DESING.md` → `DESIGN.md` 
- [x] Crear `.gitignore` raíz
- [x] Crear `.gitignore` en backend
- [x] Crear `.env` en backend
- [x] Crear `.gitattributes` (CRLF normalization)
- [x] Desarrollar planificación del BACKEND `PLANNING_BACKEND.md` 
- [x] Verificar estructura final:
```
Solemne2/
├── .gitattributes
├── .gitignore
├── DESIGN.md
├── PLANNING.md
├── README.md              
├── .github/workflows/
│   ├── build.yml
│   ├── lint.yml
│   ├── main.yml
│   └── test.yml
├── Backend/
│   └── ... (modelos vacíos por ahora)
└── Game/
    └── ... (frontend)
```
**Configuración inicial:**

- [x] `config/db.js` — conexión a MongoDB con Mongoose
- [x] `package.json` del backend con todas las dependencias declaradas

**Implementar modelos Mongoose - User, Game, Dialogue**

- [x] Implementar modelo `User`-`backend/src/models/User.js` 
- [x] Implementar modelo `Game`-`backend/src/models/Game.js` 
- [x] Implementar modelo `Dialogue`-`backend/src/models/Dialogue.js` 

**Implementar autenticacion JWT con cookies httpOnly**

- [x] Crear middleware `auth.js` - | `backend/src/middleware/auth.js` |
- [x] Crear rutas `auth.js`-| `backend/src/routes/auth.js` |
- [x] Crear `index.js`-| `backend/src/index.js` |

**Unificar workflows y agregar CI/CD con push a DockerHub**

- [x] Unificar 4 workflows de GitHub Actions en 1 solo `main.yml` | `.github/workflows/main.yml` |
- Agregar job: lint + test frontend 
- Agregar job: lint + test backend 
- Agregar job: build + push a DockerHub
- [x] eliminar Workflows antiguos  
- [x] Configurar secrets en GitHub (DOCKER_USERNAME, DOCKER_TOKEN) | GitHub Secrets |

### Objetivo de la semana:
> Dejar la Estructura fullstack lista, CI/CD corriendo en cada push, documentación lista, modelos definidos,auth JWT funcionando.

### Lo que se logró completar:
Se implemento todo lo Planificado de la semana
### Lo que NO se logró:
—

### Notas:
—

---

## Semana 2 — Logica de juego + Gemini + Tests (22 jun – 28 jun)

### Objetivo: Lógica del juego en backend, Gemini AI, tests

### Tareas planificadas:
**Implementar logica de juego en el Backend - creacion, inicio, avance y decisiones**

- [x] Copiar `events.js` al backend -`Game/src/data/events.js` a `backend/src/data/events.js`
- [x] Crear e Implementar rutas del juego `games.js`(rutas del juego) - `backend/src/routes/games.js`

**Implementar logica de juego en el backend - minijuegos, continuacion y finalizacion**

- [x] Agregar rutas `continue` y `minigame` + fallbacks + parseo JSON
- [x] Reemplazar fallback temporales por 5 eventos narrativos variados
- [x] Agregar `extractAndParseJSON` 

**Integrar Google Gemini para generacion de eventos narrativos**

- [x] Crear servicio `gemini.js` - `backend/src/services/gemini.js` 
- [x] Crear rutas `dialogue.js` - `backend/src/routes/dialogue.js` 
- [x] Integrar `generateAIEvient()`en `games.js` - `backend/src/routes/games.js`
- [x] Agregar `GEMINI_API_KEY` al `.env`

**Agregar tests unitarios de auth, games y gemini**

- [x] Crear test de auth - `backend/src/tests/auth.spec.js`
- [x] Crear test de logica de juegos - `backend/src/tests/games.spec.js`
- [x] Crear test de Gemini - `backend/src/tests/games.spec.js`

**Implementar cliente HTTP y store de autenticacion**

- [x] Crear `api/index.js`(cliente HTTP) - `Game/src/api/index.js`
- [x] Crear `serverStore` - `Game/src/stores/serverStore.js` 
- [x] Actualizar `App.vue`(agregar login/register) - `Game/src/App.vue`

### Objetivo de la semana:
> Implementar toda la logica del juego en el backend, integrar Google Gemini, escribir tests y conectar el frontend al backend.

### Lo que se logró completar:


### Lo que NO se logró:
—

### Notas:
— Se borró el apartado de Auth; por error de transcripción, ya estaba realizado en la semana 1 en 'Implementar autenticación JWT con cookies httpOnly'.
- Se investigó una forma de no revelar la key; se decidió por la opción de desplegar el backend en Render (servicio cloud) y configurar las variables de entorno allí.



---
## Semana 3 — Integración Frontend-Backend, Testing Final, Docker y Entrega (29 jun – 2 jul)

> **Contexto:** El `gameStore.js` actual solo funciona en modo local, hay que agregarle `serverGameId` y metodos que deleguen las acciones al backend cuando se está en modo online. También hay que actualizar `App.vue` para que soporte ambos modos.

### Tareas planificadas:

**Conectar gameStore con backend para modo online**

- [x] Actualizar `gameStore.js` - `Game/src/stores/gameStore.js`
- [x] Actualizar `App.vue` (Modo online) - `Game/src/App.vue`
- [x] Actualizar `vite-config.js` (Agregar proxy) - `Game/vite.config.js`

**Configuracion de MongosDB Atlas y Render**
- [x] Desplegar backend en Render (cloud gratuito)
- [x] Migrar base de datos a MongoDB Atlas (cloud gratuito)
- [x] Conectar backend (Render) con base de datos (Atlas)
- [x] Arreglar CORS cross-origin para Render (sameSite: none)
- [ ] Actualizar DESIGN.md con arquitectura de producción

**Docker: configurar Docker Compose y Dockerfiles para produccion**

- [x] Crear `compose.yml` en la raiz
- [x] Crear `docker-compose.prod.yml` (producción)
- [x] Crear Dockerfile en el Backend - `backend/Dockerfile`
- [x] Crear .dockerignore en el Backend - `backend/.dockerignore`
- [x] Actualizar `Game/Dockerfile` para produccion
- [x] Mover imágenes de `src/assets/Imagen/` a `public/Imagen/` - `Game/public/Imagen/`
- [x] Crear `.env` en la raiz

**Test: actualizar tests, verificar cobertura y corregir bugs**

- [x] Actualizar tests del frontend
- [x] Verificar que todo los tests pasan
- [x] Build de producción del frontend
- [x] Correccion de bugs comunes

**Finalizar documentacion y preparar entrega final**

- [ ] Actualizar `README.md`
- [ ] Revisar `DESIGN.md`
- [ ] Actualizar `PLANNING_BACKEND.md`
- [ ] Push Final a GitHub
- [x] Verificar CI/CD en GitHub Actions
- [x] Verificar imagenes en DockerHub
- [x] Probar `docker-compose.prod.yml`
- [ ] Enviar entrega final

### Objetivo de la semana:
> Conectar el gameStore al backend para modo online, dockerizar todo, verificar tests, documentar y entregar.

### Lo que se logró completar:

### Lo que NO se logró:
—

### Notas:
— Se agregó un apartado de la configuración para MongoDB Atlas y Render.

---
