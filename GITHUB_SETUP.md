# 🔧 Configurar GitHub - Guía Rápida

## El Problema
El repositorio no existe en GitHub todavía. Necesitas crearlo primero.

## Solución: Crear el Repositorio

### Paso 1: Crear Repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. **Repository name**: `slack-daily-bot` (o el nombre que prefieras)
3. **Description**: "Slack bot for daily task reminders"
4. **Visibility**: 
   - ✅ **Public** (si quieres que sea público)
   - ✅ **Private** (si quieres que sea privado)
5. **NO marques**:
   - ❌ Add a README file (ya tienes uno)
   - ❌ Add .gitignore (ya tienes uno)
   - ❌ Choose a license (ya tienes uno)
6. Click **"Create repository"**

### Paso 2: Copiar la URL Correcta

Después de crear el repositorio, GitHub te mostrará una página con instrucciones. 
**Copia la URL** que aparece, debería ser algo como:
```
https://github.com/TU_USUARIO/slack-daily-bot.git
```

### Paso 3: Actualizar el Remote

Ejecuta este comando (reemplaza con tu URL real):

```bash
git remote set-url origin https://github.com/TU_USUARIO/slack-daily-bot.git
```

### Paso 4: Hacer Push

```bash
git push -u origin master
```

O si tu rama se llama `main`:

```bash
git push -u origin main
```

---

## Si Ya Tienes el Repositorio Creado

Si el repositorio ya existe pero con otro nombre, solo actualiza la URL:

```bash
git remote set-url origin https://github.com/TU_USUARIO/NOMBRE_REAL.git
git push -u origin master
```

---

## Verificar tu Usuario de GitHub

Si no estás seguro de tu nombre de usuario:
1. Ve a [github.com](https://github.com)
2. Haz clic en tu foto de perfil (arriba derecha)
3. Tu nombre de usuario aparece en la URL o en tu perfil

---

## Problemas Comunes

### Error: "Authentication failed"
- Necesitas autenticarte. GitHub ya no acepta contraseñas.
- Usa un **Personal Access Token** o **SSH keys**

### Error: "Permission denied"
- Verifica que el repositorio existe
- Verifica que tienes permisos para escribir

### Crear Personal Access Token
1. Ve a [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Selecciona scopes: `repo` (todos los permisos de repositorio)
4. Click **"Generate token"**
5. **Copia el token** (solo se muestra una vez)
6. Cuando Git te pida contraseña, usa el token en lugar de la contraseña

