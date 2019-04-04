import * as Roact from "rbx-roact"
import { Tool } from "../Tool"
import { RunService, UserInputService } from "rbx-services"

export interface ToolButtonProps {

    tool: Tool
    id: number

}

export class ToolButton extends Roact.Component {

    constructor(props: object) {

        super(props)

        this.ref = Roact.createRef()

    }

    render() {

        const props = this.props as ToolButtonProps
        
        return <textbutton Ref={this.ref} Name={tostring(props.id)} AnchorPoint={new Vector2(0.5, 0.5)} Size={new UDim2(0, 50, 0, 50)} Style={Enum.ButtonStyle.RobloxButton} Text="" Event={{
            MouseButton1Click: () => {

                if (!props.tool.equipped) {

                    props.tool.equip()

                } else {

                    props.tool.unequip()

                }

            }
        }}>

            <textlabel BackgroundTransparency={1} Position={new UDim2(-0.3, 0, -0.2, 0)} Size={new UDim2(0.5, 0, 0.5, 0)} Font={Enum.Font.ArialBold} Text={tostring(props.id)} TextColor3={new Color3(1, 1, 1)} TextScaled={true}>


                
            </textlabel>

            <imagelabel AnchorPoint={new Vector2(0.5, 0.5)} BackgroundTransparency={1} Position={new UDim2(0.5, 0, 0.5, 0)} Size={new UDim2(1.3, 0, 1.3, 0)} Image={props.tool.image}></imagelabel>

        </textbutton>

    }

    didMount() {

        const props = this.props as ToolButtonProps

        const button = this.ref.current as TextButton
        
        let equipped = props.tool.equipped

        RunService.RenderStepped.Connect(() => {

            if (props.tool.equipped !== equipped) {

                if (!equipped) {

                    button.Selected = true
                    button.TweenSize(new UDim2(0, 60, 0, 60), Enum.EasingDirection.InOut, Enum.EasingStyle.Sine, 0.1, true)

                } else {

                    button.Selected = false
                    button.TweenSize(new UDim2(0, 50, 0, 50), Enum.EasingDirection.InOut, Enum.EasingStyle.Sine, 0.1, true)

                }

                equipped = !equipped

            }

        })

        let keyCode: Enum.KeyCode

        if (props.id === 1) {
            keyCode = Enum.KeyCode.One
        } else if (props.id === 2) {
            keyCode = Enum.KeyCode.Two
        } else if (props.id === 3) {
            keyCode = Enum.KeyCode.Three
        } else if (props.id === 4) {
            keyCode = Enum.KeyCode.Four
        } else if (props.id === 5) {
            keyCode = Enum.KeyCode.Five
        } else if (props.id === 6) {
            keyCode = Enum.KeyCode.Six
        } else if (props.id === 7) {
            keyCode = Enum.KeyCode.Seven
        } else if (props.id === 8) {
            keyCode = Enum.KeyCode.Eight
        } else if (props.id === 9) {
            keyCode = Enum.KeyCode.Nine
        } else if (props.id === 0) {
            keyCode = Enum.KeyCode.Zero
        }

        UserInputService.InputBegan.Connect((input, gameProcessedEvent) => {

            if (!gameProcessedEvent && input.KeyCode === keyCode) {

                if (!props.tool.equipped) {

                    props.tool.equip()

                } else {

                    props.tool.unequip()

                }

            }

        })

        

    }

    ref: Roact.Ref<TextButton>

}