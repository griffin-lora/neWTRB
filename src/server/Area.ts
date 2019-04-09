import { ReplicatedStorage, Workspace } from "rbx-services"
import { settings, EntityDatum, ComponentDatum } from "../shared/settings"
import { localManager, Save, SaveSerialized } from "./localManager"
import Render, { RenderProps } from "./components/Render"
import { globalManager } from "../shared/globalManager"
import * as DataStore2 from "rbx-datastore2"
import inspect from "rbx-inspect"
import { Unknown } from "../shared/Unknown"
import Core, { CoreProps } from "./components/Core"
import { Entity } from "./Entity"

const model = ReplicatedStorage.assets.area
const areas = Workspace.areas

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

            entities: new Array<EntityDatum>()

        } as Save

        const areaEntities = this.getEntities()

        areaEntities.forEach(entity => {

            save.entities.push(entity.entityDatum)

        })

        return save

    }
    
    save() {

        if (this.player) {

            const dataStore = DataStore2<SaveSerialized>(settings.dataStoreKey, this.player)

            const saveSerialized = localManager.serialize(this.createSave(), this.model)
            
            dataStore.Set(saveSerialized)
            
        }

    }

    load() {
        
        if (this.player) {
            
            const dataStore = DataStore2<SaveSerialized>(settings.dataStoreKey, this.player)
            
            const saveSerialized = dataStore.Get()
            
            let save: Save
            
            if (saveSerialized) {

                save = localManager.deserialize(saveSerialized, this.model)

            } else {

                save = this.createSave()

            }
            
            save.entities.forEach(entityDatum => {
                
                localManager.createEntity(entityDatum)
                
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