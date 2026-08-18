// Genera las cuatro imagenes del README de perfil: cabecera y diagrama de
// arquitectura, cada una en version clara y oscura. Un solo generador para que
// las dos versiones no se desincronicen al retocar una.
const fs = require('fs');
const path = require('path');

const SALIDA = path.join(__dirname, 'assets');

const TEMAS = {
  dark: {
    fondo: '#0d1117', caja: '#161b22', borde: '#30363d',
    texto: '#e6edf3', tenue: '#8b949e', acento: '#3fcf8e',
    calido: '#e0855f', rejilla: '#21262d', pastilla: '#1c2128',
  },
  light: {
    fondo: '#ffffff', caja: '#f6f8fa', borde: '#d1d9e0',
    texto: '#1f2328', tenue: '#59636e', acento: '#0f9d6b',
    calido: '#c2410c', rejilla: '#eaeef2', pastilla: '#eef1f4',
  },
};

const SANS = "Inter, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, 'Cascadia Mono', Consolas, monospace";

// --- Cabecera -------------------------------------------------------------

function cabecera(t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="240" viewBox="0 0 1000 240" role="img" aria-label="Nangel — he construido productos SaaS de extremo a extremo">
  <defs>
    <linearGradient id="velo" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${t.acento}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${t.acento}" stop-opacity="0.10"/>
    </linearGradient>
    <pattern id="puntos" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="${t.rejilla}"/>
    </pattern>
    <!-- Sin esta mascara la trama arranca de golpe y deja una costura vertical. -->
    <linearGradient id="desvanecido" x1="0" y1="0" x2="1" y2="0">
      <stop offset="35%" stop-color="#000000"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
    <mask id="mascara">
      <rect width="1000" height="240" fill="url(#desvanecido)"/>
    </mask>
  </defs>

  <rect width="1000" height="240" rx="12" fill="${t.fondo}"/>
  <rect width="1000" height="240" fill="url(#puntos)" mask="url(#mascara)"/>
  <rect width="1000" height="240" fill="url(#velo)"/>
  <rect x="0" y="0" width="5" height="240" rx="2.5" fill="${t.acento}"/>

  <text x="56" y="98" font-family="${SANS}" font-size="58" font-weight="700" fill="${t.texto}" letter-spacing="-1.6">Nangel</text>
  <text x="58" y="140" font-family="${SANS}" font-size="21" font-weight="500" fill="${t.tenue}">He construido productos SaaS de extremo a extremo</text>
  <rect x="58" y="162" width="34" height="2.5" rx="1.25" fill="${t.acento}"/>
  <text x="58" y="192" font-family="${MONO}" font-size="14" fill="${t.acento}" letter-spacing="1">LLM &#183; TypeScript &#183; React &#183; Supabase &#183; Stripe &#183; Unity</text>

  <g transform="translate(748,86)">
    <rect x="0"   y="0" width="52" height="52" rx="8" fill="none" stroke="${t.acento}" stroke-width="2.4"/>
    <rect x="68"  y="0" width="52" height="52" rx="8" fill="${t.acento}" opacity="0.20"/>
    <rect x="136" y="0" width="52" height="52" rx="8" fill="none" stroke="${t.acento}" stroke-width="2.4" opacity="0.45"/>
    <path d="M52 26 h16 M120 26 h16" stroke="${t.acento}" stroke-width="2.4" opacity="0.6"/>
  </g>
</svg>`;
}

// --- Diagrama de arquitectura --------------------------------------------

function caja(t, x, y, w, h, titulo, sub, resaltada) {
  const trazo = resaltada ? t.acento : t.borde;
  const grosor = resaltada ? 2 : 1.5;
  const cy = sub ? y + h / 2 - 6 : y + h / 2 + 6;
  return `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${t.caja}" stroke="${trazo}" stroke-width="${grosor}"/>
    <text x="${x + w / 2}" y="${cy}" text-anchor="middle" font-family="${SANS}" font-size="19" font-weight="600" fill="${t.texto}">${titulo}</text>
    ${sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 18}" text-anchor="middle" font-family="${MONO}" font-size="13" fill="${t.tenue}">${sub}</text>` : ''}
  </g>`;
}

function pastilla(t, x, y, w, num, etiqueta) {
  return `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="34" rx="17" fill="${t.pastilla}" stroke="${t.borde}" stroke-width="1"/>
    <circle cx="${x + 19}" cy="${y + 17}" r="9" fill="${t.acento}" opacity="0.22"/>
    <text x="${x + 19}" y="${y + 22}" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="700" fill="${t.acento}">${num}</text>
    <text x="${x + 36}" y="${y + 22}" font-family="${SANS}" font-size="14.5" fill="${t.texto}">${etiqueta}</text>
  </g>`;
}

function diagrama(t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="450" viewBox="0 0 1000 450" role="img" aria-label="Recorrido de un turno de conversacion: la app manda la peticion a una edge function que valida la sesion, resume el historial y elige el modelo; la respuesta vuelve en streaming">
  <defs>
    <marker id="punta" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${t.tenue}"/>
    </marker>
    <marker id="puntaAcento" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${t.acento}"/>
    </marker>
  </defs>

  <rect width="1000" height="450" rx="12" fill="${t.fondo}"/>

  <text x="40" y="38" font-family="${MONO}" font-size="13" fill="${t.tenue}" letter-spacing="1.4">UN TURNO DE CONVERSACI&#211;N</text>

  ${caja(t, 40, 150, 175, 86, 'App React', 'navegador')}
  ${caja(t, 315, 118, 310, 190, '', '', true)}
  <text x="470" y="150" text-anchor="middle" font-family="${SANS}" font-size="19" font-weight="600" fill="${t.texto}">Edge Function</text>
  <text x="470" y="169" text-anchor="middle" font-family="${MONO}" font-size="12.5" fill="${t.tenue}">Deno &#183; Supabase</text>
  ${pastilla(t, 337, 184, 266, '1', 'valida el JWT del usuario')}
  ${pastilla(t, 337, 224, 266, '2', 'resume el tramo antiguo')}
  ${pastilla(t, 337, 264, 266, '3', 'elige modelo seg&#250;n la tarea')}

  ${caja(t, 725, 150, 235, 86, 'Claude &#183; Gemini', 'API del modelo')}

  <path d="M 215 193 H 305" stroke="${t.tenue}" stroke-width="2" fill="none" marker-end="url(#punta)"/>
  <text x="260" y="182" text-anchor="middle" font-family="${MONO}" font-size="12" fill="${t.tenue}">petici&#243;n</text>

  <path d="M 625 193 H 715" stroke="${t.tenue}" stroke-width="2" fill="none" marker-end="url(#punta)"/>
  <text x="670" y="182" text-anchor="middle" font-family="${MONO}" font-size="12" fill="${t.tenue}">+ resumen</text>

  <path d="M 842 150 V 78 H 128 V 140" stroke="${t.acento}" stroke-width="2.2" fill="none" stroke-dasharray="7 5" marker-end="url(#puntaAcento)"/>
  <rect x="392" y="63" width="216" height="28" rx="14" fill="${t.fondo}"/>
  <text x="500" y="82" text-anchor="middle" font-family="${MONO}" font-size="13" fill="${t.acento}">respuesta en streaming (SSE)</text>

  ${caja(t, 315, 348, 148, 72, 'PostgreSQL', 'RLS por usuario')}
  ${caja(t, 477, 348, 148, 72, 'Stripe', 'suscripci&#243;n')}
  <path d="M 389 308 V 338" stroke="${t.tenue}" stroke-width="1.8" fill="none" marker-end="url(#punta)"/>
  <path d="M 551 308 V 338" stroke="${t.tenue}" stroke-width="1.8" fill="none" marker-end="url(#punta)"/>

  <text x="725" y="372" font-family="${SANS}" font-size="14" fill="${t.tenue}">El historial completo no viaja</text>
  <text x="725" y="393" font-family="${SANS}" font-size="14" fill="${t.tenue}">en cada turno, y ninguna clave</text>
  <text x="725" y="414" font-family="${SANS}" font-size="14" fill="${t.tenue}">llega nunca al navegador.</text>
  <rect x="705" y="352" width="3" height="68" rx="1.5" fill="${t.calido}" opacity="0.7"/>
</svg>`;
}

