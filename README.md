📌 README – MillaPeluche (Frontend + Backend + MySQL)
🧸 MillaPeluche – Sistema Web Completo

Proyecto compuesto por:

Frontend: React + Vite + Tailwind

Backend: Spring Boot 3.5 + JWT

Base de datos: MySQL

Autenticación: Login con roles (ADMIN / USER)

Funciones: Productos, ventas, usuarios, comentarios

🚀 1. Requisitos Previos

Antes de ejecutar el proyecto, asegurarse de tener instalado:

🟧 1. Node.js & npm (para el frontend React)

Descarga: https://nodejs.org


Versión recomendada: Node 18 o 20

Verificar instalación:

node -v
npm -v

🟦 2. Java 21 (para Spring Boot 3.5)

Descargar e instalar desde:
https://adoptium.net/

Verificar:

java -version

🟨 3. Maven (para compilar el backend)

Verificar:

mvn -v

🟩 4. MySQL Server

Necesario para la base de datos.

Verificar:

mysql -u root -p


También puedes usar MySQL Workbench para administrar la BD.

🗂 2. Configuración de Base de Datos (MySQL)

Crear la base de datos:

CREATE DATABASE millapeluche;


Configurar usuario y contraseña en:

📍 /BackEnd/src/main/resources/application.properties

Ejemplo:

spring.datasource.url=jdbc:mysql://localhost:3306/millapeluche
spring.datasource.username=root
spring.datasource.password=tu_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

🔧 3. Ejecutar el Backend (Spring Boot)

Entrar al backend:

cd BackEnd
mvn spring-boot:run


El backend se ejecutará en:
👉 http://localhost:8080

Si aparece algún error relacionado con CORS, revisa la sección CORS más abajo.

🖥 4. Ejecutar el Frontend (React + Vite)

Entrar a la carpeta del frontend (donde está el package.json):

cd FrontEnd
npm install
npm run dev


El frontend se ejecutará en:
👉 http://localhost:5173

🔐 5. Usuarios y Roles
Usuarios se registran aquí:
POST /api/personas/save

Login:
POST /api/personas/login

Roles:

USER → puede comprar, ver productos, comentar

ADMIN → puede agregar/editar productos, ver ventas, responder comentarios

🔥 6. CORS Habilitado (Frontend → Backend)

Para permitir comunicación entre:

React (http://localhost:5173

)

Spring Boot (http://localhost:8080

)

Se integró un CorsConfigurationSource en SecurityConfig.java.

Archivo:
📍 /BackEnd/src/main/java/com/example/backend/BackEnd/security/SecurityConfig.java

.cors(cors -> cors.configurationSource(corsConfigurationSource()))


Y la configuración:

@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();

    config.setAllowedOrigins(List.of("http://localhost:5173"));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);

    return source;
}


Esto evita errores como:

CORS policy: No 'Access-Control-Allow-Origin'
Network Error
ERR_FAILED

📦 7. Estructura del Proyecto (resumida)
milla8.0-EXAMEN/
│
├── BackEnd/
│   ├── src/main/java/com/example/backend/BackEnd/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── model/
│   │   ├── repository/
│   │   ├── security/ (JWT + SecurityConfig + CORS)
│   │   └── config/
│   ├── resources/application.properties
│   └── pom.xml
│
└── FrontEnd/
    ├── src/
    ├── public/
    ├── index.html
    └── package.json

❗ 8. Errores Comunes y Solución
❌ ERR_NETWORK o CORS error

Solución: backend debe estar corriendo y CORS configurado (incluido en este proyecto).

❌ “Cannot connect to MySQL”

Verifica:

¿MySQL está encendido?

¿usuario/contraseña correctos?

¿puerto 3306 libre?

❌ “npm: command not found”

Instalar Node.js.

🎉 9. Créditos del Proyecto

Desarrollado por el equipo de MillaPeluche, usando:

React + Vite

Spring Boot 3.5

MySQL

JWT Authentication

TailwindCSS

Axios

📬 10. Contacto

Si necesitas soporte o mejoras en el proyecto, puedes contactar al desarrollador principal.