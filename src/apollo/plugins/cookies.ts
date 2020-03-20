import cookie from 'cookie';
import { CookieOptions } from 'express';
import {
  GraphQLServiceContext,
  GraphQLRequestContext,
  GraphQLRequest,
  GraphQLResponse,
  ValueOrPromise,
  WithRequired,
} from 'apollo-server-types';

export interface ApolloServerPlugin<
  TContext extends Record<string, any> = Record<string, any>
> {
  serverWillStart?(service: GraphQLServiceContext): ValueOrPromise<void>;
  requestDidStart?(
    requestContext: GraphQLRequestContext<TContext>
  ): GraphQLRequestListener<TContext> | void;
}

export interface GraphQLRequestListener<TContext = Record<string, any>> {
  parsingDidStart?(
    requestContext: WithRequired<
      GraphQLRequestContext<TContext>,
      'metrics' | 'source'
    >
  ): ((err?: Error) => void) | void;
  validationDidStart?(
    requestContext: WithRequired<
      GraphQLRequestContext<TContext>,
      'metrics' | 'source' | 'document'
    >
  ): ((err?: ReadonlyArray<Error>) => void) | void;
  didResolveOperation?(
    requestContext: WithRequired<
      GraphQLRequestContext<TContext>,
      'metrics' | 'source' | 'document' | 'operationName' | 'operation'
    >
  ): ValueOrPromise<void>;
  didEncounterErrors?(
    requestContext: WithRequired<
      GraphQLRequestContext<TContext>,
      'metrics' | 'source' | 'errors'
    >
  ): ValueOrPromise<void>;
  // If this hook is defined, it is invoked immediately before GraphQL execution
  // would take place. If its return value resolves to a non-null
  // GraphQLResponse, that result is used instead of executing the query.
  // Hooks from different plugins are invoked in series and the first non-null
  // response is used.
  responseForOperation?(
    requestContext: WithRequired<
      GraphQLRequestContext<TContext>,
      'metrics' | 'source' | 'document' | 'operationName' | 'operation'
    >
  ): ValueOrPromise<GraphQLResponse | null>;
  executionDidStart?(
    requestContext: WithRequired<
      GraphQLRequestContext<TContext>,
      'metrics' | 'source' | 'document' | 'operationName' | 'operation'
    >
  ): ((err?: Error) => void) | void;
  willSendResponse?(
    requestContext: WithRequired<
      GraphQLRequestContext<TContext>,
      'metrics' | 'response'
    >
  ): ValueOrPromise<void>;
}

const Plugin: ApolloServerPlugin = {
  requestDidStart() {
    return {
      willSendResponse(requestContext: GraphQLRequestContext) {
        const { setHeaders, setCookies } = requestContext.context;
        if (setCookies.length > 1) {
          throw new Error(
            'multiple cookies in setCookies provided but because of limitations in apollo-server only one cookie can be set'
          );
        }
        setHeaders.forEach(({ key, value }: { key: string; value: string }) => {
          requestContext.response.http.headers.append(key, value);
        });
        setCookies.forEach(
          ({
            name,
            value,
            options,
          }: {
            name: string;
            value: any;
            options: CookieOptions;
          }) => {
            const cookieString = cookie.serialize(name, value, options);
            requestContext.response.http.headers.set(
              'Set-Cookie',
              cookieString
            );
          }
        );
        // return requestContext;
      },
    };
  },
};

export default Plugin;
