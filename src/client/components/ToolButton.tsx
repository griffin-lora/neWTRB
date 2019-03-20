import * as Roact from "rbx-roact"
import { Tool } from "../Tool"

export interface ToolButtonProps {

    tool: Tool
    id: number
    image: string

}

export class ToolButton extends Roact.Component {

    constructor(props: ToolButtonProps) {

        super(props as Object)

    }

    render() {

        const props = this.props as ToolButtonProps

        let selected = false
        
        return <textbutton AnchorPoint={new Vector2(0.5, 0.5)} Position={new UDim2(0.5,0,0.5,0)} Size={new UDim2(0, 50, 0, 50)} Style={Enum.ButtonStyle.RobloxButton} Text="" Event={{
            MouseButton1Click: rbx => {

                if (!selected) {

                    props.tool.equip()

                    rbx.Selected = true
                    rbx.TweenSize(new UDim2(0, 60, 0, 60), Enum.EasingDirection.InOut, Enum.EasingStyle.Sine, 0.1, true)

                } else {

                    props.tool.unequip()

                    rbx.Selected = false
                    rbx.TweenSize(new UDim2(0, 50, 0, 50), Enum.EasingDirection.InOut, Enum.EasingStyle.Sine, 0.1, true)

                }

                selected = !selected

            }
        }}>

            <textlabel BackgroundTransparency={1} Position={new UDim2(-0.3, 0, -0.2, 0)} Size={new UDim2(0.5, 0, 0.5, 0)} Font={Enum.Font.ArialBold} Text={tostring(props.id)} TextColor3={new Color3(1, 1, 1)} TextScaled={true}>


                
            </textlabel>

            <imagelabel AnchorPoint={new Vector2(0.5, 0.5)} BackgroundTransparency={1} Position={new UDim2(0.5, 0, 0.5, 0)} Size={new UDim2(1.3, 0, 1.3, 0)} Image={props.image}></imagelabel>

        </textbutton>

    }

}