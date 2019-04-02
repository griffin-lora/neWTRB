import { ReplicatedStorage, Workspace } from "rbx-services"
import { settings, EntitySetting, ComponentSetting } from "../shared/settings"
import { localManager } from "./localManager"
import Render, { RenderProps } from "./components/Render"
import { globalManager } from "../shared/globalManager"
import * as DataStore2 from "rbx-datastore2"
import inspect from "rbx-inspect"
import { Unknown } from "../shared/Unknown"
import Core, { CoreProps } from "./components/Core"
import { Entity } from "./Entity"

const model = ReplicatedStorage.assets.area
const areas = Workspace.areas

export interface Save {

    entities: Array<EntitySetting>

}

export interface Serialized {

    type: string
    value: unknown
    
}

export interface ComponentSettingSerialized {

    name: string
    props: Unknown

}

export interface EntitySettingSerialized {

    components: Array<ComponentSettingSerialized>
    
}

export interface SaveSerialized {

    entities: Array<EntitySettingSerialized>

}

export class Area {

    constructor(cframe: CFrame) {

        this.model = model.Clone() as Model

        this.model.SetPrimaryPartCFrame(cframe)

        this.model.Parent = areas

    }

    getEntities() {

        const areaEntities = new Array<Entity>()

        localManager.entities.forEach(entity => {

            const core = entity.components.get(Core)
            const render = entity.components.get(Render)
            
            if (core && render) {
                
                const coreProps = core.props as CoreProps
                const renderProps = render.props as RenderProps
                
                if (globalManager.isInArea(this.model, renderProps.cframe)) {
                    
                    areaEntities.push(entity)

                }

            }

        })

        return areaEntities

    }

    createSave() {

        const save = {

            entities: new Array<EntitySetting>()

        } as Save

        const areaEntities = this.getEntities()

        areaEntities.forEach(entity => {

            save.entities.push(entity.entitySetting)

        })

        return save

    }

    getPath(instance: Instance | undefined, path: Array<string>): Array<string> {

        if (instance && instance !== game) {

            path.unshift(instance.Name)

            return this.getPath(instance.Parent, path)

        } else {

            return path

        }

    }

    serialize(save: Save) {

        const saveSerialized = { entities: [] } as SaveSerialized

        save.entities.forEach(entitySetting => {

            const entitySettingSerialized = { components: [] } as EntitySettingSerialized
            
            entitySetting.components.forEach(componentSetting => {

                const componentSettingSerialized = { name: componentSetting.name, props: {} as Unknown } as ComponentSettingSerialized

                const entries = Object.entries(componentSetting.props)

                entries.forEach(entry => {

                    const key = entry[0]
                    const value = entry[1]

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

                    componentSettingSerialized.props[key] = serialized

                })

                entitySettingSerialized.components.push(componentSettingSerialized)

            })

            saveSerialized.entities.push(entitySettingSerialized)
            

        })

        return saveSerialized

    }

    deserialize(saveSerialized: SaveSerialized) {

        const save = { entities: [] } as Save

        saveSerialized.entities.forEach(entitySettingSerialized => {

            const entitySetting = { name: "", displayName: "", smallImage: "", largeImage: "", category: "", components: [] } as EntitySetting
            
            entitySettingSerialized.components.forEach(componentSettingSerialized => {

                const componentSetting = { name: componentSettingSerialized.name, props: {} as Unknown } as ComponentSetting

                const entries = Object.entries(componentSettingSerialized.props)

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

                    componentSetting.props[key] = value

                })

                entitySetting.components.push(componentSetting)

            })

            save.entities.push(entitySetting)

        })
        
        return save

    }

    save() {

        if (this.player) {

            const dataStore = DataStore2<SaveSerialized>(settings.dataStoreKey, this.player)

            const saveSerialized = this.serialize(this.createSave())
            
            dataStore.Set(saveSerialized)
            
        }

    }

    load() {
        
        if (this.player) {
            
            const dataStore = DataStore2<SaveSerialized>(settings.dataStoreKey, this.player)
            
            const saveSerialized = dataStore.Get()

            let save: Save

            if (saveSerialized) {

                save = this.deserialize(saveSerialized)

            } else {

                save = this.createSave()

            }
            
            save.entities.forEach(entitySetting => {
                
                localManager.createEntity(entitySetting)
                
            })

        }
        
    }

    clear() {

        const areaEntities = this.getEntities()

        areaEntities.forEach(entity => {

            localManager.destroyEntity(entity)

        })

    }

    model: Model
    player: Player | undefined

}