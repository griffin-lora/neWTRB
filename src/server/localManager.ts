import { Area } from "./Area"
import { EntitySetting, ComponentSetting } from "../shared/settings"
import { Entity } from "./Entity"
import { ReplicatedStorage, HttpService } from "rbx-services"
import { Export } from "../shared/Export"
import { Component } from "./Component"
import { Unknown } from "../shared/Unknown"
import Core, { CoreProps } from "./components/Core"

const components = ReplicatedStorage.server.components

class LocalManager {

    constructor() {



    }

    playerConnect() {



    }

    playerDisconnect() {



    }

    place() {



    }

    addArea(area: Area) {

        this.areas.push(area)

    }

    createEntity(entitySetting: EntitySetting) {

        const entity = new Entity()

        this.entities.push(entity)
        
        this.addComponent(entity, { name: "Core", props: { id: HttpService.GenerateGUID() } })
        
        entitySetting.components.forEach(componentSetting => {

            this.addComponent(entity, componentSetting)

        })

        return entity

    }
    
    addComponent(entity: Entity, componentSetting: ComponentSetting) {

        const props = {} as Unknown

        const entries = Object.entries(componentSetting.props)

        entries.forEach(entry => {

            const key = entry[0]
            const value = entry[1]

            props[key] = value

        })

        const componentModule = components[componentSetting.name] as ModuleScript
        const componentExport = require(componentModule) as Export
        const componentClass = componentExport._default as typeof Component
        
        entity.components.set(componentClass, new componentClass(entity, props))

    }

    getEntityById(id: string): Entity {

        let actualEntity: Entity | undefined

        this.entities.forEach(entity => {

            const core = entity.components.get(Core)

            if (core) {

                const props = core.props as CoreProps
                
                if (props.id === id) {

                    actualEntity = entity

                }

            }

        })

        if (actualEntity) {

            return actualEntity

        } else {

            throw `Invalid entity id. Id is ${id}`

        }

    }

    destroyEntity(entity: Entity) {

        entity.components.forEach(component => {

            component.destroy()

        })

        this.entities.forEach((otherEntity, index) => {

            if (otherEntity === entity) {

                this.entities.remove(index)

            }

        })

    }

    entities = new Array<Entity>()

    areas = new Array<Area>()

}

export const localManager = new LocalManager()