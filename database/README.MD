# Database configuration

## Diagrama

![Diagrama](./imageGalleryDiagram.drawio.png)

## Development

Creación manual usando podman. `<user>`, `<pass>`, `<root_pass>`, `<db_name>` y `<port>` deben ser los que se setear en el .env del backend:

```sh
podman run -d \
-p <port>:3306 \
-v imageGallery_volumen:/var/lib/mysql \
-e MYSQL_USER=<user> \
-e MYSQL_PASSWORD=<pass> \
-e MYSQL_ROOT_PASSWORD=<root_pass> \
-e MYSQL_DATABASE=<db_name> \
--name imageGallery_DB \
docker.io/library/mariadb
```

- `-p <port>:3306`: Configura el puerto de salida del contenedor.
- `-v imageGallery_volumen:/var/lib/mysql`: Define el volumen del contenedor para almacenar la base de datos.
- `-e MYSQL_USER=<user>`: Define un usuario para que la api pueda utilizar la base de datos.
- `-e MYSQL_PASSWORD=<pass>`: Define la contraseña del usuario.
- `-e MYSQL_ROOT_PASSWORD=<root_pass>`: Define la contraseña del usuario root.
- `--name imageGallery_DB`: Define el nombre del contenedor.
- `docker.io/library/mariadb`: Indica al contenedor que debe usar la imagen de mariadb.

### Instalación de herramientas útiles

- Entrar al contenedor:

```sh
podman exec -it imageGallery_DB sh
```

- Actualizar el SO:

```sh
apt-get update
```

- Instalar herramientas

```sh
apt-get install vim mysql-client
```

### Comandos útiles

Detiene y elimina contenedor:

```sh
podman stop imageGallery_DB && podman rm imageGallery_DB
```

ELimina volumen:

```sh
podman volume rm imageGallery_volumen
```

---

## Conexión

Para conectarse a la base de datos se utiliza el comando `mysql` y se especifica el protocolo para poder conectarse al contenedor.

> Si en la configuración se cambia el puerto por defecto o el host se tienen que especificar con `-P <port>` y `-h <host>`.

Para conectarse desde dentro del contenedor:

```sh
mysql -u <user> -p
```

Para conectarse desde fuera del contenedor:

```sh
mysql --protocol=TCP -u <user> -p
```

---

## Links

- [mariaDB dockerHub](https://hub.docker.com/_/mariadb)
- [mariaDB container](https://mariadb.com/kb/en/installing-and-using-mariadb-via-docker/)
- [mariaDB container environments](https://mariadb.com/kb/en/mariadb-server-docker-official-image-environment-variables/)
