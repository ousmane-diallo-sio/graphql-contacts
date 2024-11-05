import { OptionalProps, PrimaryKey, Property } from '@mikro-orm/postgresql';
import { v4 as uuidv4 } from 'uuid';

// see: https://mikro-orm.io/docs/guide/relationships#custom-base-entity
export abstract class BaseEntity<Optional = never> {

  /*
    see :
      - https://mikro-orm.io/docs/guide/relationships#creating-entity-graph
      - https://mikro-orm.io/docs/guide/relationships#generics-to-the-rescue
  */
  [OptionalProps]?: 'createdAt' | 'updatedAt' | Optional;

  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

}