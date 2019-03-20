import { options, Options } from "./options"
import { Entity } from "./Entity"

class GameManager {

    constructor(options: Options) {

        
        
    }

    createEntity(entityClass: typeof Entity | undefined) {

        let entity
        
        if (entityClass) {

            entity = new entityClass()

        } else {

            entity = new Entity()

        }

        this.entities.push(entity)

        return entity
        
    }

    entities = new Array<Entity>()

}

export const gameManager = new GameManager(options)