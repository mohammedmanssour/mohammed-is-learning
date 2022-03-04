import { GraphQLClient } from 'graphql-hooks';

const defaultOpts = { useCache: true };

export default async function graphQLRequest(
  client: GraphQLClient,
  query: any,
  options: any
) {
  const opts = { ...defaultOpts, ...options };
  const operation = {
    query,
    variables: opts.variables,
    operationName: opts.operationName,
    persisted: opts.persisted,
  };

  if (opts.persisted || (client.useGETForQueries && !opts.isMutation)) {
    opts.fetchOptionsOverrides = {
      ...opts.fetchOptionsOverrides,
      method: 'GET',
    };
  }

  const cacheValue = await client.request(operation, opts);

  return cacheValue;
}
