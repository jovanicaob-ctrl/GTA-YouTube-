# Six Star Heat — Canal de YouTube de GTA 6

Proyecto completo del rebranding del canal `UC0WmAkHI9QFY1KqYDndphvw` (antes *@Giovani_cao*)
a **Six Star Heat**: canal en inglés de gameplay, directos y guías de GTA 6 (lanzamiento: 19 nov 2026).

```
branding/
  src/        logo.svg · banner.svg · watermark.svg · thumbnail-template.svg   (fuentes editables)
  export/     PNG listos para subir a YouTube + vista previa del banner por dispositivo
channel/      channel-setup.md  → nombre, handle, descripción, enlaces, ajustes
              keywords.md       → palabras clave del canal, tags por tipo de vídeo, palabras bloqueadas
AUDIT.md      → auditoría completa del canal y plan de acción por prioridad
content/      content-plan.md   → investigación, calendario, ideas de vídeos, miniaturas, tráiler
              video-description-template.md → plantilla de descripción, tags y reglas de títulos
streaming/    live-setup.md     → cómo configurar y hacer los directos
scripts/      render-branding.js → regenera los PNG desde los SVG (node scripts/render-branding.js)
```

## Estado

| Tarea | Estado |
|---|---|
| Vídeos antiguos (12 Shorts) ocultos — puestos en **privado** | ✅ hecho vía vidIQ |
| Nombre, handle, descripción, palabras clave | 📝 listo para pegar (`channel/channel-setup.md`) |
| Logo 800×800, banner 2560×1440, marca de agua | 🎨 listos en `branding/export/` |
| Plan de contenido + calendario pre/post lanzamiento | ✅ `content/content-plan.md` |
| Guía de directos | ✅ `streaming/live-setup.md` |

## Lo que tienes que hacer tú en YouTube Studio (≈ 10 min)

YouTube no permite cambiar nombre, foto, banner ni descripción del canal desde herramientas externas;
se hace desde https://studio.youtube.com :

1. **Personalización › Perfil**
   - Nombre: `Six Star Heat` · Handle: `@SixStarHeat`
   - Foto: `branding/export/logo-800x800.png`
   - Banner: `branding/export/banner-2560x1440.png` (ya ajustado al área segura de móvil/PC/TV)
   - Descripción y enlaces: copiar de `channel/channel-setup.md`
2. **Personalización › Marca de agua:** `branding/export/watermark-300x300.png` → *Todo el vídeo*.
3. **Configuración › Canal:** país, palabras clave, *No es contenido para niños*.
4. **Configuración › Valores predeterminados de subida:** plantilla de `content/video-description-template.md`, categoría *Juegos*, idioma inglés.
5. **Verificar teléfono** (Configuración › Canal › Elegibilidad de funciones) → activa directos (tarda hasta 24 h). **Hazlo hoy.**
6. Crear las 5 listas de reproducción y las secciones de la página principal (`channel/channel-setup.md` §2).
7. (Opcional) Eliminar definitivamente los 12 Shorts antiguos: Contenido › seleccionar todos › Más acciones › Eliminar para siempre.
