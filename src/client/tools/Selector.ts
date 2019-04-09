import { Tool } from "../Tool"
import { RunService, Workspace } from "rbx-services"
import { mouse, playerGui } from "../player"
import { localManager } from "../localManager"
import { globalManager } from "../../shared/globalManager"
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
            
            this.selected = this.getSelected()

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

    static getSelected(selector: Tool) {

        const target = mouse.Target
        
        if (selector.equipped && target) {

            const model = target.Parent
            
            if (model && model.IsA("Model") && model.Parent === entities) {

                const primaryPart = model.PrimaryPart as BasePart

                let valid = localManager.isValid(primaryPart.CFrame)

                if (valid) {

                    return model

                } else {

                    return undefined

                }

            } else {

                return undefined

            }

        } else {

            return undefined

        }

    }

    getSelected() {

        return Selector.getSelected(this)

    }

    selectionBox: SelectionBox
    selected: Model | undefined
    cursor: string

}