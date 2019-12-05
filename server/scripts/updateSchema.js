import fs from 'fs';
import path from 'path';
import { getSchema } from '../graphql/schema/schema';
import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
  const schema = await getSchema();
  const result = await (graphql(schema, introspectionQuery));
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, '../../data/schema.json'),
      JSON.stringify(result, null, 2)
    );
    fs.writeFileSync(
      path.join(__dirname, '../../data/schema.graphql'),
      printSchema(schema)
    );
    process.exit(0);
  }
})();


