import { Tool } from "../Tool"
import { localManager } from "../localManager"

export default class Deleter extends Tool {
    
    constructor() {

        super("deleter")

    }

    event(player: Player, id: unknown, ...args: unknown[]) {

        super.event(player, id, ...args)
        
        if (typeIs(id, "string")) {
            
            const entity = localManager.getEntityById(id)

            localManager.destroyEntity(entity)

        }

    }

}