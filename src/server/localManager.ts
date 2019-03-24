import { Area } from "./Area"
import { EntitySetting } from "../shared/settings"
import { Entity } from "./Entity"
import { ReplicatedStorage } from "rbx-services"
import { Export } from "../shared/Export"
import { Component } from "./Component"
import { Unknown } from "../shared/Unknown";

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
        
        entitySetting.components.forEach(componentSetting => {

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

        })

        return entity

    }

    areas = new Array<Area>()

}

export const localManager = new LocalManager()