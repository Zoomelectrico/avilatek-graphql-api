import dotenv from 'dotenv';
dotenv.config({ path: './src/variables.env' });
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import app from './app';
import HTTPHeaderPlugin from './apollo/plugins/cookies';
import schema from './graphql/schema';

mongoose.Promise = global.Promise;

mongoose
  .connect(String(process.env.DATABASE), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`🤩🍃 MongoDB is Running`);
  })
  .catch(err => {
    console.log(`❌🤬 ${err}`);
    process.exit();
  });

mongoose.connection.on('error', err => `❌🤬❌🤬 ${err}`);

const PORT = Number(process.env.PORT);

const server: ApolloServer = new ApolloServer({
  schema,
  introspection: true,
  tracing: true,
  plugins: [HTTPHeaderPlugin],
  context: integrationContext => ({
    req: integrationContext.req,
    res: integrationContext.res,
    setCookies: [],
    setHeaders: [],
  }),
});

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: [process.env.CLIENT_URL, process.env.DASHBOARD_URL],
  },
});

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
