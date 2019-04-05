import { Area } from "./Area"
import { EntitySetting, ComponentSetting, settings } from "../shared/settings"
import { Entity } from "./Entity"
import { ReplicatedStorage, HttpService, ServerScriptService } from "rbx-services"
import { Export } from "../shared/Export"
import { Component } from "./Component"
import { Unknown } from "../shared/Unknown"
import Core, { CoreProps } from "./components/Core"
import { Remote } from "./Remote"
import { Tool } from "./Tool"
import inspect from "rbx-inspect";
const tools = ServerScriptService.server.tools

const components = ServerScriptService.server.components

class LocalManager {

    constructor() {



    }

    playerConnect(player: Player) {

        let found = false

        this.areas.forEach(area => {

            if (!found && !area.player) {

                found = true

                area.player = player
                area.load()

                this.joinRemote.fire(player, area.model)

            }

        })

    }

    playerDisconnect(player: Player) {

        const area = this.getAreaByPlayer(player)
        
        area.player = undefined
        
        area.clear()

    }

    addArea(area: Area) {

        this.areas.push(area)

    }

    getAreaByPlayer(player: Player): Area {

        let actualArea = undefined

        this.areas.forEach(area => {

            if (player === area.player) {

                actualArea = area

            }

        })

        if (actualArea) {

            return actualArea

        } else {

            throw `invalid player. Player is ${ player.Name }`

        }

    }

    createEntity(entitySetting: EntitySetting) {
        
        const entity = new Entity({ name: entitySetting.name, displayName: entitySetting.displayName, components: new Array<ComponentSetting>() } as EntitySetting)

        this.entities.push(entity)

        let hasCore = false

        entitySetting.components.forEach(componentSetting => {

            if (componentSetting.name === "Core") {

                hasCore = true

            }

        })
        
        if (!hasCore) {
            
            this.addComponent(entity, { name: "Core", props: { id: HttpService.GenerateGUID() } })
            
        }

        entitySetting.components.forEach(componentSetting => {

            this.addComponent(entity, componentSetting)

        })

        return entity

    }

    getComponentByName(name: string) {

        const componentModule = components[name] as ModuleScript
        const componentExport = require(componentModule) as Export
        const componentClass = componentExport._default as typeof Component
        
        return componentClass

    }

    clone<T>(object: T) {

        const newObject = {} as T

        const entries = Object.entries(object)

        entries.forEach(entry => {

            const key = entry[0]
            let value = entry[1]

            if (typeIs(value, "table")) {

                value = this.clone(value)

            }
            
            newObject[key] = value

        })

        return newObject

    }
    
    addComponent(entity: Entity, componentSetting: ComponentSetting) {
        
        const props = this.clone<Unknown<unknown>>(componentSetting.props) as Unknown<unknown>
        
        const newComponentSetting = { name: componentSetting.name, props: props }
        
        entity.entitySetting.components.push(newComponentSetting)

        const componentClass = this.getComponentByName(componentSetting.name)
        
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

            throw `invalid entity id. Id is ${ id }`

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

    requireTools() {
        
        settings.tools.forEach(toolSetting => {

            const toolModule = tools[toolSetting.name] as ModuleScript
            const toolExport = require(toolModule) as Export
            const toolClass = toolExport._default as typeof Tool

            new toolClass("")

        })

    }

    entities = new Array<Entity>()

    areas = new Array<Area>()

    joinRemote = new Remote("join")

}

export const localManager = new LocalManager()