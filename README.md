# 🎮 EscuelaSQL — Aprende Consultas SQL Jugando

> **Plataforma web interactiva y gamificada para aprender consultas SQL (`SELECT`), diseñada especialmente para contadores y profesionales financieros sin experiencia en programación.**  
> Diseñada para desplegarse **100% gratis en Vercel** gracias a su arquitectura cliente con SQLite WebAssembly (`sql.js`).

---

## 🌟 Características Principales

- **💡 Orientado al Mundo Contable**: Ejemplos con tablas y casos de uso cotidianos (`clientes`, `facturas`, `productos`, `empleados`, `nómina`, NITs colombianos).
- **🔒 Solo Consultas de Lectura (`SELECT`)**: Validador de seguridad integrado que bloquea comandos destructivos (`DROP`, `DELETE`, `UPDATE`, `INSERT`, etc.). ¡Cero riesgo de dañar datos!
- **⚡ Motor SQL en el Navegador**: Utiliza `sql.js` (SQLite compilado a WebAssembly). Todo se procesa en el cliente:
  - Sin servidor de base de datos ni latencia.
  - Costo de infraestructura: **$0.00** en Vercel Free Tier.
- **🏆 Gamificación Completa**:
  - Puntos de experiencia (**XP**) basados en eficiencia e intentos.
  - Vidas por nivel (3 corazones).
  - Pistas progresivas con descuento balanceado de XP.
  - Racha de días de estudio consecutivos.
  - Sistema de rangos: *Pasante → Auxiliar → Analista → Contador → Auditor → CFO*.
  - Logros desbloqueables e insignias.
- **🧪 Sandbox Libre**: Espacio para experimentar y probar cualquier consulta SQL sobre las bases de datos de contabilidad y nómina.
- **📖 Referencia Rápida con Buscador**: Cheat sheet con ejemplos reales, sintaxis y consejos contables prácticos.

---

## 📚 Módulos de Aprendizaje

1. 🟢 **Módulo 1: SELECT Básico** — Obtener columnas, uso de `*`, alias (`AS`) y operaciones.
2. 🟢 **Módulo 2: WHERE (Filtros)** — Condicionales `=`, `>`, `<`, `AND`, `OR`, `BETWEEN`, `IN`, `LIKE`.
3. 🟡 **Módulo 3: ORDER BY y LIMIT** — Orden ascendente/descendente, top de ventas y ordenamiento múltiple.
4. 🟡 **Módulo 4: Funciones de Agregación** — `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` para balances y totales.
5. 🟠 **Módulo 5: GROUP BY** — Agrupación de datos para resúmenes contables por ciudad, categoría o mes.
6. 🟠 **Módulo 6: HAVING** — Filtros sobre métricas agrupadas y consolidados.
7. 🔴 **Módulo 7: JOINs** — Cruzar facturas con clientes, departamentos con empleados (`INNER JOIN`, `LEFT JOIN`).
8. 🔴 **Módulo 8: Subconsultas** — Consultas anidadas para comparar contra promedios y listas dinámicas.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|---|---|
| **Framework** | Next.js 15+ (App Router, Turbopack) |
| **Lenguaje** | TypeScript |
| **Estilos** | Tailwind CSS 4 |
| **Motor SQL** | `sql.js` (SQLite en WebAssembly / WASM) |
| **Gestión de Estado** | Zustand + Middleware de Persistencia (`localStorage`) |
| **Iconografía** | Lucide React |

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
- Node.js 18+ instalado.

### Pasos
1. Clonar el repositorio o ingresar al directorio:
   ```bash
   cd escuelasql
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir en el navegador:
   ```
   http://localhost:3000
   ```

5. Para crear un build de producción y probarlo:
   ```bash
   npm run build
   npm run start
   ```

---

## ☁️ Despliegue Gratis en Vercel

1. Sube este proyecto a tu cuenta de **GitHub**.
2. Ingresa a [Vercel](https://vercel.com/) e inicia sesión.
3. Haz clic en **"Add New Project"** e importa tu repositorio.
4. Vercel detectará la configuración de **Next.js** automáticamente.
5. Haz clic en **"Deploy"**.

> **¿Por qué es 100% gratis?**  
> Vercel solo sirve el código estático y los assets (`sql-wasm.wasm`). Todas las consultas SQL corren en la memoria del navegador del usuario. No se consumen ejecuciones serverless ni bases de datos de pago.

---

## 📂 Estructura del Código

```text
escuelasql/
├── public/
│   └── sql-wasm.wasm           # Binario WebAssembly de SQLite
├── src/
│   ├── app/                    # Rutas de Next.js (App Router)
│   │   ├── jugar/              # Módulos y niveles de juego
│   │   ├── progreso/           # Dashboard de estadísticas y logros
│   │   ├── referencia/         # Cheat sheet interactivo de SQL
│   │   ├── sandbox/            # Editor libre de consultas
│   │   ├── layout.tsx          # Layout con Header y Footer
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── game/               # SqlEditor, ResultTable, HintPanel, LevelComplete...
│   │   ├── layout/             # Header, Footer
│   │   └── ui/                 # Button, Card, ProgressBar, Badge, Modal
│   ├── data/
│   │   ├── modules/            # Definición de los 8 módulos y sus niveles
│   │   ├── schemas/            # Esquemas SQL (contabilidad, nómina)
│   │   └── seeds/              # Datos de prueba realistas
│   ├── hooks/
│   │   ├── useSqlEngine.ts     # Hook conector con WebAssembly
│   │   └── useLevel.ts         # Hook de gestión de niveles
│   ├── lib/
│   │   ├── game/               # Algoritmo de scoring y logros
│   │   ├── sql/                # Motor SQL, validador de seguridad, comparador
│   │   └── utils/              # Constantes de rangos y utilidades CSS
│   ├── stores/                 # Zustand stores (useGameStore, useProgressStore)
│   └── types/                  # Definiciones TypeScript de juego y SQL
```

---

## 📄 Licencia

MIT — Libre para uso educativo y personal.
