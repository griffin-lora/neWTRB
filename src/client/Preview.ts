import { EntitySetting, ComponentSetting } from "../shared/settings"
import { RunService, Players, Workspace } from "rbx-services"
import Stamper from "./tools/Stamper"
const player = Players.LocalPlayer as Player
const mouse = player.GetMouse() as Mouse

export interface RenderProps {

    model: Model

}

export class Preview {

    constructor(stamper: Stamper, previewSetting: EntitySetting) {
        
        let renderSetting: ComponentSetting | undefined

        previewSetting.components.forEach(componentSetting => {

            if (componentSetting.name === "Render") {

                renderSetting = componentSetting

            }

        })
        
        if (renderSetting) {

            const props = renderSetting.props as RenderProps

            this.model = props.model.Clone()
            this.model.Parent = Workspace
            
            mouse.TargetFilter = this.model
            RunService.RenderStepped.Connect(() => {

                this.setCframe(mouse.Hit)

                if (this.model) {

                    if (stamper.equipped) {

                        this.model.Parent = Workspace

                    } else {

                        this.model.Parent = undefined

                    }

                }

            })

            mouse.Button1Up.Connect(() => {
                
                stamper.place(previewSetting, mouse.Hit)

            })
            
        }

    }

    setCframe(cframe: CFrame) {

        if (this.model) {

            this.model.SetPrimaryPartCFrame(cframe)

        }

    }

    getCframe() {

        if (this.model) {

            return this.model.GetPrimaryPartCFrame()

        } else {

            return new CFrame()

        }

    }

    model: Model | undefined
    
}