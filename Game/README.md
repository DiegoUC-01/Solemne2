# 15 Días — Juego de Supervivencia

> *Toma de decisiones en un mundo post-apocalíptico. Cada elección tiene consecuencias.*

Desarrollado por **Diego Alvarez** y **Matias Moraga**.

---

## Descripción

Tras el estallido de una epidemia global, las calles quedaron vacías y el caos se apoderó de la ciudad. Como sobreviviente refugiado en tu hogar, debes tomar decisiones críticas **día a día** durante 15 días, hasta que llegue el operativo de rescate.

Cada decisión afecta tus recursos: **comida, agua, salud y moral**. No siempre existe una opción correcta. El objetivo es simple: **sobrevivir**.

---

## Mecánicas del Juego

El juego avanza por días. En cada uno ocurre un evento narrativo al que debes responder eligiendo entre dos opciones. Tus recursos se consumen diariamente y las consecuencias de tus decisiones se acumulan.

### Sistema de Recursos

| Recurso | Valor Inicial | Máximo | Efecto si llega a 0 |
|---------|:---:|:---:|---------------------|
|  Comida | 6 | 20 | −12 salud por día |
|  Agua | 4 | 20 | −15 salud por día |
|  Salud | 80 | 100 | **Game Over** |
|  Moral | 70 | 100 | **Game Over** (depresión) |

### Minijuegos

En los días 5, 10 y 15 aparecen minijuegos interactivos que ponen a prueba tus reflejos:

- **Día 5 — Buscar latas:** Encuentra latas escondidas en el supermercado antes de que se acabe el tiempo.
- **Día 10 — Atrapar lluvia:** Mueve el balde para recolectar agua de lluvia.
- **Día 15 — Escape:** El rescate llegó. No lo pierdas.

---

## Tecnologías

| Tecnología | Propósito |
|------------|-----------|
| Vue.js 3 (Composition API) | Framework principal |
| Pinia | Estado global del juego |
| Vite | Build tool |
| NES.css | Estilos retro estilo Nintendo NES |
| Pixelium Design | Componentes pixel art para Vue 3 |
| Web Audio API | Sistema de audio 8-bit |
| Vitest | Testing unitario |
| oxlint | Linter |
| Docker | Containerización |

---

## Instalación y Ejecución Local

### Prerrequisitos

- Node.js 20+
- pnpm

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/DiegoUC-01/Solemne2.git
cd Solemne2/Game

# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm dev
```

Luego abre tu navegador en `http://localhost:5173`.

### Build de producción

```bash
pnpm build
pnpm preview
```

---

## Ejecución con Docker

```bash
# Construir la imagen
docker build -t 15-dias .

# Ejecutar el contenedor
docker run -p 5173:5173 15-dias
```

Luego abre tu navegador en `http://localhost:5173`.

---

## Testing

```bash
# Ejecutar pruebas una vez
pnpm test

# Ejecutar pruebas en modo watch
pnpm test:watch

# Ver cobertura de código
pnpm test:coverage
```

Las pruebas verifican el comportamiento del `gameStore`: aplicación de decisiones, consumo diario de recursos, detección de game over/victoria y reinicio del juego.

---

## Estructura del Proyecto

```
Game/
├── index.html
├── package.json
├── vite.config.js
├── Dockerfile
└── src/
    ├── main.js
    ├── App.vue
    ├── components/
    │   ├── StatBar.vue
    │   ├── StoryText.vue
    │   ├── DecisionButtons.vue
    │   ├── PixelBackground.vue
    │   ├── SceneArt.vue
    │   └── minigames/
    │       ├── CatchRainGame.vue
    │       ├── FindcansGame.vue
    │       └── EscapeGame.vue
    ├── stores/
    │   └── gameStore.js
    ├── composables/
    │   └── useAudio.js
    ├── data/
    │   └── events.js
    ├── assets/
    │   ├── Imagen/
    │   └── styles/
    │       └── retro.css
    └── tests/
        └── gameStore.spec.js
```

---

## Links

- **Repositorio:** [github.com/DiegoUC-01/Solemne2](https://github.com/DiegoUC-01/Solemne2)

---

*Proyecto desarrollado como Solemne 2 — 2026*
