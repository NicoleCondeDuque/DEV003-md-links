
[![Verde-Ne-n-y-Morado-Informal-Profesional-Aplicaci-n-de-Mensajer-a-Lluvia-de-Ideas-Presentaci-n-1.png](https://i.postimg.cc/qvssTzM4/Verde-Ne-n-y-Morado-Informal-Profesional-Aplicaci-n-de-Mensajer-a-Lluvia-de-Ideas-Presentaci-n-1.png)](https://postimg.cc/4Y37v49S)
# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Acerca de este proyecto](#2-acerca-de-este-proyecto)
* [3. Diagrama de flujo](#3-diagrama-de-flujo)
* [4. Instalación](#4-instalación)
* [5. Comandos](#5-comandos)
* [6. Errores](#5-errores)


***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

## 2. Acerca de este proyecto

_`mdlinks-run`_ es una librería desarrollada usando Nodejs que permite leer y analizar archivos en formato `Markdown`, para verificar los links que contengan y reportar algunas estadísticas.

## 3. Diagrama de flujo
Se elaboró un diagrama de flujo para organizar la ruta de desarrollo de este proyecto.

[![Diagramma-senza-titolo-drawio-1.png](https://i.postimg.cc/gjhcbBCr/Diagramma-senza-titolo-drawio-1.png)](https://postimg.cc/bSzfQLNj)

## 4. Instalación

Ejecutando el comando  _`npm i mdlinks-run`_ podras descargar el paquete de la libreria y ejecutando los siguientes comando podras usarlo:

## 5. Comandos
El ejecutable de esta aplicación se puede ejecutar de la siguiente manera a través de la terminal: 
node cli.js <path-to-file> [options]`

* Si solo se ingresa `node cli.js`, recibimos un mensaje de bienvenida y la información detallada acerca de los comandos
```
              NODE CLI.JS
```
[![bienvenida1.png](https://i.postimg.cc/gJn0cKXF/bienvenida1.png)](https://postimg.cc/1n1SJwrJ)

* Si se ingresa node cli.js <path-to-file>`, no se valida si las URLs responden ok o no, solo identifica el archivo markdown (a partir de la ruta que recibe como argumento), analiza el archivo Markdown e imprime los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link.

```
node cli.js pruebaDocs/menos.md 
```
[![LINKS.png](https://i.postimg.cc/pX4sGcZ3/LINKS.png)](https://postimg.cc/9rPPzpsB)

* Si se ingresa node cli.js <path-to-file> --validate`, el módulo hace una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como ok.

```node cli.js pruebaDocs/menos.md --validate
```
[![validacion-links.png](https://i.postimg.cc/fLfP17Lm/validacion-links.png)](https://postimg.cc/MMXtQQ1p)
* Si se ingresa node cli.js <path-to-file> --stats`, el output (salida) será un texto con estadísticas básicas sobre los links.
```node cli.js pruebaDocs/menos.md --stats
```
[![stats-links.png](https://i.postimg.cc/fT9cLzcg/stats-links.png)](https://postimg.cc/yk7gpzrF)
* Si se ingresa node cli.js <path-to-file> --stats --validate` o node cli.js <path-to-file> --validate --stats` , obtendremos estadísticas que necesiten de los resultados de la validación.
```node cli.js pruebaDocs/menos.md --validate --stats
```
[![validacion-y-status-links2.png](https://i.postimg.cc/7Z4B7sN4/validacion-y-status-links2.png)](https://postimg.cc/w7WcYkP4)

## 6. Errores 

Retornara los siguientes errores al no cumplir con los parametros:

* Al ingresar un path que no existe
`Error: The path DOES NOT exist`
* Al ingresar un path que no es un archivo con extensión .md
`Error: It IS NOT an .md file`






