import { Tool } from "../Tool"
import { Workspace, RunService } from "rbx-services"
import { localManager } from "../localManager"
import { globalManager } from "../../shared/globalManager"
import { EntityDatum, ComponentDatum } from "../../shared/settings";
import { Remote } from "../Remote"
import { wirerMode } from "../../shared/enum"
import { mouse, playerGui, getCharacter } from "../player"
import { Selector } from "./Selector"

const entities = Workspace.entities as Folder
const getEntityDatumRemote = new Remote("getEntityDatum")

class SourceEntity {

    constructor(model: Model, sourceDatum: ComponentDatum) {

        this.model = model
        this.sourceDatum = sourceDatum
        
        this.selectionBox = new Instance("SelectionBox")
        this.selectionBox.Color3 = Color3.fromRGB(218, 133, 65)
        this.selectionBox.Adornee = model
        this.selectionBox.Parent = model

    }

    model: Model
    sourceDatum: ComponentDatum
    selectionBox: SelectionBox

}

class ReceiverEntity {

    constructor(model: Model, receiverDatum: ComponentDatum) {

        this.model = model
        this.receiverDatum = receiverDatum
        
        this.selectionBox = new Instance("SelectionBox")
        this.selectionBox.Color3 = Color3.fromRGB(0, 255, 0)
        this.selectionBox.Adornee = model
        this.selectionBox.Parent = model

    }

    model: Model
    receiverDatum: ComponentDatum
    sourceEntity: SourceEntity | undefined
    selectionBox: SelectionBox

}

export default class Wirer extends Tool {
    
    constructor() {

        super("wirer", "rbxassetid://56954008")

        let models = entities.GetChildren()

        spawn(() => {

            while (true) {

                models.forEach(model => {
                    
                    this.addWireEntity(model)
        
                })
                
                models = []

                RunService.RenderStepped.Wait()

            }

        })

        entities.ChildAdded.Connect(model => {
            
            models.push(model)

        })

        const gui = new Instance("ScreenGui")
        gui.ResetOnSpawn = false
        gui.Parent = playerGui

        const previewWire = new Instance("FloorWire")
        previewWire.Color3 = Color3.fromRGB(17, 17, 17)
        previewWire.Texture = "http://www.roblox.com/asset?id=56954045"
        previewWire.WireRadius = 0.12
        previewWire.Visible = false
        previewWire.Parent = gui

        RunService.RenderStepped.Connect(() => {

            this.sourceEntities.forEach(sourceEntity => {

                sourceEntity.selectionBox.Visible = this.equipped
    
            })

            this.receiverEntities.forEach(receiverEntity => {

                receiverEntity.selectionBox.Visible = this.equipped
    
            })

            if (this.mode === wirerMode.findSource || this.mode === wirerMode.findReceiver) {

                previewWire.From = getCharacter().HumanoidRootPart as BasePart
                
                if (this.sourceEntity) {

                    previewWire.To = this.sourceEntity.model.PrimaryPart as BasePart

                } else if (this.receiverEntity) {

                    previewWire.To = this.receiverEntity.model.PrimaryPart as BasePart

                }

                previewWire.Visible = true

            } else {

                previewWire.Visible = false

            }

        })

        mouse.Button1Up.Connect(() => {

            const sourceEntity = this.getSelectedSource()
            const receiverEntity = this.getSelectedReceiver()

            if (sourceEntity || receiverEntity) {
                
                if (this.mode === wirerMode.none) {

                    if (sourceEntity) {

                        this.startWiringSource(sourceEntity)

                    } else if (receiverEntity) {

                        this.startWiringReceiver(receiverEntity)

                    }

                } else if (this.mode === wirerMode.findReceiver) {

                    if (this.sourceEntity && receiverEntity) {

                        this.fire(this.sourceEntity.model.entityId.Value, receiverEntity.model.entityId.Value)

                        this.stopWiring()

                    }

                } else if (this.mode === wirerMode.findSource) {

                    if (this.receiverEntity && sourceEntity) {

                        this.fire(sourceEntity.model.entityId.Value, this.receiverEntity.model.entityId.Value)

                        this.stopWiring()

                    }

                }

            }

        })

    }

    addWireEntity(model: Instance) {

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

                    let sourceDatum: ComponentDatum | undefined
                    let receiverDatum: ComponentDatum | undefined

                    entityDatum.components.forEach(componentDatum => {
                        
                        if (componentDatum.name === "Source") {
                            
                            sourceDatum = componentDatum

                        } else if (componentDatum.name === "Receiver") {

                            receiverDatum = componentDatum

                        }

                    })

                    if (sourceDatum) {

                        const sourceEntity = new SourceEntity(model, sourceDatum)

                        this.sourceEntities.push(sourceEntity)

                    } else if (receiverDatum) {

                        const receiverEntity = new ReceiverEntity(model, receiverDatum)

                        this.receiverEntities.push(receiverEntity)

                    }

                }

            }

        }
        
    }

    getSelectedSource(): SourceEntity | undefined {

        const selected = Selector.getSelected(this)

        let actualSourceEntity: SourceEntity | undefined

        this.sourceEntities.forEach(sourceEntity => {
            
            if (sourceEntity.model === selected) {

                actualSourceEntity = sourceEntity
                
            }

        })

        return actualSourceEntity

    }

    getSelectedReceiver(): ReceiverEntity | undefined {

        const selected = Selector.getSelected(this)

        let actualReceiverEntity: ReceiverEntity | undefined

        this.receiverEntities.forEach(receiverEntity => {
            
            if (receiverEntity.model === selected) {

                actualReceiverEntity = receiverEntity
                
            }

        })

        return actualReceiverEntity

    }

    startWiringSource(sourceEntity: SourceEntity) {

        this.sourceEntity = sourceEntity
        this.mode = wirerMode.findReceiver

    }

    startWiringReceiver(receiverEntity: ReceiverEntity) {

        this.receiverEntity = receiverEntity
        this.mode = wirerMode.findSource

    }

    stopWiring() {

        this.sourceEntity = undefined
        this.receiverEntity = undefined
        this.mode = wirerMode.none

    }

    equip() {

        super.equip()
        
    }

    unequip() {

        super.unequip()

        this.stopWiring()

    }

    mode = wirerMode.none
    sourceEntities = new Array<SourceEntity>()
    receiverEntities = new Array<ReceiverEntity>()
    sourceEntity: SourceEntity | undefined
    receiverEntity: ReceiverEntity | undefined

}