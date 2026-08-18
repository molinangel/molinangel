## Nangel

Construyo productos SaaS por suscripción: el cobro recurrente, el backend y el
panel desde el que se opera. Trabajo sobre todo con TypeScript, React y Supabase.

---

### A qué me dedico realmente

La mayor parte de mi trabajo son verticales de servicio con el mismo esqueleto
resuelto de extremo a extremo. Lo que hay debajo de cada uno:

- **Ciclo de suscripción completo con Stripe** — checkout, webhooks, portal del
  cliente, cancelación, ofertas de retención y un proceso de reconciliación que
  vuelve a cuadrar la base cuando un webhook se pierde.
- **Backend sin servidor** en Supabase Edge Functions (Deno) sobre PostgreSQL,
  con las políticas de acceso a nivel de fila.
- **Cumplimiento de RGPD** implementado, no prometido: exportación de los datos
  del usuario y borrado real de la cuenta.
- **Mensajería**: email transaccional, secuencias programadas, notificaciones
  push masivas y verificación por SMS.
- **Multi-idioma** desde el primer día, porque el público no es solo español.

Los modelos de lenguaje aparecen como una función más: llamadas a la API de
Claude o Gemini desde una función de servidor. Integro esas APIs; no entreno
modelos ni investigo sobre ellos. Prefiero decirlo a que se entienda otra cosa.

---

### Cómo trabajo

Desarrollo asistido por modelos. Uso Claude y herramientas de agente para escribir
buena parte del código; mi trabajo está en decidir la arquitectura, escribir la
especificación, revisar lo que sale y comprobar que de verdad funciona. Es la razón
de que pueda sostener varios productos a la vez, y lo digo abiertamente porque es
parte del método y no algo que convenga esconder.

---

### Proyectos

| Proyecto | Mi papel | Qué es |
|---|---|---|
| [Operia](https://github.com/molinangel/Operia) | Autor | SaaS multi-inquilino para negocios de servicios: trabajos, presupuestos que el cliente aprueba desde el móvil y control de cobros. Next.js 16, Prisma, autenticación propia con argon2id |
| [YourCVPassport](https://github.com/diego-landaeta/YourCVPassport) | Autor principal | Currículums con perfil público, exportación a PDF y DOCX y directorio de candidatos |
| [SH](https://github.com/diego-landaeta/SH) | Contribuidor clave | Gestión operativa sobre Supabase |
| [CRM](https://github.com/diego-landaeta/CRM) · [CRM-ISEIE](https://github.com/diego-landaeta/CRM-ISEIE) | Contribuidor | CRM multiproyecto: Express y PostgreSQL detrás, React delante |

También soy autor principal de varios verticales que siguen en repositorios
privados —asistencia legal, veterinaria, nutrición y trabajos académicos—, con el
mismo esqueleto de suscripción y distinto dominio.

---

### Fuera del trabajo

**PROTOCOLO** — party game local para 2 a 4 personas en Unity 6 con URP. La gracia
es que tus tareas están escritas en las fichas de los demás y leer la ficha te
congela en el sitio. Todo el arte se genera por código —texturas, materiales,
personajes y sonidos— y el pipeline está ajustado para una iGPU modesta: luz
horneada, sin sombras en tiempo real, sin HDR ni MSAA.

---

### Herramientas

**A diario** · TypeScript · React · Next.js · Supabase (PostgreSQL, Edge Functions) · Stripe · Tailwind · Vercel

**También** · Node y Express · Prisma · Deno · C# y Unity 6 · PowerShell

---

📫 nangelm.dev@gmail.com
