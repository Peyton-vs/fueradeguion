# fueradeguion

Productora en español sobre decisiones, errores y casualidades que cambiaron historias reales. Narración directa, curiosidad sin exageración, voz con pausas y énfasis en los giros. Azul noche, marfil y ámbar, con cifras monoespaciadas. La disponibilidad de los identificadores en redes sigue pendiente.

## Producción por episodio

1. Seleccionar una pregunta concreta, una escena de apertura y un desenlace verificable. Guardar fuentes primarias y relacionar cada afirmación importante con su evidencia.
2. Escribir con escenas y aprobar el corte editorial. Registrar discrepancias entre fuentes y evitar minutos, citas o cifras que no estén documentados.
3. Grabar voz propia o contratar síntesis con derechos comerciales documentados. Segmentar la narración y alinear subtítulos con el audio definitivo. Mantener un inventario por recurso con autor, URL, licencia, atribución y comprobante. Identificar recreaciones cuando puedan confundirse con archivo.
4. Montar en Remotion. Exportar un máster horizontal y clips verticales con pregunta abierta, encuadre propio y texto dentro de la zona segura. Revisar audio, legibilidad, sincronía y fidelidad histórica.
5. Preparar una ficha por plataforma con exportación, título, descripción, créditos, miniatura, destino y fecha. Obtener aprobación para la publicación concreta. Registrar URL, fecha y versión efectivamente publicada.
6. Revisar retención y tiempo de reproducción del largo y, por clip, finalización y visitas al perfil o al episodio cuando sean medibles. Usar los resultados para elegir el siguiente tema. Registrar las hipótesis de anuncios, patrocinios, afiliados y membresía conforme haya audiencia y elegibilidad.

## Cuentas y distribución

La titularidad queda con el usuario. Aprobar primero nombre e identificadores, luego crear o reclamar el canal de YouTube, el perfil de TikTok, la cuenta profesional de Instagram y la página de Facebook. Vincular Instagram y Facebook si se usará su administración conjunta. Configurar recuperación y verificación en dos pasos. Conectar accesos por plataforma con permisos mínimos tras aprobación explícita. Mantener contraseñas y tokens fuera de este proyecto.

Punto de partida operativo: revisar y publicar el largo desde YouTube Studio, cargar el clip adaptado en TikTok y preparar Reels para Instagram y Facebook. Confirmar la ruta al episodio desde cada perfil antes de escribir la llamada a la acción. Evaluar programación e integraciones tras disponer de las cuentas y comprobar sus permisos. La aprobación cubre el archivo, el texto, la cuenta y el momento de publicación.

## Piloto · La alarma 1202 del Apolo 11

- Cronología y tiempo entre el primer aviso y el aterrizaje: [Apollo 11 Mission Report, tabla 5-I](https://sma.nasa.gov/SignificantIncidents/assets/apollo-11-mission-report.pdf).
- Sobrecarga, radar de encuentro y recuperación del trabajo esencial: [Apollo Lunar Surface Journal, Program Alarms](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11.1201-pa.html).
- Equipo de software: [NASA, Margaret Hamilton](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11Hamilton.html).
- Cadena de decisión y maniobra final: [NASA, Jack Garman](https://www.nasa.gov/image-article/apollo-era-hero-john-jack-garman-dies/) y [transcripción del descenso](https://nasa.gov/wp-content/uploads/static/history/alsj/a11/a11.landing.html).

Los gráficos son originales y esquemáticos. El guion está en `piloto.txt`. `preparar.py` genera la narración con Piper y calcula los tiempos de cada segmento de subtítulos a partir de su audio. Las tres composiciones verticales reutilizan segmentos narrados del montaje horizontal y añaden una pregunta final. Los MP4 se exportan con estos comandos:

```sh
npm ci
npm run piloto
npm run clip -- Apolo11Clip1 clip-01-alarma.mp4
npm run clip -- Apolo11Clip2 clip-02-houston.mp4
npm run clip -- Apolo11Clip3 clip-03-terreno.mp4
```

La voz extendida usa el [modelo es_MX Claude de Piper](https://huggingface.co/rhasspy/piper-voices/blob/main/es/es_MX/claude/high/MODEL_CARD), cuya ficha indica Apache 2.0 para el conjunto de datos. Para regenerarla, instalar `piper-tts` en Python 3.12 y colocar los archivos ONNX y ONNX JSON en `.voz/`.
