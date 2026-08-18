<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/hero-light.svg">
  <img alt="Nangel — he construido productos SaaS de extremo a extremo" src="assets/hero-light.svg" width="100%">
</picture>

<br>

He construido productos SaaS de extremo a extremo: del esquema de la base de datos al cobro
recurrente, pasando por el backend, el panel de administración y la app que usa el cliente.
Seis de ellos tienen un modelo de lenguaje en el núcleo. Ahora estoy además con un juego en
Unity, que no se parece en nada a lo anterior y justo por eso me interesa.

---

## Productos con modelos de lenguaje

No es llamar a una API y pintar la respuesta. Casi todo el trabajo está alrededor del modelo:

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/arquitectura-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/arquitectura-light.svg">
  <img alt="Recorrido de un turno: la app manda la petición a una edge function que valida el JWT, resume el tramo antiguo del hilo y elige el modelo; la respuesta vuelve al navegador en streaming" src="assets/arquitectura-light.svg" width="100%">
</picture>

Los pasos que dan trabajo de verdad son el **2** y el **3**. El segundo mantiene la memoria de
la conversación con un resumen rodante que absorbe al anterior: la ventana de contexto deja de
crecer y el historial entero no viaja en cada turno. Si un resumen sale degenerado se rechaza y
se reintenta al turno siguiente, en vez de contaminar el hilo para siempre. El tercero decide
qué modelo atiende cada cosa —uno pequeño comprime, renombra hilos y clasifica; el grande solo
entra donde se nota—, que es de donde sale la mayor parte del ahorro.

| Producto | Mi papel | Qué es |
|---|---|---|
| **[YourCVPassport](https://github.com/diego-landaeta/YourCVPassport)** | `Autor principal` | Currículums con perfil público, optimización del contenido con modelo, exportación a PDF y DOCX y directorio de candidatos |
| **Nutrición** · *privado* | `Autor principal` | Acompañamiento por chat con streaming, detección de objetivos, rachas y tareas generadas. El mayor de los seis: 28 funciones de servidor |
| **Asistencia legal** · *privado* | `Autor principal` | Análisis inicial del caso, preguntas guiadas y chat legal sobre plantillas administradas |
| **Veterinaria** · *privado* | `Autor principal` | Consulta asistida con recordatorios, informes en PDF y facturación |
| **Trabajos académicos** · *privado* | `Autor principal` | Editor enriquecido con fórmulas, tablas y diagramas, y exportación a DOCX y PPTX |
| **Tarot** · *privado* | `Autor principal` | Interpretación generada, numerología y horóscopo, con campañas y notificaciones |

> [!NOTE]
> Para ser preciso: **integro APIs de modelos** (Claude, Gemini) y construyo el producto
> alrededor —contexto, coste, streaming, fallos y permisos—. No entreno modelos ni investigo
> sobre ellos, y prefiero decirlo a que se entienda otra cosa.

---

## Plataforma, cobro y operación

Debajo de cada uno de esos productos hay el mismo esqueleto, resuelto entero:

| Pieza | Cómo está resuelta |
|---|---|
| **Suscripción con Stripe** | Checkout, webhooks, portal del cliente, cancelación, ofertas de retención y un proceso de reconciliación que vuelve a cuadrar la base cuando un webhook se pierde |
| **Backend sin servidor** | Supabase Edge Functions sobre Deno y PostgreSQL, con políticas de acceso a nivel de fila |
| **RGPD** | Implementado, no prometido: exportación de los datos del usuario y borrado real de la cuenta |
| **Mensajería** | Email transaccional, secuencias programadas, notificaciones push masivas y verificación por SMS |
| **Multi-idioma** | Desde el primer día, porque el público no es solo español |

Y fuera de los verticales, plataforma pura:

| Proyecto | Mi papel | Qué es |
|---|---|---|
| **[Operia](https://github.com/molinangel/Operia)** | `Autor` | SaaS multi-inquilino para negocios de servicios: trabajos, presupuestos que el cliente aprueba desde el móvil y control de cobros.<br>`Next.js 16` · `Prisma` · autenticación propia con argon2id |
| **[SH](https://github.com/diego-landaeta/SH)** | `Contribuidor clave` | Gestión operativa sobre Supabase.<br>`React` · `shadcn/ui` · `PostgreSQL` |
| **[CRM](https://github.com/diego-landaeta/CRM)** · **[CRM-ISEIE](https://github.com/diego-landaeta/CRM-ISEIE)** | `Contribuidor` | CRM multiproyecto con backend propio.<br>`Express` · `PostgreSQL` · `React` · `S3` |

---

## Y algo que no se parece en nada: PROTOCOLO

*Party game* local en **Unity 6** para 2 a 4 personas en la misma sala. C# en vez de TypeScript,
y milisegundos por fotograma en vez de peticiones por segundo. La regla de la casa es esta:

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/anillo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/anillo-light.svg">
  <img alt="Reparto en anillo: el objetivo A de cada operario lo lleva el siguiente y el objetivo B el anterior, de modo que nadie ve su propia tarea" src="assets/anillo-light.svg" width="100%">
</picture>

| | |
|---|---|
| **Todo el arte por código** | Texturas, materiales, personajes y los cuatro sonidos se generan en tiempo de montaje. Ni un asset descargado |
| **Ajustado a una iGPU modesta** | Luz horneada, sin sombras en tiempo real, sin HDR ni MSAA. El presupuesto son 8,3 ms por fotograma |
| **Compila sin abrir Unity** | Montaje, horneado de luz y ejecutable desde línea de comandos, en modo batch |

---

## Cómo trabajo

Desarrollo asistido por modelos. Uso Claude y herramientas de agente para escribir buena parte
del código; mi trabajo está en **decidir la arquitectura, escribir la especificación, revisar lo
que sale y comprobar que de verdad funciona**. Es la razón de que pueda sostener varios productos
a la vez, y lo digo abiertamente porque es parte del método y no algo que convenga esconder.

---

## Herramientas

**A diario**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=0d1117)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=0d1117)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Deno](https://img.shields.io/badge/Deno-70FFAF?style=flat-square&logo=deno&logoColor=0d1117)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white)
![Claude](https://img.shields.io/badge/Claude%20API-D97757?style=flat-square&logo=anthropic&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

**También**

![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![C#](https://img.shields.io/badge/C%23-512BD4?style=flat-square&logo=csharp&logoColor=white)
![Unity](https://img.shields.io/badge/Unity-000000?style=flat-square&logo=unity&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-8E75B2?style=flat-square&logo=googlegemini&logoColor=white)
![PowerShell](https://img.shields.io/badge/PowerShell-5391FE?style=flat-square&logo=powershell&logoColor=white)

**He tocado, sin llamarme experto**

![Unreal Engine](https://img.shields.io/badge/Unreal%20Engine-0E1128?style=flat-square&logo=unrealengine&logoColor=white)
![Blender](https://img.shields.io/badge/Blender-E87D0D?style=flat-square&logo=blender&logoColor=white)

---

<div align="center">

**¿Hablamos?**

[![Email](https://img.shields.io/badge/nangelm.dev@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:nangelm.dev@gmail.com)
[![GitHub](https://img.shields.io/badge/@molinangel-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/molinangel)

</div>
