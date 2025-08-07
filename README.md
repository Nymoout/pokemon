# 🎯 Mi Lista de Pokémon

Una aplicación web moderna para gestionar tu lista de Pokémon deseados, construida con React, TypeScript y Material-UI.

## 📋 Descripción del Proyecto

Esta aplicación te permite:
- 🔍 **Buscar Pokémon** por nombre usando la PokéAPI
- 📝 **Agregar Pokémon** a tu lista personal de captura
- ✅ **Marcar Pokémon como capturados** o pendientes
- 🗂️ **Filtrar tu lista** por estado (todos, capturados, pendientes)
- 💾 **Persistencia local** - tus datos se guardan automáticamente en localStorage
- 📊 **Estadísticas** - ve cuántos Pokémon tienes en total, capturados y pendientes
- 🎴 **Base de datos navegable** - explora Pokémon disponibles con paginación

## 🛠️ Tecnologías Utilizadas

- **React 18** con TypeScript
- **Material-UI (MUI)** para componentes UI
- **Vite** como build tool y dev server
- **Axios** para llamadas a la API
- **PokéAPI** como fuente de datos
- **ESLint** para linting de código

## 📦 Instalación

### Paso 1: Instalar Yarn

#### Windows
```bash
# Usando npm (si tienes Node.js instalado)
npm install -g yarn

# O usando Chocolatey
choco install yarn

# O usando Scoop
scoop install yarn
```

#### macOS
```bash
# Usando Homebrew
brew install yarn

# O usando npm
npm install -g yarn
```

#### Linux
```bash
# Ubuntu/Debian
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn

# CentOS/RHEL/Fedora
curl -sL https://dl.yarnpkg.com/rpm/yarn.repo -o /etc/yum.repos.d/yarn.repo
sudo yum install yarn

# O usando npm (en cualquier distribución)
npm install -g yarn
```

### Paso 2: Clonar e Instalar Dependencias

#### Windows
```cmd
# Clonar el repositorio
git clone <url-del-repositorio>
cd pokemon

# Instalar dependencias
yarn install
```

#### macOS/Linux
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd pokemon

# Instalar dependencias
yarn install
```

### Paso 3: Iniciar el Servidor de Desarrollo

#### Todos los Sistemas Operativos
```bash
# Iniciar el servidor de desarrollo
yarn dev

# El servidor estará disponible en: http://localhost:5173
```

## 🚀 Scripts Disponibles

```bash
# Desarrollo
yarn dev          # Inicia el servidor de desarrollo

# Construcción
yarn build        # Construye la aplicación para producción
yarn preview      # Previsualiza la build de producción

# Linting
yarn lint         # Ejecuta ESLint para revisar el código
```

## 🎮 Cómo Usar la Aplicación

1. **Buscar Pokémon**: Usa la barra de búsqueda para encontrar Pokémon por nombre
2. **Agregar a tu lista**: Haz clic en "Agregar a mi lista" desde la búsqueda o base de datos
3. **Gestionar captura**: Usa el switch para marcar Pokémon como capturados o pendientes
4. **Filtrar**: Usa los botones de filtro para ver todos, solo capturados, o solo pendientes
5. **Explorar**: Navega por la base de datos usando los botones "Siguiente" y "Anterior"
6. **Eliminar**: Usa el botón de eliminar (🗑️) para quitar Pokémon de tu lista


## 📱 Características

- **Responsive Design**: Funciona en desktop, tablet y móvil
- **Persistencia Local**: Los datos se guardan automáticamente
- **Manejo de Errores**: Notificaciones claras para errores y acciones
- **Loading States**: Indicadores de carga durante las peticiones a la API
- **Paginación**: Navegación eficiente por la base de datos de Pokémon
- **Filtrado Inteligente**: Evita duplicados automáticamente

## 🌐 API

La aplicación utiliza la [PokéAPI](https://pokeapi.co/) para obtener información de Pokémon:
- Datos básicos: nombre, ID, tipos
- Sprites oficiales de alta calidad
- Información física: altura y peso
- Sin límites de rate limiting

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