// --- Reparto en anillo de PROTOCOLO --------------------------------------

const CX = 300, CY = 222;          // centro del anillo
const R_NODO = 122, R_FUERA = 168, R_DENTRO = 80;

const pol = (r, grados) => {
  const rad = (grados * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
};
const fmt = ([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`;

// Arco entre dos angulos. sentido=1 va en el sentido de las agujas del reloj.
function arco(r, desde, hasta, sentido) {
  return `M ${fmt(pol(r, desde))} A ${r} ${r} 0 0 ${sentido} ${fmt(pol(r, hasta))}`;
}

function reparto(t) {
  const angulos = [-90, 0, 90, 180];          // operarios 1 a 4
  const HOLGURA = 15, HOLGURA_B = 11;   // grados de aire junto a cada nodo

  let flechasA = '', flechasB = '';
  for (let i = 0; i < 4; i++) {
    const desde = angulos[i], hasta = angulos[i] + 90;
    flechasA += `\n  <path d="${arco(R_FUERA, desde + HOLGURA, hasta - HOLGURA, 1)}" stroke="${t.acento}" stroke-width="2.4" fill="none" marker-end="url(#puntaA)"/>`;
    flechasB += `\n  <path d="${arco(R_DENTRO, hasta - HOLGURA_B, desde + HOLGURA_B, 0)}" stroke="${t.calido}" stroke-width="2.2" fill="none" marker-end="url(#puntaB)" opacity="0.9"/>`;
  }

  let nodos = '';
  angulos.forEach((a, i) => {
    const [x, y] = pol(R_NODO, a);
    nodos += `
  <g>
    <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="34" fill="${t.caja}" stroke="${t.borde}" stroke-width="1.8"/>
    <text x="${x.toFixed(1)}" y="${(y + 7).toFixed(1)}" text-anchor="middle" font-family="${SANS}" font-size="21" font-weight="700" fill="${t.texto}">${i + 1}</text>
  </g>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="420" viewBox="0 0 1000 420" role="img" aria-label="Reparto en anillo: el objetivo A de cada operario lo lleva el siguiente y el objetivo B el anterior, de modo que nadie ve su propia tarea">
  <defs>
    <marker id="puntaA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${t.acento}"/>
    </marker>
    <marker id="puntaB" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${t.calido}"/>
    </marker>
  </defs>

  <rect width="1000" height="420" rx="12" fill="${t.fondo}"/>
  <text x="40" y="38" font-family="${MONO}" font-size="13" fill="${t.tenue}" letter-spacing="1.4">REPARTO EN ANILLO</text>
  ${flechasA}
  ${flechasB}
  ${nodos}

  <g font-family="${MONO}" font-size="13">
    <circle cx="576" cy="146" r="5" fill="${t.acento}"/>
    <text x="592" y="151" fill="${t.acento}">objetivo A &#8594; lo lleva el SIGUIENTE</text>
    <circle cx="576" cy="180" r="5" fill="${t.calido}"/>
    <text x="592" y="185" fill="${t.calido}">objetivo B &#8594; lo lleva el ANTERIOR</text>
  </g>

  <g font-family="${SANS}" font-size="16" fill="${t.tenue}">
    <text x="576" y="238">Tu ficha lleva el objetivo A del anterior y el B del</text>
    <text x="576" y="262">siguiente: dos personas distintas. Nadie ve nunca</text>
    <text x="576" y="286">su propia tarea, y el invariante se comprueba en</text>
    <text x="576" y="310">ejecuci&#243;n para 2, 3 y 4 jugadores.</text>
  </g>

  <rect x="576" y="336" width="384" height="44" rx="8" fill="${t.pastilla}" stroke="${t.borde}" stroke-width="1"/>
  <text x="596" y="363" font-family="${SANS}" font-size="15.5" font-weight="600" fill="${t.texto}">Y leer la ficha te congela en el sitio.</text>
</svg>`;
}

// --- Escritura ------------------------------------------------------------

for (const [nombre, t] of Object.entries(TEMAS)) {
  fs.writeFileSync(path.join(SALIDA, `hero-${nombre}.svg`), cabecera(t));
  fs.writeFileSync(path.join(SALIDA, `arquitectura-${nombre}.svg`), diagrama(t));
  fs.writeFileSync(path.join(SALIDA, `anillo-${nombre}.svg`), reparto(t));
}
console.log('Generados: hero, arquitectura y anillo, en claro y oscuro');
