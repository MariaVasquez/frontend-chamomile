
# Portal Chamomile

Proyecto **FrontEnd** para aplicativo shopping

## Comenzando 🚀

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

Para descargar una copia en su máquina local, debe abrir una ventana de comandos y ejecuté el siguiente comando:

```
 git clone https://github.com/MariaVasquez/frontend-chamomile.git
 ```

### Pre-requisitos 📋

Descargar las siguientes herramientas:

```
Git
Node.js v20.12.2
npm 10.5.0
Angular cli
TypeScript
```

### Ejecución 🔧

Para poder ejecutar el proyecto, antes se deben instalar todas sus dependencias, para eso se abre una ventana de comandos en el directorio raiz del proyecto y ejecutamos el siguiente comando: `npm install`

Para ejecutar el proyecto en local se puede usar los siguientes comandos `npm start` o `ng serve -o`

## Estructura de carpetas
Dentro de la carpeta principal **src/app** encontramos la estructura de carpetas del proyecto la cual esta compuesta de la siguiente manera:
- **Components:** Carpeta contenedora de los componentes transversales que se pueden usar en los diferentes módulos de la aplicación.
- **Model:** Interfaces de los objetos utilizados en los módulos de la aplicación.
- **Module:** Carpeta contenedora de los diferentes módulos de la aplicación; un módulo es un contenedor en el que se declaran los componentes que se van a emplear en una parte de la aplicación.
- **Services:** Carpeta contenedora de los diferentes servicios rest que se consumen en la aplicación.
- **Shared:** Carpeta contenedora de aquellas utilidades transversales a la aplicación.

## Comandos ng para generar partes del proyecto

- **Componentes:**  ```ng g component component/nombreDelComponente```
- **Módulos:** `ng g module module/nombreDelModulo -m=app --route nombreDeLaRuta`
- **Servicios:** `ng g service services/nombreDelServicio`
