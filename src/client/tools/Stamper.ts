import { Tool } from "../Tool"
import * as Roact from "rbx-roact"
import { StamperGui } from "../components/StamperGui"
import { Players, UserInputService, RunService } from "rbx-services"
import { stamperMode } from "../enum"
import { EntitySetting } from "../../shared/settings"
import { Preview } from "../Preview"
const player = Players.LocalPlayer as Player
const playerGui = player.PlayerGui as PlayerGui
const mouse = player.GetMouse() as Mouse

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
                
                if (this.mode === stamperMode.inserting) {
                    
                    this.mode = stamperMode.none
                    
                } else {

                    this.mode = stamperMode.inserting

                }

            }

        })

    }

    equip() {

        super.equip()
        
    }

    unequip() {

        super.unequip()

    }

    startPlacing(previewSetting: EntitySetting) {
        
        this.preview = new Preview(this, previewSetting)
        this.placing = true
        this.mode = stamperMode.placing

    }
    
    place(entitySetting: EntitySetting, cframe: CFrame) {
        
        this.fire(entitySetting.name, cframe)

    }

    mode = stamperMode.inserting
    placing = false
    preview: Preview | undefined
    gui: Roact.Element

}