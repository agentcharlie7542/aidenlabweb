import { type SchemaTypeDefinition } from 'sanity';
import caseStudy from './schemas/caseStudy';
import insight from './schemas/insight';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [caseStudy, insight],
};
