# GraphQL TypeScript Server

<p align="center" >
  <img src="./logo.png" alt="Avila Tek Logo" height="150px">
</p>

Este es el repositorio base para las api graphql de [@avilatek](https://avilatek.dev). El objetivo principal de este repositorio es un esfuerzo por mantener un estándar de código entre los diferentes proyecto de la compañía, al igual, nos permite reducir el esfuerzo necesario para empezar proyectos, ya que esta base de código provee los cimientos fundamentales para la mayoría de las aplicaciones que comúnmente desarrollamos.

## Tabla de Contenido

- [1. Empezando a usar el Template](#1-empezando-a-usar-el-template)
- [2. Dependencias](#2-dependencias)
- [3. Npm Scripts](#3-npm-scripts)
- [4. Errores Comunes **under construction**](#4-errores-comunes)
- [5. Guía Trabajo](#5-guía-trabajo)
  - [5.1 Como Crear un Modelo](#51-como-crear-un-modelo)
  - [5.2 Como agregar la operaciones CRUD](#52-como-agregar-la-operaciones-crud)
    - [5.2.1 Operaciones de Lecturas (A.K.A Queries)](#521-operaciones-de-lecturas-aka-queries)
    - [5.2.2 Operaciones de Escrituras (A.K.A Mutations)](#522-operaciones-de-escrituras-aka-mutations)
    - [5.2.3 FAQ](#523-faq)
  - [5.3 Custom Resolvers](#53-custom-resolver)
- [Notas Finales](#notas-finales)
- [Agradecimientos](#agradecimientos)

## 1. Empezando a usar el Template

Para empezar a usar este template puedes hacerlo directamente de github utilizando el botón de usar template, o puedes hacer fork del proyecto, sin embargo, la forma mas cómoda y como probablemente mas utilices este template es haciendo un clone:

```bash
  git clone --depth=1 https://github.com/Zoomelectrico/avilatek-graphql-typescript-started.git <project_name>
  cd <project_name>
  npm install
```

Después de realizar estos pasos ya abras descargado el proyecto e instalado sus dependencias, solo te queda agregar las variables de entorno al proyecto, en este repositorio se encuentra un archivo llamado `variables.env.example` que como su nombre lo indica es un ejemplo de las variables de entorno mínimas para empezar el proyecto. puedes realizar el comando **unix** `mv` para utilizar ese archivo.

```bash
  mv src/variables.env.example src/variables.env
```

Con este comando el archivo abra cambiado de nombre y ya tendrás el archivo `variables.env` el cual es ignorado por git, para mantener la seguridad, para que el proyecto funcione debes cambiar el URL de la DB para ellos tienes que cambiar la Linea que dice:

```txt
DATABASE=<URL>
```

Por el URL de Mongo, puedes obtener uno preguntándole al líder técnico del proyecto o en su defecto, en los servicios [cloud](http://cloud.mongodb.com/) de MongoDB.

Cuando tengas esto listo, puedes ejecutar el comando `npm run watch` para empezar a correr el proyecto.

## 2. Dependencias

En este apartados listamos las dependencias utilizadas por este proyectos, las cuales trataremos de mantener al dia, sin embargo, siempre es bueno realizar un chequeo del estado de las mismas.

| devDependency |        Dependencia         | Uso                                                                                                                                                                                    |
| :-----------: | :------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      ❌       |   apollo-server-express    | Integración the express con el Servidor de GraphQL                                                                                                                                     |
|      ❌       |          bcryptjs          | Hashear contraseñas, para guardarlas en la DB                                                                                                                                          |
|      ❌       |        body-parser         | Parsear el contenido de las peticiones a json                                                                                                                                          |
|      ❌       |        compression         | Comprimir el contenido de las peticiones                                                                                                                                               |
|      ❌       |       cookie-parser        | Parsear el contenido de las cookies para manejarlas como objetos                                                                                                                       |
|      ❌       |            cors            | Activar CORS en el servidor (es necesario porque es una api)                                                                                                                           |
|      ❌       |           dotenv           | Agregar las variables de entorno (archivo `variables.env`) a la variable `proccess.env.*`                                                                                              |
|      ❌       |          express           | Facilitar la creación de servidores con Node.js                                                                                                                                        |
|      ❌       |      express-session       | Facilita el uso de sesiones en express                                                                                                                                                 |
|      ❌       |     express-validator      | Ayuda a validar los campos que llegan del frontend                                                                                                                                     |
|      ❌       |          graphql           | Ayuda a la creación del servidor graphql                                                                                                                                               |
|      ❌       |      graphql-compose       | Herramientas para generar esquemas de GraphQL Complejos en Node.js                                                                                                                     |
|      ❌       | graphql-compose-connection | Facilitar el Realtime con graphql-compose                                                                                                                                              |
|      ❌       |  graphql-compose-mongoose  | Crear Tipos de GraphQL dado un modelo de mongoose y genera los CRUD para los modelos                                                                                                   |
|      ❌       |     graphql-middleware     | Es un schema wrapper que permite manejar funcionalidades adicionales entre los resolvers                                                                                               |
|      ❌       |       graphql-tools        | Herramientas útiles para crear un esquema de graphql                                                                                                                                   |
|      ❌       |        jsonwebtoken        | Ayuda en la generación de jwt para el flujo de auth                                                                                                                                    |
|      ❌       |          mongoose          | ODM (Object Document Mapper) para MongoDB / Equivalente a un ORM para SQL                                                                                                              |
|      ❌       |         nodemailer         | Envío de emails desde node.js                                                                                                                                                          |
|      ❌       |          passport          | Middleware de autenticación para Node.js                                                                                                                                               |
|      ❌       |           slugs            | ayuda a generara slugs, para pretty urls                                                                                                                                               |
|       ✔       |         @types/\*          | Estos Paquetes provienen de proyecto [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) y son las definiciones de los tipos utilizados en las librerías de esta app |
|       ✔       |        concurrently        | Permite ejecutar tareas en paralelos utilizando npm scripts                                                                                                                            |
|       ✔       |           eslint           | Linter para (ecma/type)script, ayuda con los errores                                                                                                                                   |
|       ✔       |          nodemon           | Para no tener que reiniciar el server con cada cambio o con los errores                                                                                                                |
|       ✔       |          prettier          | Para mantener una estética similar en el código                                                                                                                                        |
|       ✔       |          ts-node           | Ayuda a ejercutar TypeScript en Node                                                                                                                                                   |
|       ✔       |         typescript         | Es el compilar de ts                                                                                                                                                                   |

## 3. Npm Scripts

Este proyecto provee usa serie de script muy útiles para facilitar el trabajo del desarrollador, aunque la mayor parte del tiempo estarás utilizando `npm run watch` puedes encontrar en un momento en donde sea util utilizar alguno de los siguientes:

|   Comando   | Uso                                                           |
| :---------: | ------------------------------------------------------------- |
|    start    | Pantalla para `npm run serve`                                 |
|    build    | Compila el proyecto y hace un build de producción             |
|    serve    | Ejecuta la version build de proyecto                          |
| watch-node  | Ejecuta nodemon sobre el servidor                             |
|  watch-ts   | Inicia el Compilador de ts en modo watch                      |
|    watch    | Ejecuta en paralelo `npm run watch-ts` y `npm run watch-node` |
|    lint     | Ejecuta eslint                                                |
|    test     | ---                                                           |
| watch-test  | ---                                                           |
|    debug    | ---                                                           |
| serve-debug | ---                                                           |
| watch-debug | ---                                                           |

## 4. Errores Comunes

**En construcción**

## 5. Guía Trabajo

En esta sección encontraras un resumen de como trabajar en las tareas mas comunes para este tipo de proyecto

### 5.1 Como Crear un Modelo

Para crear un nuevo modelo en este proyecto deberás crear un archivo en la carpeta `src/models/*` cuyo nombre cumpla con las siguientes características:

1. El nombre del Modelo sera en Ingles
2. El nombre del Modelo sera en Singular
3. La Inicia del Modelo sera en Mayúsculas
4. El nombre del modelo sera en CamelCase
5. Ejemplos ✔: `User.ts` `Wallet.ts` `ShopCart.ts`
6. Ejemplos Incorrectos ❌: `usuario.ts` `wallet.ts` `Snake_Case.ts` `Cars.ts`

Después de Crear el archivo deberás importar las siguientes dependencias

```TypeScript
import mongoose, { Schema, Document } from 'mongoose';
import slugs from 'slugs';
import { composeWithMongoose } from 'graphql-compose-mongoose';

mongoose.Promise = global.Promise;
```

Después de importar las dependencias y decirle a mongo que use las promesas de Node, deberás crear y exportar el `Type` de TS para el modelo de mongoose

```TypeScript
// ... dependcies
export type ModelNameDocument = Document & {
  attr1: string;
  attr2: number;
  // ... agregar los diferentes attr mas su tipo
  createdAt: Date; // estos son obligatorios
  updatedAt: Date; // estos son obligatorios
};
```

**Nota**: Es importante que el `Type` siga el esquema `NombreDelModelo` cuyo sufijo sea `Document`
En caso de que el Modelo tenga una relación con otro modelo deberás agregar el tipo de la siguiente forma:

```TypeScript
// ...
export type ModelNameDocument = mongoose.Document & {
  attr1: string;
  attr2: OtherModel1Document | Schema.Types.ObjectId;
  attr3: Array<OtherModel2Document | Schema.Types.ObjectId>;
  createdAt: Date;
  updatedAt: Date;
};
```

Después de Crear el `Type` deberás crear el Schema de mongoose

```TypeScript
const modelNameSchema = new Schema(
  {
    attr1: {
      type: String,
      required: 'Error Message',
      trim: true;
    },
    attr2: {
      type: Number,
      required: 'Error Message',
    }
    // ... demás attrs
  },

  {
    timestamps: true, // Colocar obligatoriamente
  }
);
```

**Opcional**: Con el Schema de Mongo creado, es importante definir si el modelo necesita ejecutar algo antes de guardarse, por ejemplo generar un slug, para ello utilizamos los hooks de mongoose, por ejemplo:

```TypeScript
brandSchema.pre('save', async function(
  this: BrandDocument,
  next: mongoose.HookNextFunction
) {
  if (!this.isModified('name')) {
    return next();
  }
  this.slug = slugs(this.name);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`);
  const withSlugs = await (this as any).constructor.find({ slug: slugRegEx });
  if ((withSlugs as Array<any>).length) {
    this.slug = `${this.slug}-${withSlugs.length + 1}`;
  }
  next();
});
```

Después de terminar todo esto deberemos generar y exportar el Modelo de mongoose y los tipos de GraphQL para ello utilizaremos el siguiente código:

```TypeScript
export const ModelName = mongoose.model<ModelNameDocument>('Model', modelNameSchema);
export const ModelNameTC = composeWithMongoose(ModelName);
```

**Nótese** que el nombre del modelo debe ser igual al nombre del archivo y que el nombre de lo tipos de GraphQL tiene como sufijo `TC`.

**Nota**: Si fuera el caso en que el modelo tuviera relaciones con otros modelos deberán agregarse los resolvers de esos campos para query de GraphQL devuelva los objectos y no el ObjectId, para ello deberá agregar después de `ModelNameTC` el siguiente código.

```TypeScript
// ...

// Para relaciones 1 a 1
ModelNameTC.addRelation('relationshipName', {
  resolver: () => OtherModelTC.getResolver('findById'),
  prepareArgs: {
    _id: source => source.attrName,
    skip: null,
    sort: null,
  },
});

// Para relaciones 1 a n (Arrays de ObjectId)
ModelNameTC.addRelation('relationshipName2', {
  resolver: () => OtherModelTC.getResolver('findByIds'),
  prepareArgs: {
    _ids: source => source.attrName2,
    skip: null,
    sort: null,
  },
});
```

Después de crear el modelo y asegurarse que todo este bien debemos agregar el Modelo y el ModeloTC al archivo `src/models/index.ts` para facilitar la exportación de los modelos. Como regla general, deberá agregar el export de su modelo en orden alfabético, por ejemplo:

```TypeScript
// src/models/index.ts
export { CurrencyTC, Currency } from './Currency';
export { LocationTC, Location } from './Location';
export { ModelTC, Model } from './Model';
```

**Nótese**: que primero van los tipos de GraphQL y luego el modelo de Mongoose, con esto ya terminamos creación de nuestro modelo.

### 5.2 Como agregar la operaciones CRUD

Para agregar las operaciones CRUD deberá agregar el `ModelNameTC` en los archivos `Mutation.ts` y `Query.ts`, luego deberá implementar las operaciones de la siguiente manera.

1. Operaciones de Lectura en el archivo `Query.ts`
2. Operaciones de Escritura en el archivo `Mutation.ts`

#### 5.2.1 Operaciones de Lecturas (A.K.A Queries)

Diríjase al archivo `src/graphql/Query.ts` agregue `ModelNameTC` en el import del archivo

```TypeScript
import {
  // ...
  ModelNameTC,
  // ...
} from '../models';
```

Luego agregue las siguientes Operaciones en el objecto `Query` que se encuentra en el archivo

**hint**: Puedes `ctrl + c` y `ctrl + v` este snippet y luego cambiar `modelName` por el nombre real del modelo y `ModelNameTC` por el import del TC del modelo.

```TypeScript
  modelNameById: ModelNameTC.getResolver('findById'),
  modelNamesById: ModelNameTC.getResolver('findByIds'),
  modelName: ModelNameTC.getResolver('findOne'),
  modelNames: ModelNameTC.getResolver('findMany'),
  modelNameCount: ModelNameTC.getResolver('count'),
  modelNameConnection: ModelNameTC.getResolver('connection'),
  modelNamePagination: ModelNameTC.getResolver('pagination'),
```

#### 5.2.2 Operaciones de Escrituras (A.K.A Mutations)

Diríjase al archivo `src/graphql/Mutation.ts` agregue `ModelNameTC` en el import del archivo

```TypeScript
import {
  // ...
  ModelNameTC,
  // ...
} from '../models';
```

Luego agregue las siguientes Operaciones en el objecto `Mutation` que se encuentra en el archivo

**hint**: Puedes `ctrl + c` y `ctrl + v` este snippet y luego cambiar `ModelName` por el nombre real del modelo y `ModelNameTC` por el import del TC del modelo.

```TypeScript
  createModelName: ModelNameTC.getResolver('createOne'),
  createManyModelNames: ModelNameTC.getResolver('createMany'),
  updateModelNameById: ModelNameTC.getResolver('updateById'),
  updateModelName: ModelNameTC.getResolver('updateOne'),
  updateModelNames: ModelNameTC.getResolver('updateMany'),
  deleteModelNameById: ModelNameTC.getResolver('removeById'),
  deleteModelName: ModelNameTC.getResolver('removeOne'),
  deleteModelNames: ModelNameTC.getResolver('removeMany'),
```

#### 5.2.3 FAQ

Para mas info sobre esto puedes revisar la documentación del Plugin [GraphQL Compose Mongoose](https://graphql-compose.github.io/docs/plugins/plugin-mongoose.html)

### 5.3 Custom Resolvers

Ahora supongamos que se encuentran en la necesidad de agregar un funcionalidad muy compleja, o que necesita de alto procesamiento y cuya mejor forma de realizar es en el servidor, para ese caso tenemos dos Opciones o bien agregar un endpoint REST y trabajar de manera tradicional, o bien podrías crear un **_custom resolver_** que no es mas que una función que generamos nosotros en vez de la librería y que igualmente es accesible a traves de graphql.

Para hacerlo, solamente tienes que dirigirte al archivo `src/graphql/CustomMutation.ts` si es un funcionalidad que escribe en la Base de Datos, o `src/graphql/CustomQuery.ts` si es una funcionalidad que lee datos. El Archivo en principio debería verse asi:

```TypeScript
import { schemaComposer } from 'graphql-compose';
// import {} from '../models';
export default {};
```

Vamos a ejemplificar como hacer un Custom Mutation, haciendo la funcionalidad de Sign Up de un Usuario. Veamos el Código para hacer esta funcionalidad sin tocar GraphQL

```TypeScript
import { User, UserDocument } from '../models';
function LogicalSignUp({
  name: string,
  email: string,
  password: string,
  dni: string,
  dniType: number,
  privilege: number,
  commission: number
}, context: object | ContextFunction<ExpressContext, object>): UserDocument {
  const userFromDB = await User.findOne({ email });
  if (userFromDB) {
    throw new Error(`This email is already register`);
  }
  const user = await User.create({ ...args });
  if (user.privilege === 0) {
    // create a client an set the relationship
    const client = new Client({ user: user._id });
    const shopCart = new ShopCart({
      client: client._id,
      items: [],
      paid: false,
    });
    client.shopCart = shopCart._id;
    await Promise.all([
      client.save(),
      shopCart.save(),
      User.findOneAndUpdate(
        { _id: user._id },
        { client: client._id },
        { new: true, runValidators: true }
      ),
    ]);
  }
  const token = jwt.sign(
    {
      id: user._id,
      privilege: user.privilege,
      emission: new Date().toISOString(),
    },
    process.env.SECRET
  );
  context.res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 yr in ms
  });
  context.setCookies.push({
    name: 'token',
    value: token,
    options: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 yr in ms
    },
  });
  return user;
}
```

Ahora integramos esta función, a los requerimiento de la librería de GraphQL

```TypeScript
const signUp = schemaComposer.createResolver({
  name: 'signUp',
  type: UserTC.getType(),
  description: 'Sign Up for a new user in the db',
  kind: 'mutation',
  args: {
    name: 'String!',
    email: 'String!',
    password: 'String!',
    dni: 'String!',
    dniType: 'Int!',
    privilege: 'Int!',
    commission: 'Float',
  },
  resolve: async ({ args, context }) => {
    // args: the un object con los tipos que se presentan en att args que esta justo arriba;
    return LogicalSignUp(args, context);
  },
});
```

Al final, tenemos que exportar esta nueva función `SignUp`, quedando el archivo final de esta forma:

```TypeScript
import jwt from 'jsonwebtoken';
import { schemaComposer } from 'graphql-compose';
import {
  UserTC,
  User,
  Client,
  ShopCart,
} from '../models';

const signUp = schemaComposer.createResolver({
  name: 'signUp',
  type: UserTC.getType(),
  description: 'Sign Up for a new user in the db',
  kind: 'mutation',
  args: {
    name: 'String!',
    email: 'String!',
    password: 'String!',
    dni: 'String!',
    dniType: 'Int!',
    privilege: 'Int!',
    commission: 'Float',
  },
  resolve: async ({ args, context }) => {
    const { email } = args;
    const userFromDB = await User.findOne({ email });
    if (userFromDB) {
      throw new Error(`This email is already register`);
    }
    const user = await User.create({ ...args });
    if (user.privilege === 0) {
      // create a client an set the relationship
      const client = new Client({ user: user._id });
      const shopCart = new ShopCart({
        client: client._id,
        items: [],
        paid: false,
      });
      client.shopCart = shopCart._id;
      await Promise.all([
        client.save(),
        shopCart.save(),
        User.findOneAndUpdate(
          { _id: user._id },
          { client: client._id },
          { new: true, runValidators: true }
        ),
      ]);
    }
    const token = jwt.sign(
      {
        id: user._id,
        privilege: user.privilege,
        emission: new Date().toISOString(),
      },
      process.env.SECRET
    );
    context.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 yr in ms
    });
    context.setCookies.push({
      name: 'token',
      value: token,
      options: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 yr in ms
      },
    });
    return user;
  },
});

export default {
  signUp,
};
```

Una vez hayamos terminado, nuestro trabajo en este archivo debemos ir al archivo `src/graphql/schema.ts` y verificar que los archivos `CustomMutation.ts` y `CustomQuery.ts` hayan sido importados a `schema.ts` y que su contenido haya sido agregado a Schema, el cual debería verse así:

```TypeScript
import { schemaComposer } from 'graphql-compose';
import Query from './Query';
import Mutation from './Mutation';
import CustomMutation from './CustomMutation';
import CustomQuery from './CustomQuery';

schemaComposer.Query.addFields({
  ...Query,
  ...CustomQuery
});

schemaComposer.Mutation.addFields({
  ...Mutation,
  ...CustomMutation,
});

const schema = schemaComposer.buildSchema();

export default schema;
```

## Notas Finales

Este repositorio es un esfuerzo colaborativo de [@avilatek](https://avilatek.co) cualquier duda que puedan tener, pueden preguntarla a traves de mi correo corporativo jose@avilatek.dev, de mi twitter [@quevedodev](https://twitter.com/quevedodev) o de manera presencial en la oficina, si encuentran un error o una forma de mejorar esta plantilla los Pull Request y los Issues son bienvenidos.

## Agradecimientos

1. [Avila Tek](https://avilatek.dev)
2. [Luis Eduardo Bello](https://www.linkedin.com/in/luis-eduardo-bello-mila-de-la-roca-7292661a0/)
3. [Rocco de Fina]()
4. [Jose Roberto Quevedo](https://jrquevedog.now.sh)
5. All Libraries Author 💖

## Disclaimer

Este proyecto/configuración, esta basado en el conocimiento colectivo que hemos adquirido tras la experiencia, sin embargo, hay una gran cantidad de proyectos y/o librerías que han ayudado a solidificar la configuración de este proyecto:

1. [TypeScript Node Starter](https://github.com/microsoft/TypeScript-Node-Starter)
2. [Wes Bos Learn Node](https://github.com/wesbos/Learn-Node)
