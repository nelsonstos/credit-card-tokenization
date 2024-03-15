# Tokenización de Tarjetas

## Descripción
Este proyecto implementa un servicio para la tokenización de tarjetas de crédito. Utiliza TypeScript, Node.js, Express y Jest para las pruebas unitarias.

## Contexto
Las pasarelas de pago suelen almacenar las tarjetas de crédito encriptadas para garantizar la seguridad de la información sensible. El proceso de tokenización convierte los datos de la tarjeta en un token único que puede ser utilizado para realizar transacciones de forma segura.

## Requerimientos Técnicos
- Desarrollo Backend: TypeScript, Node.js, Express
- Pruebas Unitarias: Jest
- Base de Datos No Relacional: Redis

## Instalación
1. Clona este repositorio: `git clone https://github.com/challenge-develop/credit-card-tokenization.git`
2. Instala las dependencias: `npm install`

## Configuración
1. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias utilizando el archivo `.env.example` como referencia. 

## Uso
1. Ejecuta el servidor: `npm run dev`
2. Realiza las solicitudes a los endpoints proporcionados para crear y obtener tokens de tarjeta de crédito.
3. Todas las solicitudes al API deben incluir el siguiente encabezado:`x-api-key: tu-clave-de-api`

## Ejemplo de API
- `POST /api/v1/credit-card/token`: Crea un token para una tarjeta de crédito.
- Parámetros de la solicitud:
 ```json
 {
    "card_number": "1458 8965 4785 4568",
    "cvv": "456",
    "expiration_month": "12",
    "expiration_year": "2025",
    "email": "tenantz100@gmail.com"
}
 ```
- Respuesta exitosa:
 ```json
 {
    "statusCode": 201,
    "data": {
        "token": "3a25c4dddedf4fc9fddebf6dd652d613"
    },
    "message": "Credit Card tokenization successfully completed"
}
 ```
- `GET /api/v1/credit-card/token/:tokenId`: Obtiene los datos de una tarjeta de crédito a partir de un token.
- Respuesta exitosa:
 ```json
{
    "statusCode": 200,
    "data": {
        "creditCard": {
            "card_number": "1458 8965 4785 4568",
            "expiration_month": "12",
            "expiration_year": "2025",
            "email": "tenantz100@gmail.com"
        }
    },
    "message": "Credit Card decoded successfull"
}
 ```

## Contribución
Si deseas contribuir a este proyecto, sigue estos pasos:
1. Haz un fork del repositorio
2. Crea una nueva rama: `git checkout -b feature-nueva`
3. Realiza tus cambios y haz commit: `git commit -am 'Agrega una nueva característica'`
4. Haz push a la rama: `git push origin feature-nueva`
5. Envía un pull request


