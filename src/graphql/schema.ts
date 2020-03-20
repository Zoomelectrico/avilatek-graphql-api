import { schemaComposer } from 'graphql-compose';
import Query from './Query';
import Mutation from './Mutation';
import CustomMutation from './CustomMutation';
import CustomQuery from './CustomQuery';

schemaComposer.Query.addFields({
  ...Query,
  ...CustomQuery,
});

schemaComposer.Mutation.addFields({
  ...Mutation,
  ...CustomMutation,
});

const schema = schemaComposer.buildSchema();

export default schema;
