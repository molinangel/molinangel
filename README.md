<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/banner-light.svg">
  <img alt="Nangel — he construido productos SaaS de extremo a extremo" src="assets/banner-light.svg" width="100%">
</picture>

<br><br>

![Claude](https://img.shields.io/badge/Claude%20API-D97757?style=flat-square&logo=anthropic&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-8E75B2?style=flat-square&logo=googlegemini&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=0d1117)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=0d1117)
![Deno](https://img.shields.io/badge/Deno-70FFAF?style=flat-square&logo=deno&logoColor=0d1117)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![C#](https://img.shields.io/badge/C%23-512BD4?style=flat-square&logo=csharp&logoColor=white)
![Unity](https://img.shields.io/badge/Unity-000000?style=flat-square&logo=unity&logoColor=white)

</div>

He construido productos SaaS de extremo a extremo: del esquema de la base de datos al cobro
recurrente, pasando por el backend, el panel de administración y la app que usa el cliente.
Seis de ellos tienen un modelo de lenguaje en el núcleo. Ahora estoy además con un juego en
Unity, que no se parece en nada a lo anterior y justo por eso me interesa.

---

## 🧠 Productos con modelos de lenguaje

No es llamar a una API y pintar la respuesta. Lo que hay que resolver de verdad está
alrededor del modelo:

| | |
|---|---|
| 🔴 **Streaming propio** | Transformo el SSE de Anthropic a un formato de eventos más simple para el cliente, con corte limpio y errores que llegan por el mismo canal. |
| 🧵 **Memoria de conversación** | Resumen rodante del tramo antiguo del hilo, que absorbe el resumen anterior. La ventana de contexto deja de crecer y el historial completo no viaja en cada turno. |
| 💸 **Enrutado por tarea** | Un modelo pequeño para comprimir, renombrar hilos y clasificar; el grande solo para lo que lo necesita. El coste por conversación baja sin que se note en la respuesta. |
| 🧱 **Salidas de confianza** | Extracción estructurada de objetivos y generación de tareas, con validación: un resumen degenerado se rechaza y se reintenta en vez de contaminar el hilo. |
| 🔐 **Cada llamada es del usuario** | Validación de JWT en la función y escritura sujeta a políticas de acceso a nivel de fila. Nada de una clave de servicio compartida. |

<table>
<tr><th align="left">Producto</th><th align="left">Mi papel</th><th align="left">Qué es</th></tr>

<tr>
<td><a href="https://github.com/diego-landaeta/YourCVPassport"><b>YourCVPassport</b></a></td>
<td><code>Autor principal</code></td>
<td>Currículums con perfil público, optimización del contenido con modelo, exportación a PDF y DOCX y directorio de candidatos.</td>
</tr>

<tr>
<td><b>Nutrición</b> <sub>· privado</sub></td>
<td><code>Autor principal</code></td>
<td>Acompañamiento por chat con streaming, detección de objetivos, rachas y tareas generadas. El más grande de los seis: 28 funciones de servidor.</td>
</tr>

<tr>
<td><b>Asistencia legal</b> <sub>· privado</sub></td>
<td><code>Autor principal</code></td>
<td>Análisis inicial del caso, preguntas guiadas y chat legal sobre plantillas administradas.</td>
</tr>

<tr>
<td><b>Veterinaria</b> <sub>· privado</sub></td>
<td><code>Autor principal</code></td>
<td>Consulta asistida con recordatorios, informes en PDF y facturación.</td>
</tr>

<tr>
<td><b>Trabajos académicos</b> <sub>· privado</sub></td>
<td><code>Autor principal</code></td>
<td>Editor enriquecido con fórmulas, tablas y diagramas, y exportación a DOCX y PPTX.</td>
</tr>

<tr>
<td><b>Tarot</b> <sub>· privado</sub></td>
<td><code>Autor principal</code></td>
<td>Interpretación generada, numerología y horóscopo, con campañas y notificaciones.</td>
</tr>
</table>

> [!NOTE]
> Para ser preciso: **integro APIs de modelos** (Claude, Gemini) y construyo el producto
> alrededor —contexto, coste, streaming, fallos y permisos—. No entreno modelos ni investigo
> sobre ellos, y prefiero decirlo a que se entienda otra cosa.

---

## 🧱 Plataforma, cobro y operación

Debajo de cada uno de esos productos hay el mismo esqueleto, resuelto entero:

| | |
|---|---|
| 💳 **Suscripción completa con Stripe** | Checkout, webhooks, portal del cliente, cancelación, ofertas de retención y un proceso de reconciliación que vuelve a cuadrar la base cuando un webhook se pierde. |
| ⚡ **Backend sin servidor** | Supabase Edge Functions sobre Deno y PostgreSQL, con políticas de acceso a nivel de fila. |
| 🛡️ **RGPD implementado, no prometido** | Exportación de los datos del usuario y borrado real de la cuenta. |
| 📬 **Mensajería** | Email transaccional, secuencias programadas, notificaciones push masivas y verificación por SMS. |
| 🌍 **Multi-idioma desde el día uno** | Porque el público no es solo español. |

Y fuera de los verticales, plataforma pura:

<table>
<tr><th align="left">Proyecto</th><th align="left">Mi papel</th><th align="left">Qué es</th></tr>

<tr>
<td><a href="https://github.com/molinangel/Operia"><b>Operia</b></a></td>
<td><code>Autor</code></td>
<td>SaaS multi-inquilino para negocios de servicios: trabajos, presupuestos que el cliente aprueba desde el móvil y control de cobros.<br><sub>Next.js 16 · Prisma · autenticación propia con argon2id</sub></td>
</tr>

<tr>
<td><a href="https://github.com/diego-landaeta/SH"><b>SH</b></a></td>
<td><code>Contribuidor clave</code></td>
<td>Gestión operativa sobre Supabase.<br><sub>React · shadcn/ui · PostgreSQL</sub></td>
</tr>

<tr>
<td><a href="https://github.com/diego-landaeta/CRM"><b>CRM</b></a> · <a href="https://github.com/diego-landaeta/CRM-ISEIE">CRM-ISEIE</a></td>
<td><code>Contribuidor</code></td>
<td>CRM multiproyecto con backend propio.<br><sub>Express · PostgreSQL · React · S3</sub></td>
</tr>
</table>

---

## 🎮 Y algo que no se parece en nada: PROTOCOLO

*Party game* local en **Unity 6** para 2 a 4 personas en la misma sala. **Tus tareas están
escritas en las fichas de los demás**, y leer la ficha te congela en el sitio: hay que fiarse
de que el otro te lea bien y a tiempo. C# en vez de TypeScript, y milisegundos por fotograma
en vez de peticiones por segundo.

<table>
<tr>
<td width="50%">

**Reparto en anillo**
El objetivo A de cada jugador lo lleva el siguiente y el B el anterior. Nadie ve nunca su
propia tarea, y el invariante se verifica en ejecución.

</td>
<td width="50%">

**Todo el arte por código**
Texturas, materiales, personajes y los cuatro sonidos se generan en tiempo de montaje.
Ni un asset descargado.

</td>
</tr>
<tr>
<td>

**Ajustado a una iGPU modesta**
Luz horneada, sin sombras en tiempo real, sin HDR ni MSAA. El presupuesto son 8,3 ms
por fotograma.

</td>
<td>

**Compila sin abrir Unity**
Montaje, horneado de luz y ejecutable desde línea de comandos en modo batch.

</td>
</tr>
</table>

---

## ⚙️ Cómo trabajo

Desarrollo asistido por modelos. Uso Claude y herramientas de agente para escribir buena parte
del código; mi trabajo está en **decidir la arquitectura, escribir la especificación, revisar lo
que sale y comprobar que de verdad funciona**. Es la razón de que pueda sostener varios productos
a la vez, y lo digo abiertamente porque es parte del método y no algo que convenga esconder.

---

<div align="center">

### 📫 Hablemos

[![Email](https://img.shields.io/badge/nangelm.dev@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:nangelm.dev@gmail.com)
[![GitHub](https://img.shields.io/badge/@molinangel-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/molinangel)

</div>
