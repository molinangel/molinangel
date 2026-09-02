#!/usr/bin/env python3
"""Genera el calendario de contribuciones como SVG, dentro del propio repo.

Reemplaza a github-readme-activity-graph, que dejo de funcionar cuando su
instancia gratuita en Vercel llego al limite y empezo a devolver HTTP 402.
La leccion es la de siempre: un perfil no deberia depender de que un
servicio de terceros siga en pie.

Se ejecuta desde GitHub Actions con el GITHUB_TOKEN del propio repositorio.
"""

import json
import os
import sys
import urllib.request
from datetime import datetime

USUARIO = os.environ.get("GH_USER", "molinangel")
TOKEN = os.environ.get("GITHUB_TOKEN", "")
SALIDA = os.environ.get("SALIDA", "actividad.svg")

CONSULTA = """
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays { date contributionCount weekday }
        }
      }
    }
  }
}
"""

# Escala de verdes de la marca. El indice 0 es "sin actividad".
ESCALA = ["#161b22", "#0e4429", "#006d32", "#0f9d6b", "#3fcf8e"]

MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
         "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
DIAS = ["", "Lun", "", "Mié", "", "Vie", ""]


def traer_datos():
    peticion = urllib.request.Request(
        "https://api.github.com/graphql",
        data=json.dumps({"query": CONSULTA, "variables": {"login": USUARIO}}).encode(),
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": "application/json",
            "User-Agent": "perfil-actividad",
        },
    )
    with urllib.request.urlopen(peticion, timeout=30) as r:
        datos = json.loads(r.read().decode())

    if "errors" in datos:
        raise RuntimeError(datos["errors"])
    return datos["data"]["user"]["contributionsCollection"]["contributionCalendar"]


def nivel(cuenta, maximo):
    """Reparte en cinco tramos; el 1 se reserva a 'hubo algo, aunque poco'."""
    if cuenta == 0:
        return 0
    if maximo <= 1:
        return 1
    proporcion = cuenta / maximo
    if proporcion <= 0.15:
        return 1
    if proporcion <= 0.35:
        return 2
    if proporcion <= 0.65:
        return 3
    return 4


def construir_svg(calendario):
    semanas = calendario["weeks"]
    total = calendario["totalContributions"]

    LADO, HUECO = 11, 3
    PASO = LADO + HUECO
    MARGEN_X, MARGEN_Y = 34, 34

    ancho = MARGEN_X + len(semanas) * PASO + 20
    alto = MARGEN_Y + 7 * PASO + 34

    maximo = max(
        (d["contributionCount"] for s in semanas for d in s["contributionDays"]),
        default=0,
    )

    partes = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{ancho}" height="{alto}" '
        f'viewBox="0 0 {ancho} {alto}" role="img" '
        f'aria-label="{total} contribuciones en el ultimo año">',
        '<style>'
        '.et{font:600 12px "Segoe UI",system-ui,sans-serif;fill:#8b949e}'
        '.tt{font:700 13px "Segoe UI",system-ui,sans-serif;fill:#e6edf3}'
        '.ct{font:11px "Cascadia Mono",Consolas,monospace;fill:#6e7681}'
        '</style>',
        f'<rect width="{ancho}" height="{alto}" rx="6" fill="#0d1117"/>',
        f'<text x="{MARGEN_X}" y="20" class="tt">{total} contribuciones</text>',
        f'<text x="{ancho - 20}" y="20" text-anchor="end" class="ct">último año</text>',
    ]

    # Etiquetas de mes: solo cuando la semana estrena mes
    mes_previo = None
    for i, semana in enumerate(semanas):
        dias = semana["contributionDays"]
        if not dias:
            continue
        fecha = datetime.strptime(dias[0]["date"], "%Y-%m-%d")
        if fecha.month != mes_previo and fecha.day <= 7:
            partes.append(
                f'<text x="{MARGEN_X + i * PASO}" y="{MARGEN_Y - 6}" class="et">'
                f'{MESES[fecha.month - 1]}</text>'
            )
            mes_previo = fecha.month

    for d, etiqueta in enumerate(DIAS):
        if etiqueta:
            partes.append(
                f'<text x="{MARGEN_X - 8}" y="{MARGEN_Y + d * PASO + 9}" '
                f'text-anchor="end" class="et">{etiqueta}</text>'
            )

    # Las celdas aparecen en cascada de izquierda a derecha
    for i, semana in enumerate(semanas):
        for dia in semana["contributionDays"]:
            d = dia["weekday"]
            x = MARGEN_X + i * PASO
            y = MARGEN_Y + d * PASO
            n = nivel(dia["contributionCount"], maximo)
            retraso = round(i * 0.008, 3)
            partes.append(
                f'<rect x="{x}" y="{y}" width="{LADO}" height="{LADO}" rx="2.5" '
                f'fill="{ESCALA[n]}" opacity="0">'
                f'<animate attributeName="opacity" from="0" to="1" dur="0.35s" '
                f'begin="{retraso}s" fill="freeze"/>'
                f'<title>{dia["date"]}: {dia["contributionCount"]}</title></rect>'
            )

    # Leyenda
    ly = MARGEN_Y + 7 * PASO + 18
    lx = ancho - 20 - (5 * PASO) - 62
    partes.append(f'<text x="{lx}" y="{ly + 9}" class="et">Menos</text>')
    for k, color in enumerate(ESCALA):
        partes.append(
            f'<rect x="{lx + 42 + k * PASO}" y="{ly}" width="{LADO}" height="{LADO}" '
            f'rx="2.5" fill="{color}"/>'
        )
    partes.append(
        f'<text x="{lx + 42 + 5 * PASO + 4}" y="{ly + 9}" class="et">Más</text>'
    )

    partes.append("</svg>")
    return "\n".join(partes)


if __name__ == "__main__":
    if not TOKEN:
        print("Falta GITHUB_TOKEN", file=sys.stderr)
        sys.exit(1)
    try:
        svg = construir_svg(traer_datos())
    except Exception as exc:
        print(f"Error generando la actividad: {exc}", file=sys.stderr)
        sys.exit(1)

    with open(SALIDA, "w", encoding="utf-8") as f:
        f.write(svg)
    print(f"{SALIDA} generado ({len(svg)} bytes)")
