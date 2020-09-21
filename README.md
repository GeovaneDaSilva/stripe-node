# SISTEMA DE FACTURACION Y DELIVERY STRIPE NODE.JS

Esa es una aplicación que conecta Stripe a Node.js.
Con ella, puedes generar facturas y recibir pagos.
Funciona de la seguinte manera:

El usuario se registra, luego recibira en su telefono un mensaje de texto y por email confirmando su registro. Donde se genera un ID numero de Buzon empezando en 7000, puerto ru puedes cambiar.

Lugo, ese usuario compra un paquete, envia a ese dealer, el dealer recibe el paquete y publica la notificación del mismo por ID a ese usuario registrado.
Cuando el paquete es publicado, automaticamente se genera la factura y el usuario es notificado que existe una factura disponible.
El usuario entra en su dashboard, dar click en la factura recibida por parametro y completa el pago por stripe.
Lugo la factura se cambiara de false a true. El administrador es notificado y envia el paquete al usuario.


### CONFIGURAR REPOSITORIO EN MI MAQUINA:

Para iniciar el repositorio, debes primeiro descargar el proyecto en tu maquina y seguir los seguintes pasos:
npm install
remplazar todas las vars -G que esta en el archivo config/config.

Dentro del archivo config.js debes agregar su base de datos.

La segunda etapa del proyecto sera publicado pronto, el frontend.

### RECIBIR PAGOS

Para empezar a recibir pagos en online, necesitaras enviar el token que sera generado en el frontend, luego debes enviar por params o por el body al charge.source.
El charge.source es encargado de recibir el token con lass informaciones del client card y procesar el pago.
El token es valido solamente una unica vez!

### CONFIGURANDO EL ARCHIVO STRIPE.JS

Debes cambiar esa info => https://dashboard.stripe.com/test/apikeys
const stripe = require('stripe')('sk_test_**************');

Debes agregar el token que sera enviado desde tu frontend
source: body.source* / source: "TOKEN"
Para generar el token puedes utilizar una librertia en angular => https://www.npmjs.com/package/ngx-stripe

Estoy preparando un archivo que sera el Frontend completo de una aplicación de deliveries, donde estare publicando en el mismo repositorio.

### CONFIGURANDO EL ARCHIVO AWS PARA ENVIAR PUSH NOTIFICATION

Debes crear una cuenta en AWS y configurar el simple notification y el push notification.


Gracias a todos por descargar ese repositório, cualquier duda adicional estamos la orden.

Luego estare publicando la segunda parte del frontend.

Puedes contactar a processenv.com 

Muchas gracias!!!



