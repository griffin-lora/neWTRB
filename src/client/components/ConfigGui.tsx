import * as Roact from "rbx-roact"
import { Unknown } from "../../shared/Unknown"
import { ConfigValue } from "./ConfigValue"
import Configurer from "../tools/Configurer"
import { ConfigType } from "../../server/components/Config"
import inspect from "rbx-inspect";

export interface ConfigGuiProps {

    configurer: Configurer
    configTypes: Unknown<ConfigType>
    configValues: Unknown<unknown>
    model: Model
    submit: (configValues: Unknown<unknown>) => void

}

export class ConfigGui extends Roact.Component {

    constructor(props: object) {

        super(props)
        
        this.ref = Roact.createRef()
        this.mainFrameRef = Roact.createRef()
        this.valueContainerRef = Roact.createRef()

    }

    render() {
        
        const props = this.props as ConfigGuiProps

        const values = new Array<Roact.Element>()

        const entries = Object.entries(props.configTypes)

        entries.forEach(entry => {

            const name = entry[0]
            const configType = entry[1]
            const value = props.configValues[name]
            
            values.push(<ConfigValue name={name} type={configType} value={value}/>)

        })

        return <billboardgui Ref={this.ref} Key="configGui" Active={true} Size={new UDim2(0, 360, 0, 180)} AlwaysOnTop={true} ResetOnSpawn={false}>
            <frame Key="frame" Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
                <frame Ref={this.mainFrameRef} Key="mainFrame" AnchorPoint={new Vector2(0.5, 0.5)} Position={new UDim2(0.5, 0, 0.5, 0)} Size={new UDim2(0, 0, 0, 0)} Style={Enum.FrameStyle.RobloxRound} ClipsDescendants={true}>
                    <textlabel Key="titleLabel" Text="Configuration" Size={new UDim2(1, 0, 0, 20)} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(253, 234, 141)} TextSize={24} TextColor3={Color3.fromRGB(242, 243, 243)} Font={Enum.Font.ArialBold}/>
                    <textbutton Key="closeButton" Text="X" Position={new UDim2(1, -16, 0, -5)} Size={new UDim2(0, 20, 0, 20)} Style={Enum.ButtonStyle.RobloxButtonDefault} TextSize={18} TextColor3={Color3.fromRGB(255, 255, 255)} Font={Enum.Font.ArialBold} Event={{
                        MouseButton1Click: () => {

                            const mainFrame = this.mainFrameRef.current as Frame

                            mainFrame.Destroy()

                            props.configurer.configEntity = undefined

                        }
                    }}/>
                    <frame Ref={this.valueContainerRef} Key="valueContainer" Position={new UDim2(0, 0, 0, 25)} Size={new UDim2(1, -17, 1, -50)} BackgroundTransparency={1}>
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

                                const mainFrame = this.mainFrameRef.current as Frame

                                mainFrame.TweenSize(new UDim2(0, 0, 0, 0), Enum.EasingDirection.In, Enum.EasingStyle.Back, 0.5, true)

                                const config = {} as Unknown<unknown>

                                const valueContainer = this.valueContainerRef.current as Frame

                                valueContainer.GetChildren().forEach(child => {
                                    
                                    if (child.IsA("Frame")) {
                                        
                                        const label = child.label as TextLabel

                                        let text: string | undefined

                                        if (child.FindFirstChild("box")) {
                                            
                                            const box = child.box as TextBox

                                            text = box.Text

                                        } else if (child.FindFirstChild("dropdownMenu")) {

                                            const dropdownMenuButton = child.dropdownMenu.dropdownMenuButton as TextButton

                                            text = dropdownMenuButton.Text

                                        }
                                        
                                        config[label.Text] = text

                                    }

                                })

                                props.submit(config)

                                props.configurer.configEntity = undefined

                            }
                        }}/>
                        <textbutton Key="cancelButton" Text="Cancel" Position={new UDim2(0.2, 2, 0, 2)} Size={new UDim2(0.25, -4, 0, 25)} BackgroundColor3={Color3.fromRGB(205, 205, 205)} Style={Enum.ButtonStyle.RobloxButton} TextColor3={Color3.fromRGB(242, 243, 243)} TextSize={14} Font={Enum.Font.ArialBold} Event={{
                            MouseButton1Click: () => {

                                const mainFrame = this.mainFrameRef.current as Frame

                                mainFrame.TweenSize(new UDim2(0, 0, 0, 0), Enum.EasingDirection.In, Enum.EasingStyle.Back, 0.5, true)

                                props.configurer.configEntity = undefined

                            }
                        }}/>
                    </frame>
                </frame>
            </frame>
        </billboardgui>

    }

    didMount() {

        const props = this.props as ConfigGuiProps

        const gui = this.ref.current as BillboardGui

        const mainFrame = this.mainFrameRef.current as Frame

        gui.Adornee = props.model.PrimaryPart // CHANGE THIS TO props.model

        mainFrame.TweenSize(new UDim2(1, 0, 1, 0), Enum.EasingDirection.Out, Enum.EasingStyle.Back, 0.5, true)

    }

    ref: Roact.Ref<BillboardGui>
    mainFrameRef: Roact.Ref<Frame>
    valueContainerRef: Roact.Ref<Frame>

}