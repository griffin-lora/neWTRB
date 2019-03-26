import { Tool } from "../Tool"
import { RunService, Workspace } from "rbx-services"
import { mouse, playerGui } from "../player"
const entities = Workspace.entities

export class Selector extends Tool {
    
    constructor(name: string, image: string, cursor?: string, color?: Color3) {

        super(name, image)

        this.cursor = cursor || "rbxasset://textures/DragCursor.png"
        
        const gui = new Instance("ScreenGui")
        gui.ResetOnSpawn = false

        this.selectionBox = new Instance("SelectionBox")
        this.selectionBox.Color3 = color || this.selectionBox.Color3
        this.selectionBox.Parent = gui

        gui.Parent = playerGui

        RunService.RenderStepped.Connect(() => {

            const target = mouse.Target

            if (this.equipped) {

                mouse.Icon = this.cursor

            } else if (mouse.Icon === this.cursor) {

                mouse.Icon = ""

            }
            
            if (this.equipped && target) {

                const model = target.Parent
                
                if (model && model.IsA("Model") && model.Parent === entities) {

                    this.selected = model

                } else {

                    this.selected = undefined

                }

            } else {

                this.selected = undefined

            }

            this.selectionBox.Adornee = this.selected

        })

        mouse.Button1Up.Connect(() => {

            if (this.selected) {

                this.click(this.selected)

            }

        })

    }

    equip() {

        super.equip()
        
    }

    unequip() {

        super.unequip()

    }

    click(model: Model) {



    }

    selectionBox: SelectionBox
    selected: Model | undefined
    cursor: string

}