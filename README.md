<h1 align="center">
Service App
</h1>

<p id='menu' align="center">
   <a href="#instalacion">Instalación de la aplicación</a> •
  <a href="#jsonServer">Correr el servidor</a> •
  <a href="#ejecutarDev">Ejecución en Desarrollo</a> •
   <a href="#ejecutarProd">Ejecución en Producción</a>   
</p>

<br>

<div id='instalacion'>

## Instalar Aplicación. <a href=#menu >&crarr;</a>  
<br>

1 - Clonar app desde github. 
```bash
# Clonar este repositorio
$ git clone https://github.com/sanchezlucasar/services_app.git
```
<br>
2 - Instalar dependencias  
<br>

 ```ps
  ../service_app> npm install
 ```
 </div>
 <div id='jsonServer'>

## Correr el servidor. <a href=#menu >&crarr;</a>  

> **Nota:** 
> Se emplea este código como una prueba para simular las llamadas a la API utilizando json-server. Es fundamental ejecutar json-server antes de iniciar la aplicación para asegurar el funcionamiento correcto de la misma.

3 - Correr Json-server  
> **Nota:** 
>abrir una terminal y ejecutar el siguiente script y "NO CERRAR ESA TERMINAL" , ya que simulará el servidor del cual obtendremos los datos

<br>

 ```ps
  ../service_app> npm run json-server
 ```

 >**Ejemplo :** debe aparecer de esta manera si se ejecuta correctamente y sin errores
<br>

```ps
> next dev
Serving ./public directory if it exists

Endpoints:
http://localhost:3000/services
http://localhost:3000/slots
http://localhost:3000/logs
^C^C¿Desea terminar el trabajo por lotes (S/N)? s
PS C:\Proyectos de Prueba\todopino-app - copia> npm run json-server

> services-app@0.1.0 json-server
> json-server --watch db.json

--watch/-w can be omitted, JSON Server 1+ watches for file changes by default
JSON Server started on PORT :3000
Press CTRL-C to stop
Watching db.json...

( ˶ˆ ᗜ ˆ˵ )

Index:
http://localhost:3000/

```


<div id='ejecutarDev'>

## Ejecución en Desarrollo.<a href=#menu >&crarr;</a>

1. ejecutar y correr 
> **Nota:** 
>Abrir otra terminal distinta a la abierta para correr json-server y ejecutar el siguiente script
<br>

 ```ps
  ../service_app> npm run dev
 ```
>**Ejemplo :** debe aparecer de esta manera si se ejecuta correctamente y sin errores
<br>

```ps
> next dev

   ▲ Next.js 14.0.4
   - Local:        http://localhost:3001
   - Environments: .env
```

> **Nota:** 
> Para acceder a la aplicación solo ir al link de acceso local   http://localhost:3001 
</div>



<div id='ejecutarProd'>

## Ejecución en Producción.<a href=#menu >&crarr;</a>

1. ejecutar y correr 
> **Nota:** 
>Abrir otra terminal distinta a la abierta para correr json-server y ejecutar el siguiente script
<br>

 ```ps
  ../service_app> npm run dev
 ```
>**Ejemplo :** debe aparecer de esta manera si se ejecuta correctamente y sin errores
<br>

```ps
> next dev

   ▲ Next.js 14.0.4
   - Local:        http://localhost:3001
   - Environments: .env
```

> **Nota:** 
> Para acceder a la aplicación solo ir al link https://services-app-five.vercel.app/servicios
</div>
