# Planificación del Proyecto - 15 Dias

## Integrantes del Grupo
- [Diego Alvarez] 
- [Matias Moraga]  


## Repositorio GitHub
[https://github.com/DiegoUC-01/Solemne2]

## Tecnologías Principales
- **Framework:** Vue.js 3 (Composition API)
- **Estado global:** Pinia
- **Build tool:** Vite
- **Estilos:** NES.css + Pixelium Design
- **Testing:** Vitest
- **CI/CD:** GitHub Actions
- **Docker:** Containerización

---

## Semana 1 – Diseño y Planificación

### Tareas planificadas:

**Antes de escribir código:**
- [x] Crear repositorio en GitHub
- [x] Invitar a todos los integrantes al repositorio

**Documentación:**
- [x] Redactar `DESIGN.md` completo con:
  - Mockups de pantallas principales:
    - Pantalla de inicio (Día 0 - Noticia en TV)
    - Pantalla de juego (estadísticas + área de decisiones)
    - Pantalla de Game Over
    - Pantalla de Victoria (rescate en helicóptero)
  - Justificación del framework elegido (Vue.js 3 + Pinia)
    - *Por qué Vue.js: Reactividad nativa, fácil manejo de estado con Pinia, comunidad grande, ideal para UI interactiva*
  - Estructura de carpetas propuesta (ver abajo)
  - Descripción del juego: mecánicas, reglas, flujo
- [x] Redactar `PLANNING.md` inicial con este cronograma
- [x] Crear `README.md` base

**Diseño visual preliminar:**
- [ ] Elegir paleta de colores retro (verdes militares, grises, amarillos cálidos)
- [x] Seleccionar tipografías: `Press Start 2P` + `VT323`
- [ ] Definir assets necesarios (imágenes pixel art para fondos)

### Objetivo de la semana:
> Tener base documental completa, repositorio configurado y diseño visual definido antes del fin de semana.

###  Lo que se logró completar:
*(Fecha 30/04/2026)* Se logró la creación del repositorio y la documentación; el DESIGN.md y PLANNING.md se agregaron correctamente al repositorio.

###  Lo que NO se logró:
*(Fecha 30/04/2026)* Falta la designación de la paleta de colores del juego, como a su vez imágenes pixel art para fondos; se decidirá a más tardar el domingo 03/05/2026.

###  Notas:
*(Problemas encontrados, soluciones, cambios de plan)*

---

## Semana 2 – Configuración y Primeros Componentes

###  Tareas planificadas:

**Configuración del proyecto:**
***Inicializar Proyecto***
- [ ] Instalar Node.js y pnpm en nuestras computadoras.

- [ ] Crear Estructura de carpertas:
```
src\
  assets\styles\
  composables\
  components\    
  components\minigames
  stores\        
  data\         
  tests\         
public\          
.github\
  workflows\ 
```
- [ ] Crear package.json
- [ ] pnpm install
- [ ] Crear archivo vite.config.js
- [ ] Crear archivo .gitignore
- [ ] Crear archivo index.html
      
***Creacion de Archivo***

- [ ] Crear archivo src/main.js
- [ ] Crear archivo src/assets/retro.css
- [ ] Crear archivo src/data/events.js
- [ ] Crear archivo src/stores/gameStore.js
- [ ] Crear archivo src/components/StatBar.vue
- [ ] Crear archivo src/components/StoryText.vue
- [ ] Crear archivo src/components/DecisionButtons.vue
- [ ] Crear archivo src/components/PixelBackground.vue
- [ ] Crear archivo src/components/SceneArt.vue
- [ ] Crear archivo src/components/minigames/CatchRainGame.vue
- [ ] Crear archivo src/components/minigames/FindcansGame.vue
- [ ] Crear archivo src/components/minigames/EscapeGame.vue
- [ ] Crear archivo src/composables/useAudio.js
- [ ] Crear archivo src/App.vue
- [ ] Crear archivo src/tests/gameStore.spec.js


 Objetivo de la semana:
Proyecto ejecutable en navegador con pantalla inicial, estadísticas visibles y fondos dinámicos funcionando.

 Lo que se logró completar:
(Se llena al final de la semana)

 Lo que NO se logró:
(Se llena al final de la semana)

 Notas:
(Problemas encontrados, soluciones, cambios de plan)

---

## Semana 3 – Implementación de Desarrollo de Mecánicas y Lógica del Juego(codigo)
 Tareas planificadas:
### Agregar Store del juego y datos de eventos:
- [ ] Implementación de events.js
- [ ] Implementación de gameStore.js
### Agregar componentes Visuales Estilo Retro y App Principal:
- [ ] Implementación de main.js
- [ ] Implementación de retro.css
- [ ] Implementación de StatBar.vue
- [ ] Implementación de StoryText.vue
- [ ] Implementación de DecisionButtons.vue
- [ ] Implementación de PixelBackground.vue
- [ ] Implementación de SceneArt.vue
- [ ] Implementación de App.vue
### Agregar minijuegos interactivos para dias 5, 10 y 15:
- [ ] Implementación de CatchRainGame.vue
- [ ] Implementación de FindcansGame.vue
- [ ] Implementación de EscapeGame.vue
### Agregar Sistema de audio con web Audio API:
- [ ] Implementación de useAudio.js

 Objetivo de la semana:
Tener una Base del Juego completamente jugable del día 0 al día 15, con todas las decisiones afectando recursos y mostrando consecuencias.

 Lo que se logró completar:
(Se llena al final de la semana)

 Lo que NO se logró:
(Se llena al final de la semana)

 Notas:
(Problemas encontrados, soluciones, cambios de plan)

---

## Semana 4 – Testing, Docker y CI/CD
 Tareas planificadas:
### Agregar Pruebas unitaria del store :

- [ ] Implementación de gameStore.spec.js
      
### Agragar Pruebas unitarias (Vitest):


- [ ] Configurar Vitest en vite.config.js

- [ ] Implementar pruebas para gameStore.js:

- [ ] Verificar que applyDecision modifica recursos correctamente

- [ ] Verificar que consumeDaily funciona con/without refugiados

- [ ] Verificar que checkGameStatus detecta game over y victoria

- [ ] Verificar que resetGame vuelve al estado inicial

### Implementar pruebas para componentes:

- [ ] StatBar.vue: verificar que muestra valores correctos

- [ ] DecisionButtons.vue: verificar que emite eventos

### Docker:

- [ ] Crear Dockerfile

### GitHub Actions (CI/CD):

- [ ] Crear workflow de Linter 
- [ ] Crear workflow de Testing 

### DockerHub:

- [ ] Crear workflow de Build y Push a DockerHub

- [ ] Configurar secrets en GitHub (DOCKER_USERNAME, DOCKER_TOKEN)

 Objetivo de la semana:
Flujo CI/CD funcionando con cada push: linter → pruebas → build Docker → push a DockerHub.

 Lo que se logró completar:
(Se llena al final de la semana)

 Lo que NO se logró:
(Se llena al final de la semana)

 Notas:
(Problemas encontrados, soluciones, cambios de plan)


---

## Semana 5 – Pulido, Minijuegos y Entrega Final
 Tareas planificadas:
### Mejoras UI/UX:

- [ ] Añadir animaciones de transición entre días

- [ ] Mejorar feedback visual al tomar decisiones

- [ ] Implementar efecto de partículas (polvo, lluvia opcional)

- [ ] Asegurar responsividad en móviles (media queries)

- [ ] Probar en navegadores: Chrome, Firefox, Edge

  ### Minijuegos (opcional):

Implementar minijuego Día 3: Buscar latas en supermercado

-Canvas de 600x400

-3 latas escondidas en 15 segundos

-Click en objeto incorrecto resta tiempo

Implementar minijuego Día 12: Atrapar gotas de lluvia

-Mover balde con mouse

-Atrapar 10 gotas en 20 segundos

## Documentación final:

- [ ] Completar README.md con:

- [ ] Instrucciones de instalación local

- [ ] Instrucciones para ejecutar con Docker

- [ ] Capturas de pantalla del juego

- [ ] Link a GitHub Pages (demo)

- [ ] Revisar y actualizar DESIGN.md con decisiones finales

- [ ] Revisar y completar PLANNING.md con resultados de todas las semanas

### Comprobar errores:

- [ ] Probar que el juego funciona correctamente

- [ ] Verificar que no hay errores en consola

### Entrega:

Enviar correo al profesor con:

- [ ] Nombres de integrantes

- [ ] Link al repositorio GitHub

- [ ] Link a GitHub Pages

- [ ] Link a DockerHub 

 Objetivo de la semana:
Proyecto robusto, documentado, testeado y entregado. Versión final jugable y profesional.

 Lo que se logró completar:
(Se llena al final de la semana)

 Lo que NO se logró:
(Se llena al final de la semana)

 Notas:
(Problemas encontrados, soluciones, cambios de plan)
