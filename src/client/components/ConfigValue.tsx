import * as Roact from "rbx-roact"
import { ConfigType, NumberConstrainedData } from "../../server/components/Config"

export interface ConfigValueProps {

    name: string
    type: ConfigType
    value: unknown

}

export class ConfigValue extends Roact.Component {

    constructor(props: object) {

        super(props)

        this.ref = Roact.createRef()
        this.dropdownMenuButtonRef = Roact.createRef()
        this.listRef = Roact.createRef()

    }

    render() {

        const props = this.props as ConfigValueProps

        const text = tostring(props.value)

        if (props.type.name === "string" || props.type.name === "number" || props.type.name === "NumberConstrained") {

            return <frame Ref={this.ref} Key="value" Size={new UDim2(1, 0, 0, 20)} BorderSizePixel={0} BackgroundTransparency={1}>
                <textlabel Key="label" Text={props.name} Size={new UDim2(0.5, 0, 1, 0)} BorderSizePixel={0} BackgroundTransparency={1} TextSize={14} TextColor3={Color3.fromRGB(242, 243, 243)} Font={Enum.Font.ArialBold}/>
                <textbox Key="box" Text={text} ZIndex={2} Position={new UDim2(0.5, 1, 0, 1)} Size={new UDim2(0.5, -2, 1, -2)} BackgroundTransparency={1} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={10} ClearTextOnFocus={false} Event={{
                    FocusLost: box => {

                        if (props.type.name === "number" || props.type.name === "NumberConstrained") {

                            if (!tonumber(box.Text)) {

                                box.Text = "0"

                            } else {

                                if (props.type.name === "NumberConstrained") {

                                    const data = props.type.data as NumberConstrainedData
                                
                                    let number = tonumber(box.Text)

                                    if (number) {

                                        number = math.clamp(number, data.min, data.max)

                                        box.Text = tostring(number)

                                    }

                                }

                            }

                        }

                    }
                }}>
                    <textbutton Key="backgroundButton" Text="" Size={new UDim2(1, 0, 1, 0)} Style={Enum.ButtonStyle.RobloxButtonDefault}/>
                </textbox>
            </frame>

        } else if (props.type.name === "Option" && typeIs(props.value, "number")) {

            const data = props.type.data as Array<string>
            
            const buttons = new Array<Roact.Element>()

            data.forEach(option => {

                buttons.push(<textbutton Key="choiceButton" Text={option} ZIndex={6} Position={new UDim2(0, 0, 0.4, 0)} Size={new UDim2(1, 0, 0.2, 0)} BorderSizePixel={0} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(255, 255, 255)} TextWrapped={true} TextXAlignment={Enum.TextXAlignment.Left} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={18} Font={Enum.Font.Arial} Event={{
                    MouseButton1Click: optionButton => {
                            
                        const list = this.listRef.current as TextButton

                        const dropdownMenuButton = this.dropdownMenuButtonRef.current as TextButton

                        dropdownMenuButton.Text = optionButton.Text

                        list.Visible = false

                        dropdownMenuButton.Visible = true

                    }
                }}/>)

            })
            
            return <frame Ref={this.ref} Key="value" Size={new UDim2(1, 0, 0, 20)} BorderSizePixel={0} BackgroundTransparency={1}>
                <textlabel Key="label" Text={props.name} Size={new UDim2(0.5, 0, 1, 0)} BorderSizePixel={0} BackgroundTransparency={1} TextSize={14} TextColor3={Color3.fromRGB(242, 243, 243)} Font={Enum.Font.ArialBold}/>
                <frame Key="dropdownMenu" Position={new UDim2(0.5, 0, 0, 0)} Size={new UDim2(0.5, 0, 0, 20)} BackgroundTransparency={1}>
                    <textbutton Ref={this.dropdownMenuButtonRef} Key="dropdownMenuButton" Text={data[props.value]} Visible={true} ZIndex={2} Size={new UDim2(1, 0, 1, 0)} Style={Enum.ButtonStyle.RobloxButton} TextXAlignment={Enum.TextXAlignment.Left} TextSize={18} TextWrapped={true} TextColor3={Color3.fromRGB(255, 255, 255)} Font={Enum.Font.ArialBold} Event={{
                        MouseButton1Click: dropdownMenuButton => {

                            dropdownMenuButton.Visible = false

                            const list = this.listRef.current as TextButton

                            list.Visible = true

                        }
                    }}>
                        <imagelabel Key="icon" Image="https://www.roblox.com/asset/?id=45732894" ZIndex={2} Position={new UDim2(1, -11, 0.5, -2)} Size={new UDim2(0, 11, 0, 6)} BackgroundTransparency={1}/>
                    </textbutton>
                    <textbutton Ref={this.listRef} Text="" Key="list" ZIndex={5} Visible={false} Size={new UDim2(1, 0, data.length + 1, 0)} Style={Enum.ButtonStyle.RobloxButton}>
                        <uilistlayout Padding={new UDim(0, data.length + 1)}/>
                        {buttons}
                    </textbutton>
                </frame>
            </frame>

        }

    }

    didMount() {



    }

    ref: Roact.Ref<Frame>
    dropdownMenuButtonRef: Roact.Ref<TextButton>
    listRef: Roact.Ref<TextButton>
    
}