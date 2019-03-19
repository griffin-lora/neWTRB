import { options, Options } from "./options"
import { Entity } from "./Entity"

class GameManager {

    constructor(options: Options) {

        
        
    }

    createEntity() {

        const entity = new Entity()

        this.entities.push(entity)
        
    }

    entities = new Array<Entity>()

}

export const gameManager = new GameManager(options)