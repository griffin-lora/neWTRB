import { Tool } from "../Tool"
import { Workspace, RunService } from "rbx-services"
import { Remote } from "../Remote"
import { EntityDatum, ComponentDatum } from "../../shared/settings"
import { Selector } from "./Selector"
import { mouse, playerGui } from "../player"
import { Unknown } from "../../shared/Unknown"
import * as Roact from "rbx-roact"
import { ConfigGui } from "../components/ConfigGui"
import { localManager } from "../localManager"
import { globalManager } from "../../shared/globalManager"
import { ConfigProps } from "../../server/components/Config"

const entities = Workspace.entities as Folder
const getEntityDatumRemote = new Remote("getEntityDatum")

class ConfigEntity {

    constructor(model: Model, configDatum: ComponentDatum) {

        this.model = model
        this.configDatum = configDatum

        this.selectionBox = new Instance("SelectionBox")
        this.selectionBox.Color3 = Color3.fromRGB(0, 0, 255)
        this.selectionBox.Adornee = model
        this.selectionBox.Parent = model

    }

    model: Model
    configDatum: ComponentDatum
    selectionBox: SelectionBox

}

export default class Configurer extends Tool {
    
    constructor() {

        super("configurer", "http://www.roblox.com/asset/?id=59102714")

        let models = entities.GetChildren()

        spawn(() => {

            while (true) {

                models.forEach(model => {
                    
                    this.addConfigEntity(model)
        
                })
                
                models = []

                RunService.RenderStepped.Wait()

            }

        })

        entities.ChildAdded.Connect(model => {
            
            models.push(model)

        })

        mouse.Button1Up.Connect(() => {

            const configEntity = this.getSelected()
            
            if (configEntity && configEntity !== this.configEntity) {
                
                this.configEntity = configEntity

                if (this.handle) {

                    this.gui = undefined

                    Roact.unmount(this.handle)
                    this.handle = undefined

                }

                let entityDatum: EntityDatum | undefined
                
                getEntityDatumRemote.clear()

                getEntityDatumRemote.event((receivedEntityDatum: unknown, ...args: unknown[]) => {
                    
                    if (typeIs(receivedEntityDatum, "table")) {
                        
                        entityDatum = receivedEntityDatum as EntityDatum
                        
                    }

                })
                
                getEntityDatumRemote.fire(configEntity.model.entityId.Value)
                
                do {
                    
                    RunService.Stepped.Wait()

                } while (!entityDatum)

                if (entityDatum && typeIs(entityDatum, "table")) {
                    
                    entityDatum = entityDatum as EntityDatum

                    entityDatum.components.forEach(componentDatum => {
                        
                        if (componentDatum.name === "Config") {
                            
                            configEntity.configDatum = componentDatum

                        }

                    })

                    const props = configEntity.configDatum.props as ConfigProps

                    this.gui = Roact.createElement(ConfigGui, { configurer: this, configTypes: props.configTypes, configValues: props.configValues, model: configEntity.model, submit: (configValues: Unknown<unknown>) => {

                        const newConfigValues = {} as Unknown<unknown>

                        const entries = Object.entries(configValues)

                        entries.forEach(entry => {

                            const name = entry[0]
                            let value = entry[1]
                            const configType = props.configTypes[name]

                            if (configType) {

                                if (configType.name === "number" || configType.name === "NumberConstrained") {

                                    value = tonumber(value)

                                } else if (configType.name === "Option") {

                                    const data = configType.data as Array<string>

                                    data.forEach((option, index) => {

                                        if (value === option) {

                                            value = index

                                        }

                                    })

                                }

                            }

                            newConfigValues[name] = value

                        })

                        props.configValues = newConfigValues

                        const entityId = configEntity.model.entityId.Value

                        const newEntries = Object.entries(newConfigValues)

                        newEntries.forEach(entry => {

                            const name = entry[0]
                            const value = entry[1]

                            this.fire(entityId, name, value)

                        })

                    }})

                    this.handle = Roact.mount(this.gui, playerGui)
                    
                }

            } else if (configEntity !== this.configEntity) {

                this.configEntity = undefined

            }

        })

    }

    addConfigEntity(model: Instance) {

        if (model.IsA("Model") && model.Parent) {

            let valid = true

            const primaryPart = model.PrimaryPart as BasePart

            if (localManager.area) {

                valid = globalManager.isInArea(localManager.area, primaryPart.CFrame)

            }

            if (valid) {

                let entityDatum: EntityDatum | undefined
                
                getEntityDatumRemote.clear()

                getEntityDatumRemote.event((receivedEntityDatum: unknown, ...args: unknown[]) => {
                    
                    if (typeIs(receivedEntityDatum, "table")) {
                        
                        entityDatum = receivedEntityDatum as EntityDatum
                        
                    }

                })
                
                getEntityDatumRemote.fire(model.WaitForChild("entityId").Value)
                
                do {
                    
                    RunService.Stepped.Wait()

                } while (!entityDatum)
                
                if (entityDatum && typeIs(entityDatum, "table")) {
                    
                    entityDatum = entityDatum as EntityDatum

                    let configDatum: ComponentDatum | undefined

                    entityDatum.components.forEach(componentDatum => {
                        
                        if (componentDatum.name === "Config") {
                            
                            configDatum = componentDatum

                        }

                    })

                    if (configDatum) {
                        
                        const configEntity = new ConfigEntity(model, configDatum)
                        configEntity.selectionBox.Visible = this.equipped

                        this.configEntities.push(configEntity)

                    }

                }

            }

        }

    }

    getSelected(): ConfigEntity | undefined {

        const selected = Selector.getSelected(this)

        let actualConfigEntity: ConfigEntity | undefined

        this.configEntities.forEach(configEntity => {
            
            if (configEntity.model === selected) {

                actualConfigEntity = configEntity
                
            }

        })

        return actualConfigEntity

    }

    equip() {

        super.equip()

        this.configEntities.forEach(configEntity => {

            configEntity.selectionBox.Visible = true

        })
        
    }

    unequip() {

        super.unequip()

        this.configEntities.forEach(configEntity => {

            configEntity.selectionBox.Visible = false

        })

        this.configEntity = undefined

        if (this.handle) {

            this.gui = undefined

            Roact.unmount(this.handle)
            this.handle = undefined

        }

    }

    configEntities = new Array<ConfigEntity>()
    configEntity: ConfigEntity | undefined
    gui: Roact.Element | undefined
    handle: Roact.ComponentInstanceHandle | undefined

}