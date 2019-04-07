import { Tool } from "../Tool"
import * as Roact from "rbx-roact"
import { StamperGui } from "../components/StamperGui"
import { Players, UserInputService, RunService, Workspace } from "rbx-services"
import { stamperMode } from "../enum"
import { Preview } from "../Preview"
import { playerGui, mouse } from "../player"
import { localManager } from "../localManager"
import { globalManager } from "../../shared/globalManager"
import { EntityDatum, settings } from "../../shared/settings"
import { RenderProps } from "../../server/components/Render"

export default class Stamper extends Tool {
    
    constructor() {

        super("stamper", "rbxassetid://59102781")

        this.gui = Roact.createElement(StamperGui, { stamper: this })
        Roact.mount(this.gui, playerGui)
        
        RunService.RenderStepped.Connect(() => {
            
            if (this.equipped && this.mode === stamperMode.placing) {

                mouse.Icon = "rbxassetid://66887745"

            } else if (mouse.Icon === "rbxassetid://66887745") {

                mouse.Icon = ""

            }

        })
        
        UserInputService.InputBegan.Connect((input, gameProcessedEvent) => {
            
            if (!gameProcessedEvent && this.equipped && input.KeyCode === Enum.KeyCode.Q) {
                
                this.inserting = !this.inserting

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

    startPlacing(previewDatum: EntityDatum) {

        if (this.preview) {

            this.preview.destroy()

        }
        
        this.preview = new Preview(this, previewDatum)
        this.inserting = false
        this.mode = stamperMode.placing

    }
    
    place(entityDatum: EntityDatum, cframe: CFrame) {

        let valid = true

        if (localManager.area) {

            valid = globalManager.isInArea(localManager.area, cframe)

        }
        
        if (valid) {

            let model: Model | undefined

            this.remote.event(() => {

                if (model) {
                    
                    model.Destroy()

                    this.remote.clear()

                }

            })
            
            this.fire(entityDatum.name, cframe)

            entityDatum.components.forEach(componentDatum => {

                if (componentDatum.name === "Render") {

                    const props = componentDatum.props as RenderProps

                    model = props.model.Clone()

                    model.SetPrimaryPartCFrame(cframe)
                    model.Parent = Workspace

                }

            })

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