import { Tool } from "../Tool"
import * as Roact from "rbx-roact"
import { StamperGui } from "../components/StamperGui"
import { Players, UserInputService, RunService, Workspace } from "rbx-services"
import { stamperMode, placementType } from "../../shared/enum"
import { Preview } from "../Preview"
import { playerGui, mouse } from "../player"
import { localManager } from "../localManager"
import { globalManager } from "../../shared/globalManager"
import { EntityDatum, settings } from "../../shared/settings"
import { RenderProps } from "../../server/components/Render"
import { CoreProps } from "../../server/components/Core"
import { Selector } from "./Selector"
import { Remote } from "../Remote"

const getEntityDatumRemote = new Remote("getEntityDatum")

export default class Stamper extends Tool {
    
    constructor() {

        super("stamper", "rbxassetid://59102781")

        this.gui = Roact.createElement(StamperGui, { stamper: this })
        Roact.mount(this.gui, playerGui)

        const gui = new Instance("ScreenGui")
        gui.ResetOnSpawn = false

        const selectionBox = new Instance("SelectionBox")
        selectionBox.Color3 = Color3.fromRGB(40, 127, 71)
        selectionBox.Parent = gui

        gui.Parent = playerGui
        
        RunService.RenderStepped.Connect(() => {
            
            if (this.equipped && this.mode === stamperMode.placing) {

                mouse.Icon = "rbxassetid://66887745"

            } else if (mouse.Icon === "rbxassetid://66887745") {

                mouse.Icon = ""

            }

            if (this.equipped && !this.inserting && this.mode === stamperMode.cloning) {

                const selected = Selector.getSelected(this)
                
                selectionBox.Adornee = selected
                
            } else {

                selectionBox.Adornee = undefined

            }       

        })
        
        UserInputService.InputBegan.Connect((input, gameProcessedEvent) => {
            
            if (!gameProcessedEvent && this.equipped) {
                
                if (input.KeyCode === Enum.KeyCode.Q) {

                    this.inserting = !this.inserting

                } else if (input.KeyCode === Enum.KeyCode.E) {

                    this.inserting = false
                    this.startCloning()

                }

            }

        })

        mouse.Button1Up.Connect(() => {

            if (this.equipped && !this.inserting && this.mode === stamperMode.cloning) {

                const selected = Selector.getSelected(this)

                if (selected) {

                    let entityDatum: EntityDatum | undefined
                    
                    getEntityDatumRemote.clear()

                    getEntityDatumRemote.event((receivedEntityDatum: unknown, ...args: unknown[]) => {
                        
                        if (typeIs(receivedEntityDatum, "table")) {
                            
                            entityDatum = receivedEntityDatum as EntityDatum
                            
                        }

                    })
                    
                    getEntityDatumRemote.fire(selected.entityId.Value)
                    
                    do {
                        
                        RunService.Stepped.Wait()

                    } while (!entityDatum)

                    if (entityDatum && typeIs(entityDatum, "table")) {
                        
                        this.startPlacing(placementType.id, entityDatum)
                        
                    }

                }

            }

        })

        this.setCategory("Basic Building")

    }

    equip() {

        super.equip()
        
    }

    unequip() {

        super.unequip()

    }

    startPlacing(receivedPlacementType: number, previewDatum: EntityDatum) {

        if (this.preview) {

            this.preview.destroy()

        }
        
        this.preview = new Preview(this, receivedPlacementType, previewDatum)
        this.inserting = false
        this.mode = stamperMode.placing

    }

    startCloning() {

        this.mode = stamperMode.cloning

    }
    
    place(receivedPlacementType: number, entityDatum: EntityDatum, cframe: CFrame) {

        let valid = localManager.isValid(cframe)
        
        if (valid) {

            let model: Model | undefined

            entityDatum.components.forEach(componentDatum => {

                if (componentDatum.name === "Render") {

                    const props = componentDatum.props as RenderProps

                    model = props.model.Clone()

                    model.SetPrimaryPartCFrame(cframe)
                    model.Parent = Workspace

                }

            })

            this.remote.event(() => {

                if (model) {
                    
                    model.Destroy()

                    this.remote.clear()

                }

            })

            if (receivedPlacementType === placementType.name) {
                
                this.fire(placementType.name, entityDatum.name, cframe)

            } else if (receivedPlacementType === placementType.id) {

                entityDatum.components.forEach(componentDatum => {

                    if (componentDatum.name === "Core") {
    
                        const props = componentDatum.props as CoreProps
    
                        const id = props.id

                        this.fire(placementType.id, id, cframe)
    
                    }
    
                })

            }

        }

    }

    setCategory(name: string) {

        this.categoryName = name

        const category = new Array<EntityDatum>()

        settings.entities.forEach(entityDatum => {

            if (entityDatum.category === name) {

                category.push(entityDatum)

            }

        })

        this.page = 0

        this.category = category

    }

    setPage(page: number) {

        this.page = page

    }

    mode = stamperMode.none
    inserting = true
    preview: Preview | undefined
    gui: Roact.Element
    categoryName = ""
    category = new Array<EntityDatum>()
    page = 0

}