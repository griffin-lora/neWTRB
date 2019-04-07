import { RunService } from "rbx-services"
import { localManager } from "./localManager"
import { Entity } from "./Entity"

export class Cleaner {

    constructor() {
        
        RunService.Stepped.Connect(() => {

            let areaEntities = new Array<Entity>()
        
            localManager.areas.forEach(area => {
                
                area.getEntities().forEach(areaEntity => {

                    areaEntities.push(areaEntity)

                })
                
            })

            const entities = new Array<Entity>()

            localManager.entities.forEach(entity => {

                entities.push(entity)

            })

            entities.forEach(entity => {

                let found = false
                
                areaEntities.forEach(areaEntity => {
                    
                    if (entity === areaEntity) {
                        
                        found = true

                    }

                })

                if (!found) {

                    localManager.destroyEntity(entity)

                }
                
            })

        })

    }
    
}