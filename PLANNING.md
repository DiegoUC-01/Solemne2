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

- [ ] Inicializar proyecto Vue.js 3 con Vite usando pnpm:
```
pnpm create vue@latest apocalipsis25
cd apocalipsis25
pnpm install
```
- [ ] Instalar dependencias principales:
```
pnpm add pinia
pnpm add nes.css
pnpm add @pixelium/web-vue
pnpm add -D vitest @vue/test-utils jsdom oxlint
```
- [ ] Configurar Vue Router (aunque sea simple, por escalabilidad)

- [ ] Configurar vite.config.js para alias y assets

Componentes base:

- [ ] Crear main.js con configuración de Pinia

- [ ] Crear App.vue con estructura principal (contenedor 16:9)

- [ ] Implementar componente StatBar.vue (comida, agua, salud, moral + día)

- [ ] Implementar componente PixelBackground.vue (fondo dinámico)

- [ ] Implementar estilos base con efecto CRT (scanlines + vignette)

Docker:
- [ ] Crear Dockerfile inicial:
```
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```
 Objetivo de la semana:
Proyecto ejecutable en navegador con pantalla inicial, estadísticas visibles y fondos dinámicos funcionando.

 Lo que se logró completar:
(Se llena al final de la semana)

 Lo que NO se logró:
(Se llena al final de la semana)

 Notas:
(Problemas encontrados, soluciones, cambios de plan)

---

## Semana 3 – Desarrollo de Mecánicas y Lógica del Juego
 Tareas planificadas:
Estado global (Pinia):

- [ ] Implementar gameStore.js con:

-State: day, food, water, health, moral, allowedWoman, gameOver, victory

-Getters: isAlive, displayDay, isHungry

-Actions: applyDecision, consumeDaily, checkGameStatus, resetGame

Sistema de eventos por día:

- [ ] Crear events.js con array de objetos para cada día:

- [ ] Implementar días especiales:

Día 0: Introducción + noticia TV

Día 1: Decisión moral (mujer e hijo)

Día 3: Decisión comida (buscar vs podrida)

Día 5: Medicina (+28 salud)

Día 8: Manual primeros auxilios

Día 11: Ataque de saqueadores

Día 13: Señal de radio

Día 15: Victoria

Eventos aleatorios:

- [ ] Implementar sistema de eventos aleatorios para días sin evento fijo

- [ ] Crear 6-8 eventos genéricos (positivos, negativos, neutrales)

Componentes interactivos:

- [ ] Implementar StoryText.vue con efecto máquina de escribir

- [ ] Implementar sistema de avance por clic/tecla ESPACIO

- [ ] Implementar DecisionButtons.vue (botones dinámicos)

 Objetivo de la semana:
Juego completamente jugable del día 0 al día 25, con todas las decisiones afectando recursos y mostrando consecuencias.

 Lo que se logró completar:
(Se llena al final de la semana)

 Lo que NO se logró:
(Se llena al final de la semana)

 Notas:
(Problemas encontrados, soluciones, cambios de plan)

---

## Semana 4 – Testing y CI/CD
 Tareas planificadas:
### Pruebas unitarias (Vitest):

- [ ] Configurar Vitest en vite.config.js

- [ ] Implementar pruebas para gameStore.js:

- [ ] Verificar que applyDecision modifica recursos correctamente

- [ ] Verificar que consumeDaily funciona con/without refugiados

- [ ] Verificar que checkGameStatus detecta game over y victoria

- [ ] Verificar que resetGame vuelve al estado inicial

### Implementar pruebas para componentes:

- [ ] StatBar.vue: verificar que muestra valores correctos

- [ ] DecisionButtons.vue: verificar que emite eventos

### GitHub Actions (CI/CD):

- [ ] Crear workflow de Linter (.github/workflows/lint.yml):
- [ ] Crear workflow de Testing (.github/workflows/test.yml):

### DockerHub:

- [ ] Crear workflow de Build y Push a DockerHub (.github/workflows/docker.yml):

- [ ] Configurar secrets en GitHub (DOCKER_USERNAME, DOCKER_TOKEN)

## Sonido :

Implementar useAudio.js con Web Audio API

Añadir sonidos: click, damage, victory, game over

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
