# 📸 Ejemplos y Vista Previa

## Mensaje Diario en Slack

Cuando el bot envía el mensaje diario, se verá así:

```
┌─────────────────────────────────────┐
│ 📋 Resumen Diario                  │
│                                    │
│ Aquí está tu resumen diario de     │
│ tareas. Recuerda revisar tu        │
│ tablero.                           │
└─────────────────────────────────────┘
```

## Comando /daily

Cuando un usuario ejecuta `/daily` en Slack:

**Usuario escribe:**
```
/daily
```

**Bot responde (solo visible para el usuario):**
```
✅ Configuración guardada. El bot enviará mensajes diarios a este canal.
```

## Interfaz Web

### Estado: No Conectado
```
┌─────────────────────────────────────┐
│      Slack Daily Bot                │
│  Configura tu bot para mensajes     │
│           diarios                   │
│                                     │
│  [🔗 Conectar con Slack]            │
│                                     │
│  Conecta tu workspace de Slack      │
│        para comenzar                │
└─────────────────────────────────────┘
```

### Estado: Conectado
```
┌─────────────────────────────────────┐
│      Slack Daily Bot                │
│  Configura tu bot para mensajes     │
│           diarios                   │
│                                     │
│  ● Conectado a Slack                │
│                                     │
│  Canal de Slack                     │
│  [Selecciona un canal ▼]            │
│                                     │
│  Hora del mensaje diario            │
│  [9]                                │
│  Hora en formato 24h (0-23)         │
│                                     │
│  [💾 Guardar Configuración]         │
│                                     │
│  💡 Usa el comando /daily en        │
│     Slack para activar el bot       │
└─────────────────────────────────────┘
```

## Flujo de Uso

1. **Usuario abre la web** → Ve la interfaz de conexión
2. **Hace clic en "Conectar con Slack"** → Se conecta (simulado)
3. **Selecciona canal** → Elige dónde recibir mensajes
4. **Configura hora** → Elige cuándo recibir el mensaje (ej: 9 AM)
5. **Guarda configuración** → Se guarda en el servidor
6. **En Slack, ejecuta `/daily`** → Activa el bot en ese canal
7. **Cada día a la hora configurada** → El bot envía el mensaje

## Personalización del Mensaje

Para cambiar el mensaje, edita `server.js` línea 47:

```javascript
const message = "Tu mensaje personalizado aquí";
```

Puedes usar formato Markdown de Slack:
- `*texto*` para negrita
- `_texto_` para cursiva
- `~texto~` para tachado
- `>` para citas

Ejemplo:
```javascript
const message = "*¡Buenos días!* 🌅\n\nAquí está tu resumen diario de tareas.\n\n> Recuerda revisar tu tablero de proyectos.";
```

