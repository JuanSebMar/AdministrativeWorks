# Plataforma de Administración de Obras de Construcción

Una aplicación web moderna para la gestión de obras de construcción, desarrollada con React, Vite, y Mantine UI.

## Características

- 📊 Dashboard con métricas clave y avance de obra
- 👥 Gestión de usuarios y roles
- 📋 Administración de rubros y tareas
- 📅 Planificación de obra con visualización Gantt
- ⚠️ Gestión de incidencias
- 📝 Sistema de reclamos postventa

## Tecnologías Utilizadas

- React 18
- TypeScript
- Vite
- Mantine UI
- React Router
- Tabler Icons
- Faker.js (para datos de prueba)

## Requisitos

- Node.js 16+
- npm o yarn

## Instalación

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd administrative-works
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

## Estructura del Proyecto

```
src/
  ├── components/     # Componentes reutilizables
  ├── layouts/        # Layouts de la aplicación
  ├── pages/         # Páginas principales
  ├── services/      # Servicios y datos mock
  ├── types/         # Definiciones de tipos
  ├── utils/         # Utilidades
  └── hooks/         # Custom hooks
```

## Módulos Principales

1. **Dashboard**

   - Resumen de avance por rubro
   - Incidencias activas
   - Contratos en ejecución
   - Stock crítico

2. **Gestión de Usuarios**

   - CRUD de usuarios
   - Asignación de roles
   - Perfiles de usuario

3. **Rubros y Tareas**

   - Categorización por rubro
   - Seguimiento de tareas
   - Control de progreso

4. **Planificación**

   - Visualización Gantt
   - Fases de obra
   - Cronograma

5. **Incidencias**

   - Registro de incidencias
   - Seguimiento de estado
   - Asignación de responsables

6. **Reclamos Postventa**
   - Formulario de reclamos
   - Gestión de estados
   - Comunicación con clientes

## Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
