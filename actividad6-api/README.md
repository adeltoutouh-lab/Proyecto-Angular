# Actividad 6 - Aplicación consultando a API externa

Práctica de Angular para la asignatura Full Stack Developer.

La aplicación consume la API de usuarios de `peticiones.online` y permite hacer las operaciones básicas de un CRUD: listar, ver detalle, crear, actualizar y borrar usuarios.

## Rutas

- `/home`: listado de usuarios.
- `/user/:id`: detalle de un usuario.
- `/newuser`: formulario para crear usuario.
- `/updateuser/:id`: reutiliza el formulario para editar un usuario.

## Tecnologías

- Angular
- TypeScript
- Bootstrap
- Reactive Forms
- HttpClient

## Ejecutar el proyecto

```bash
npm install
npm start
```

Después se puede abrir `http://localhost:4200`.

## Nota sobre la API

La API usada en la práctica es de pruebas. Las peticiones de crear, actualizar y borrar devuelven una respuesta correcta, pero los cambios no quedan guardados de forma permanente.
