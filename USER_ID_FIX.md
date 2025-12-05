# 🔧 Fix: User ID Mismatch Between Web and Slack

## Problema
El comando `/daily` en Slack siempre muestra la misma hora (9:00) aunque la cambies en la web.

## Causa
El problema es que:
1. En la web, estás usando un `userId` simulado: `U123456`
2. En Slack, cuando ejecutas `/daily`, se usa tu `userId` real de Slack (ej: `U01ABC123`)

Como son diferentes, la configuración guardada desde la web no se encuentra cuando ejecutas `/daily` en Slack.

## Solución Temporal (Actual)
El comando `/daily` ahora:
- Si encuentra una configuración existente para tu userId de Slack, la usa
- Si no encuentra configuración, crea una nueva con valores por defecto

## Solución Permanente (Futuro)
Para que funcione correctamente, necesitas:

1. **Obtener tu userId real de Slack**:
   - Ejecuta `/daily` en Slack
   - Revisa los logs de Railway
   - Verás algo como: `📝 /daily command received from user U01ABC123`
   - Ese es tu userId real

2. **Usar ese userId en la web**:
   - Cuando te conectes en la web, en lugar de usar `U123456`, usa tu userId real
   - O implementa OAuth real para obtenerlo automáticamente

## Cómo Verificar tu User ID

### Opción 1: Desde los logs de Railway
1. Ve a Railway → Tu proyecto → Deployments → View Logs
2. Ejecuta `/daily` en Slack
3. Busca en los logs: `📝 /daily command received from user U...`
4. Copia ese userId

### Opción 2: Desde Slack API
1. Ve a [api.slack.com/methods/auth.test](https://api.slack.com/methods/auth.test)
2. Usa tu Bot Token
3. Verás tu `user_id` en la respuesta

## Solución Rápida

Por ahora, para que funcione:

1. **Configura desde la web** usando `U123456` (o tu userId real si lo conoces)
2. **Ejecuta `/daily` en Slack** - esto creará/actualizará la configuración para tu userId real
3. **Vuelve a configurar desde la web** pero esta vez usa tu userId real de Slack

O simplemente:
1. Configura la hora en la web
2. Ejecuta `/daily` en Slack - esto actualizará el canal pero mantendrá la hora que configuraste (si usas el mismo userId)

## Nota Importante

El código ahora está mejorado para:
- Preservar la hora/minuto cuando existe una configuración
- Mostrar mejor información de depuración en los logs
- Manejar mejor el caso cuando no hay configuración existente

Pero el problema fundamental es que necesitas usar el mismo `userId` en la web y en Slack, o implementar OAuth real.

