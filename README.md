# 🚀 Proyecto Laravel - Spot Shorter

Este proyecto es una aplicación Laravel que puede ejecutarse de dos formas:  
1. **Localmente en tu máquina con PHP instalado**  
2. **Usando Docker y Docker Compose** (recomendado para entornos aislados y consistentes)

---

## 📦 Requisitos previos

### Opción 1 - Entorno Local
- PHP >= 8.2
- Composer
- MySQL 8
- Node.js >= 18 + NPM
- Redis (opcional, para caché/colas)

### Opción 2 - Con Docker
- Docker >= 20.x
- Docker Compose >= 1.29.x

---

## ⚙️ Instalación (ambas opciones)

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Crist0829/spot2-shorter.git
   cd spot2-shorter
   ```

2. Copia el archivo de entorno:
   ```bash
   cp .env.example .env
   ```

3. Genera la key de Laravel:
   ```bash
   php artisan key:generate
   ```
   *(Si usas Docker lo haremos con el contenedor `artisan` más adelante).*

---

## ▶️ Opción 1: Correr en entorno local

1. Instala dependencias PHP:
   ```bash
   composer install
   ```

2. Instala dependencias frontend:
   ```bash
   npm install && npm run dev
   ```

3. Configura tu base de datos MySQL en `.env` y corre migraciones:
   ```bash
   php artisan migrate
   php artisan db:seed RoleSeeder
   php artisan db:seed UserSeeder
   ```

4. Inicia el servidor:
   ```bash
   php artisan serve
   ```

La aplicación estará disponible en 👉 `http://127.0.0.1:8000`

---

## 🐳 Opción 2: Correr con Docker

1. Levanta los servicios:
   ```bash
   docker compose -f docker-compose-local.yml up -d --build
   ```

   Esto levantará:
   - `nginx` en `http://localhost`
   - `mysql` en `localhost:3306`
   - `redis` en `localhost:6379`
   - `mailpit` en `http://localhost:8025`
   - `adminer` en `http://localhost:8085`

2. Instala dependencias PHP dentro del contenedor:
   ```bash
   docker compose -f docker-compose-local.yml run --rm composer install
   ```

3. Instala dependencias frontend:
   ```bash
   docker compose -f docker-compose-local.yml run --rm npm install
   docker compose -f docker-compose-local.yml run --rm npm run dev
   ```

4. Genera la key de Laravel:
   ```bash
   docker compose -f docker-compose-local.yml run --rm artisan key:generate
   ```

5. Ejecuta migraciones y seeders:
   ```bash
   docker compose -f docker-compose-local.yml run --rm artisan migrate
   docker compose -f docker-compose-local.yml run --rm artisan db:seed --class=RoleSeeder
   docker compose -f docker-compose-local.yml run --rm artisan db:seed --class=UserSeeder
   ```

6. Listo 🎉. Accede a la aplicación en:
   ```
   http://localhost
   ```

---

## 📬 Servicios incluidos (Docker)

- **Nginx** → Servidor web (`http://localhost`)  
- **MySQL 8** → Base de datos (`localhost:3306`)  
- **Redis** → Cache / Queues (`localhost:6379`)  
- **Mailpit** → Cliente SMTP para pruebas (`http://localhost:8025`)  
- **Adminer** → Cliente DB web (`http://localhost:8085`)  

---

## 👤 Usuarios iniciales
Después de correr los seeders, se crearán roles y un usuario por defecto:

- **Rol Administrador (id=1)** → puede administrar usuarios y links.  
- **Rol Usuario (id=2)** → puede acortar links.  

*(Ver detalles en `RoleSeeder` y `UserSeeder`).*

---

## 🛠 Comandos útiles (Docker)

- Correr migraciones:
  ```bash
  docker compose -f docker-compose-local.yml run --rm artisan migrate
  ```

- Correr tests:
  ```bash
  docker compose -f docker-compose-local.yml run --rm artisan test
  ```

- Ejecutar npm:
  ```bash
  docker compose -f docker-compose-local.yml run --rm npm run dev
  ```

---

## ✅ Listo
Ya podés trabajar en el proyecto tanto **localmente** como con **Docker**.