# Documento de Diseño - [15 dias]

## Integrantes del Grupo
- [Diego Alvarez] 
- [Matias Moraga] 

## Repositorio GitHub
[https://github.com/DiegoUC-01/Solemne2]

---
## Descripción del juego:

### Género:
Aventura narrativa / Survival / Toma de decisiones

### Premisa:
Tras el estallido de una Tercera Guerra Mundial, múltiples potencias lanzaron ataques nucleares que devastaron gran parte del planeta. Las ciudades quedaron reducidas a ruinas, el aire se volvió peligroso de respirar y los recursos básicos comenzaron a escasear rápidamente. La mayoría de la población no sobrevivió.
En este nuevo mundo, los pocos sobrevivientes deben refugiarse en estructuras improvisadas para resistir las condiciones extremas del entorno: radiación, contaminación, enfermedades y la constante amenaza de otros humanos desesperados.

El jugador asume el rol de un sobreviviente que ha logrado resguardarse en un refugio, Desde allí, deberá tomar decisiones críticas día a día para mantenerse con vida, administrar recursos limitados como comida, agua y suministros médicos, y enfrentar eventos impredecibles que pondrán a prueba su juicio y moral.

Cada decisión tendrá consecuencias, y no siempre existirá una opción correcta. El objetivo es sobrevivir la mayor cantidad de días posible con un límite de 15 días para la victoria

### Mecánicas del Juego

El juego se basa en un sistema de supervivencia por días, donde el jugador debe tomar decisiones estratégicas tras cada evento que suceda para mantenerse con vida y administrar sus suministros hasta el día 15. Cada evento puede traer beneficios o provocar perdidas, los recursos que se deben administrar es la comida, agua, salud y moral, que van restando cada día y según las decisiones que tomes Si tu salud y moral llegan a 0 pierdes, el resto de los recursos si llegan a 0, la vida bajara cada día hasta que la salud llegue a 0, por eso es importante tener siempre comida, agua y moral.
### Sistema de Recursos

| Recurso | Rango inicial | Rango máximo | ¿Qué representa? | Efecto si llega a 0 |
|---------|---------------|--------------|------------------|---------------------|
|  Comida | 6 | 20 | Alimento disponible | -12 salud por día |
|  Agua | 4 | 20 | Hidratación | -15 salud por día |
|  Salud | 80 | 100 | Condición física | Game Over |
|  Moral | 70 | 100 | Salud mental | Game Over (depresión) |

---
## 1. Mockups de Pantallas Principales

### Pantalla 1: Inicio / Día 0 (Noticia en TV)
<img width="1901" height="1065" alt="image" src="https://github.com/user-attachments/assets/b0f8c0c8-dd36-4218-860c-bec558fb8f36" />

### Pantalla 2: Juego (Día con Decisión)
<img width="1886" height="1062" alt="image" src="https://github.com/user-attachments/assets/6c098853-d8e6-4ca2-aa0d-a2fc53629898" />


### Pantalla 4: Game Over
<img width="1884" height="1050" alt="image" src="https://github.com/user-attachments/assets/4200dfb3-980c-49c6-8520-516b6ae27d83" />

---

## 2. Especificaciones de Tecnología

### Framework elegido: **Vue.js 3 + Pinia**

**Justificación:**

### Justificación del Framework Elegido: Vue.js 3 + Pinia

La elección de **Vue.js 3** como framework principal se justifica por varios criterios. En primer lugar, su **reactividad nativa** permite que los cambios en recursos como comida, agua, salud y moral actualicen automáticamente la interfaz de usuario sin necesidad de código adicional. Además, **Pinia** se integra perfectamente para el manejo del **estado global** del juego (día, recursos, decisiones, refugiados), centralizando los datos y evitando el paso manual de props entre componentes.

La **Composition API** de Vue.js 3 permite organizar la lógica por funcionalidad (por ejemplo, `useAudio` para los sonidos 8-bit y `useTypingEffect` para el texto dinámico), facilitando la reutilización de código y el mantenimiento del proyecto. La **comunidad y documentación** de Vue.js son extensas y activas, lo que garantiza soporte y soluciones rápidas a problemas comunes.

Finalmente, el uso de **Vue.js es un requisito obligatorio** del proyecto, por lo que su elección está formalmente justificada dentro de la asignatura.

### Justificación de Frameworks Visuales: NES.css + Pixelium Design

La combinación de **NES.css** y **Pixelium Design** se adapta perfectamente al propósito de crear un juego estilo retro por las siguientes razones:

**NES.css** reproduce el estilo visual de la consola Nintendo NES (8 bits), incorporando botones, fuentes, contenedores y efectos visuales que eran típicos en la década de 1980/1990. El jugador se mantiene en la estética retro y la ambientación se refuerza gracias a sus bordes pixelados, sus sombras definidas y sus iconos de estrella y corazón. A su vez, **Pixelium Design** está diseñado con el propósito de crear interfaces de usuario de estilo pixel art, ofreciendo componentes que aseguran la uniformidad visual a lo largo del juego.  

#### Facilidad de implementación y compatibilidad

**NES.css** solo requiere importar el archivo CSS y agregar clases HTML, sin necesidad de JavaScript adicional ni configuración compleja. Al ser puramente CSS, es 100% compatible con Vue.js 3 y no genera conflictos con la reactividad del framework. **Pixelium Design**, por su parte, proporciona componentes Vue 3 listos para usar (`<px-button>`, `<px-card>`), con props y eventos ya definidos, lo que acelera el desarrollo. Está desarrollado específicamente para Vue.js 3 Composition API, con soporte TypeScript nativo y optimizado para el ecosistema Vue.

### Estructura de carpetas propuesta:

```
Proyecto/
├── index.html
├── package.json
├── vite.config.js
├── Dockerfile
├── .gitignore
├── .github/
│   └── workflows/
│       ├── lint.yml
│       └── test.yml
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── components/
│   │   ├── StatBar.vue
│   │   ├── StoryText.vue
│   │   ├── DecisionButtons.vue
│   │   ├── PixelBackground.vue
│   │   └── minigames/
│   │       ├── FindCansGame.vue
│   │       └── CatchRainGame.vue
│   ├── stores/
│   │   └── gameStore.js
│   ├── composables/
│   │   ├── useAudio.js
│   │   └── useTypingEffect.js
│   ├── data/
│   │   └── events.js
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   └── tests/
│       └── gameStore.spec.js
└── public/
    └── sounds/
```

### Dependencias principales:

| Dependencia | Versión | Propósito |
|-------------|---------|-----------|
| `vue` | ^3.5.0 | Framework principal |
| `pinia` | ^2.1.0 | Estado global | 
| `nes.css` | ^2.3.0 | Framework CSS retro (NES) | 
| `@pixelium/web-vue` | ^0.1.4 | Componentes pixel art para Vue (Pixelium Design) | 
| `vite` | ^8.0.0 | Build tool | 
| `vitest` | ^4.0.0 | Testing unitario |
| `@vue/test-utils` | ^2.4.6 | Utilidades para testing de Vue | 
| `jsdom` | ^29.0.0 | DOM para pruebas | 
| `oxlint` | ^0.15.0 | Linter ultra-rápido |


### Frameworks Visuales :

#### **NES.css** - Framework CSS estilo Nintendo NES
Componentes útiles:

- nes-container - Contenedores estilo retro

- nes-btn - Botones 8-bit

- nes-icon heart - Iconos de corazón

- nes-progress - Barras de progreso

Pixelium Design - Componentes pixel art para Vue 3:

Componentes útiles:

- px-card - Tarjetas con borde pixel

- px-button - Botones con efecto click

- px-progress - Barras de estadísticas

Google Fonts (tipografía retro):

```
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet">
```