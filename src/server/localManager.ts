import { Area } from "./Area"
import { EntityDatum, ComponentDatum, settings } from "../shared/settings"
import { Entity } from "./Entity"
import { ReplicatedStorage, HttpService, ServerScriptService } from "rbx-services"
import { Export } from "../shared/Export"
import { Component } from "./Component"
import { Unknown } from "../shared/Unknown"
import Core, { CoreProps } from "./components/Core"
import { Remote } from "./Remote"
import { Tool } from "./Tool"
import { globalManager } from "../shared/globalManager"
import { DataStore } from "./DataStore"

const tools = ServerScriptService.server.tools

const components = ServerScriptService.server.components

const mainStore = new DataStore<SaveSerialized>(settings.dataStoreKey)

export interface Save {

    entities: Array<EntityDatum>

}

export interface Serialized {

    type: string
    value: unknown
    
}

export interface ComponentDatumSerialized {

    name: string
    props: Unknown<unknown>

}

export interface EntityDatumSerialized {

    components: Array<ComponentDatumSerialized>
    
}

export interface SaveSerialized {

    entities: Array<EntityDatumSerialized>

}

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

        if (settings.restricted) {

            const area = this.getAreaByPlayer(player)
            
            area.player = undefined
            
            area.clear()

        }

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

    createEntity(entityDatum: EntityDatum) {
        
        const entity = new Entity({ name: entityDatum.name, displayName: entityDatum.displayName, components: new Array<ComponentDatum>() } as EntityDatum)

        this.entities.push(entity)

        let hasCore = false
        
        entityDatum.components.forEach(componentDatum => {

            if (componentDatum.name === "Core") {

                hasCore = true

            }

        })
        
        if (!hasCore) {
            
            this.addComponent(entity, { name: "Core", props: { id: HttpService.GenerateGUID() } })
            
        }

        entityDatum.components.forEach(componentDatum => {

            this.addComponent(entity, componentDatum)

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
    
    addComponent(entity: Entity, componentDatum: ComponentDatum) {
        
        const props = this.clone<Unknown<unknown>>(componentDatum.props) as Unknown<unknown>
        
        const newComponentDatum = { name: componentDatum.name, props: props }
        
        entity.entityDatum.components.push(newComponentDatum)

        const componentClass = this.getComponentByName(componentDatum.name)
        
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

        entity.exists = false

        entity.components.forEach(component => {

            component.destroy()

        })

        this.entities.forEach((otherEntity, index) => {

            if (otherEntity === entity) {

                this.entities.remove(index)

            }

        })

    }

    getAreaOfEntity(entity: Entity) {

        

    }

    requireTools() {
        
        settings.tools.forEach(toolSetting => {

            const toolModule = tools[toolSetting.name] as ModuleScript
            const toolExport = require(toolModule) as Export
            const toolClass = toolExport._default as typeof Tool

            new toolClass("")

        })

    }

    isValid(cframe: CFrame, player: Player) {

        if (settings.restricted) {

            const area = localManager.getAreaByPlayer(player)

            return globalManager.isInArea(area.model, cframe)

        } else {

            return true

        }

    }

    getPath(instance: Instance | undefined, path: Array<string>): Array<string> {

        if (instance && instance !== game) {

            path.unshift(instance.Name)

            return this.getPath(instance.Parent, path)

        } else {

            return path

        }

    }

    serialize(save: Save, model?: Model) {

        const saveSerialized = { entities: [] } as SaveSerialized

        save.entities.forEach(entityDatum => {

            const entityDatumSerialized = { components: [] } as EntityDatumSerialized
            
            entityDatum.components.forEach(componentDatum => {

                const componentDatumSerialized = { name: componentDatum.name, props: {} as Unknown<unknown> } as ComponentDatumSerialized

                const entries = Object.entries(componentDatum.props)

                entries.forEach(entry => {

                    const key = entry[0]
                    let value = entry[1]

                    if (model && componentDatumSerialized.name === "Render" && key === "cframe" && typeIs(value, "CFrame")) {

                        value = value.sub(model.GetPrimaryPartCFrame().Position)

                    }

                    let serialized: Serialized
                    
                    if (typeIs(value, "CFrame")) {

                        const components = value.components()

                        serialized = { type: "CFrame", value: components } as Serialized

                    } else if (typeIs(value, "Vector3")) {

                        const components = [ value.X, value.Y, value.Z ]

                        serialized = { type: "Vector3", value: components } as Serialized
                    
                    } else if (typeIs(value, "Instance")) {

                        const path = this.getPath(value, new Array<string>())

                        serialized = { type: "Instance", value: path } as Serialized
                        
                    } else {

                        serialized = { type: "", value: value } as Serialized
                        
                    }

                    componentDatumSerialized.props[key] = serialized

                })

                entityDatumSerialized.components.push(componentDatumSerialized)

            })

            saveSerialized.entities.push(entityDatumSerialized)
            

        })

        return saveSerialized

    }

    deserialize(saveSerialized: SaveSerialized, model?: Model) {

        const save = { entities: [] } as Save

        saveSerialized.entities.forEach(entityDatumSerialized => {

            const entityDatum = { name: "", displayName: "", smallImage: "", largeImage: "", category: "", components: [] } as EntityDatum
            
            entityDatumSerialized.components.forEach(componentDatumSerialized => {

                const componentDatum = { name: componentDatumSerialized.name, props: {} as Unknown<unknown> } as ComponentDatum

                const entries = Object.entries(componentDatumSerialized.props)

                entries.forEach(entry => {

                    const key = entry[0]
                    const serialized = entry[1] as Serialized

                    let value: unknown

                    if (serialized.type === "CFrame") {

                        const components = serialized.value as Array<number>

                        value = new CFrame(components[0], components[1], components[2], components[3], components[4], components[5], components[6], components[7], components[8], components[9], components[10], components[11])

                    } else if (serialized.type === "Vector3") {

                        const components = serialized.value as Array<number>

                        value = new Vector3(components[0], components[1], components[2])

                    } else if (serialized.type === "Instance") {

                        const path = serialized.value as Array<string>

                        let instance = game as Instance

                        path.forEach(name => {

                            instance = instance[name]

                        })

                        value = instance

                    } else {

                        value = serialized.value

                    }

                    if (model && componentDatum.name === "Render" && key === "cframe" && typeIs(value, "CFrame")) {
                        
                        value = value.add(model.GetPrimaryPartCFrame().Position)
                        
                    }

                    componentDatum.props[key] = value

                })

                entityDatum.components.push(componentDatum)

            })

            save.entities.push(entityDatum)

        })
        
        return save

    }

    save(player: Player) {

        if (settings.saves) {

            if (settings.restricted) {
                                    
                const area = localManager.getAreaByPlayer(player)
                
                area.save()

            } else {

                const entities = new Array<EntityDatum>()

                this.entities.forEach(entity => {

                    const entityDatum = entity.entityDatum

                    entities.push(entityDatum)

                })

                const save = { entities: entities } as Save

                const saveSerialized = this.serialize(save)

                mainStore.set(saveSerialized)

            }

        }

    }

    load() {

        const saveSerialized = mainStore.get()

        let save: Save
        
        if (saveSerialized) {

            save = this.deserialize(saveSerialized)

        } else {

            save = { entities: [] }

        }
        
        save.entities.forEach(entityDatum => {
            
            this.createEntity(entityDatum)
            
        })

    }

    entities = new Array<Entity>()

    areas = new Array<Area>()

    joinRemote = new Remote("join")

}

export const localManager = new LocalManager()