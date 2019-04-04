import * as Roact from "rbx-roact"
import { Unknown } from "../../shared/Unknown"
import { ConfigValue } from "./ConfigValue"

export interface ConfigGuiProps {

    config: Unknown
    model: Model
    submit: (config: Unknown) => void

}

export class ConfigGui extends Roact.Component {

    constructor(props: object) {

        super(props)

        this.ref = Roact.createRef()

    }

    render() {
        
        const props = this.props as ConfigGuiProps

        const values = new Array<Roact.Element>()

        const entries = Object.entries(props.config)

        entries.forEach(entry => {

            const name = entry[0]
            const value = entry[1]

            values.push(<ConfigValue name={name} value={value}/>)

        })

        return <billboardgui Ref={this.ref} Key="configGui" Active={true} Size={new UDim2(0, 360, 0, 180)} AlwaysOnTop={true} ResetOnSpawn={false}>
            <frame Key="frame" Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
                <frame Key="mainFrame" AnchorPoint={new Vector2(0.5, 0.5)} Position={new UDim2(0.5, 0, 0.5, 0)} Size={new UDim2(1, 0, 1, 0)} Style={Enum.FrameStyle.RobloxRound}>
                    <textlabel Key="titleLabel" Text="Configuration" Size={new UDim2(1, 0, 0, 20)} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(253, 234, 141)} TextSize={24} TextColor3={Color3.fromRGB(242, 243, 243)} Font={Enum.Font.ArialBold}/>
                    <textbutton Key="closeButton" Text="X" Position={new UDim2(1, -16, 0, -5)} Size={new UDim2(0, 20, 0, 20)} Style={Enum.ButtonStyle.RobloxButtonDefault} TextSize={18} TextColor3={Color3.fromRGB(255, 255, 255)} Font={Enum.Font.ArialBold}/>
                    <frame Key="valueContainer" Position={new UDim2(0, 0, 0, 25)} Size={new UDim2(1, -17, 1, -50)} BackgroundTransparency={1}>
                        <uilistlayout/>
                        {values}
                    </frame>
                    <frame Key="scrollButtonFrame" Position={new UDim2(1, -17, 0, 25)} Size={new UDim2(0, 17, 1, -50)} BackgroundTransparency={1}>
                        <imagebutton Key="ScrollUpButton" Image="rbxasset://textures/ui/scrollbuttonUp.png" Active={false} Size={new UDim2(0, 17, 0, 17)} BackgroundTransparency={1}/>
                        <imagebutton Key="ScrollDownButton" Image="rbxasset://textures/ui/scrollbuttonDown.png" Active={false} Position={new UDim2(0, 0, 1, -17)} Size={new UDim2(0, 17, 0, 17)} BackgroundTransparency={1}/>
                    </frame>
                    <frame Key="buttons" Position={new UDim2(0, 0, 1, -25)} Size={new UDim2(1, 0, 0, 20)} BackgroundTransparency={1}>
                        <textbutton Key="okButton" Text="Ok" Position={new UDim2(0.55, 2, 0, 2)} Size={new UDim2(0.25, -4, 0, 25)} BackgroundColor3={Color3.fromRGB(205, 205, 205)} Style={Enum.ButtonStyle.RobloxButton} TextColor3={Color3.fromRGB(242, 243, 243)} TextSize={14} Font={Enum.Font.ArialBold} Event={{
                            MouseButton1Click: () => {

                                const config = {} as Unknown

                                const gui = this.ref.current as BillboardGui

                                const valueContainer = gui.frame.mainFrame.valueContainer as Frame

                                valueContainer.GetChildren().forEach(child => {
                                    
                                    if (child.IsA("Frame")) {
                                        
                                        const label = child.label as TextLabel
                                        const box = child.box as TextBox

                                        config[label.Text] = box.Text

                                    }

                                })

                                props.submit(config)

                            }
                        }}/>
                        <textbutton Key="cancelButton" Text="Cancel" Position={new UDim2(0.2, 2, 0, 2)} Size={new UDim2(0.25, -4, 0, 25)} BackgroundColor3={Color3.fromRGB(205, 205, 205)} Style={Enum.ButtonStyle.RobloxButton} TextColor3={Color3.fromRGB(242, 243, 243)} TextSize={14} Font={Enum.Font.ArialBold}/>
                    </frame>
                </frame>
            </frame>
        </billboardgui>

    }

    didMount() {

        const props = this.props as ConfigGuiProps

        const gui = this.ref.current as BillboardGui

        gui.Adornee = props.model.PrimaryPart // CHANGE THIS TO props.model

    }

    ref: Roact.Ref<BillboardGui>
    
}