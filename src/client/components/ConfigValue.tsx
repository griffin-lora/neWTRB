import * as Roact from "rbx-roact"

export interface ConfigValueProps {

    name: string
    value: unknown

}

export class ConfigValue extends Roact.Component {

    constructor(props: object) {

        super(props)

        this.ref = Roact.createRef()

    }

    render() {

        const props = this.props as ConfigValueProps
        
        return <frame Ref={this.ref} Key="value" Size={new UDim2(1, 0, 0, 20)} BorderSizePixel={0} BackgroundTransparency={1}>
            <textlabel Key="label" Text={props.name} Size={new UDim2(0.5, 0, 1, 0)} BorderSizePixel={0} BackgroundTransparency={1} TextSize={14} TextColor3={Color3.fromRGB(242, 243, 243)} Font={Enum.Font.ArialBold}/>
            <textbox Key="box" Text="" ZIndex={2} Position={new UDim2(0.5, 1, 0, 1)} Size={new UDim2(0.5, -2, 1, -2)} BackgroundTransparency={1} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={10} ClearTextOnFocus={false}>
                <textbutton Key="backgroundButton" Text="" Size={new UDim2(1, 0, 1, 0)} Style={Enum.ButtonStyle.RobloxButtonDefault}/>
            </textbox>
        </frame>

    }

    didMount() {



    }

    ref: Roact.Ref<Frame>
    
}