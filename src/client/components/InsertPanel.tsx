import * as Roact from "rbx-roact"
import { Tool } from "../Tool"
import Stamper from "../tools/Stamper"
import { RunService, UserInputService } from "rbx-services"
import { stamperMode } from "../enum"
import { settings, getEntityDatum } from "../../shared/settings"

export interface InsertPanelProps {

    stamper: Stamper

}

export class InsertPanel extends Roact.Component {

    constructor(props: object) {

        super(props)

        this.ref = Roact.createRef()

    }

    render() {

        const props = this.props as InsertPanelProps

        return <frame Ref={this.ref} Key="insertPanel" Active={true} Position={new UDim2(0.2, 2, 0.1, 24)} Size={new UDim2(0.6, -20, 0.64, 0)} Style={Enum.FrameStyle.RobloxRound}>
            <frame Key="itemsFrame" Position={new UDim2(0.24, 0, 0.085, 0)} Size={new UDim2(0.54, 0, 0.8, 0)} ClipsDescendants={true} BorderSizePixel={0} BackgroundTransparency={1}>
                <frame Key="scrollFrame" Size={new UDim2(1, 0, 1, 0)} BorderSizePixel={0} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(255, 255, 255)}>
                    <uigridlayout CellPadding={new UDim2(0, 0, 0, 0)} CellSize={new UDim2(0, 64, 0, 64)}/>
                    <textbutton Size={new UDim2(0, 100, 0, 100)} Event={{
                        MouseButton1Click: () => {
                            props.stamper.startPlacing(settings.entities[0])
                        }
                    }}/>
                    <textbutton Position={new UDim2(0, 100, 0, 0)} Size={new UDim2(0, 100, 0, 100)} Event={{
                        MouseButton1Click: () => {
                            props.stamper.startPlacing(settings.entities[1])
                        }
                    }}/>
                    <textbutton Position={new UDim2(0, 100, 0, 0)} Size={new UDim2(0, 100, 0, 100)} Event={{
                        MouseButton1Click: () => {
                            props.stamper.startPlacing(settings.entities[2])
                        }
                    }}/>
                    <textbutton Position={new UDim2(0, 100, 0, 0)} Size={new UDim2(0, 100, 0, 100)} Event={{
                        MouseButton1Click: () => {
                            props.stamper.startPlacing(settings.entities[3])
                        }
                    }}/>
                    <textbutton Position={new UDim2(0, 100, 0, 0)} Size={new UDim2(0, 100, 0, 100)} Event={{
                        MouseButton1Click: () => {
                            props.stamper.startPlacing(settings.entities[4])
                        }
                    }}/>
                    <textbutton Position={new UDim2(0, 100, 0, 0)} Size={new UDim2(0, 100, 0, 100)} Event={{
                        MouseButton1Click: () => {
                            props.stamper.startPlacing(getEntityDatum("56452072"))
                        }
                    }}/>
                    <textbutton Position={new UDim2(0, 100, 0, 0)} Size={new UDim2(0, 100, 0, 100)} Event={{
                        MouseButton1Click: () => {
                            props.stamper.startPlacing(settings.entities[10])
                        }
                    }}/>
                </frame>
            </frame>
            <textbutton Key="cancelButton" Text="" Position={new UDim2(1, -32, 0, -2)} Size={new UDim2(0, 34, 0, 34)} Style={Enum.ButtonStyle.RobloxButtonDefault} TextSize={24} TextColor3={Color3.fromRGB(255, 255, 255)} Font={Enum.Font.ArialBold} Event={{
                MouseButton1Click: () => {
                    
                    props.stamper.inserting = false
        
                }
            }}>
                <imagelabel Key="imageLabel" Image="http://www.roblox.com/asset?id=54135717" Position={new UDim2(0, -2, 0, -2)} Size={new UDim2(0, 16, 0, 16)} BackgroundTransparency={1} BorderSizePixel={0}/>
            </textbutton>
            <textbutton Key="selectSetButton" Text="Select Set" Visible={false} Size={new UDim2(0.2, 0, 0.1, 0)} Style={Enum.ButtonStyle.RobloxButtonDefault} TextSize={14} TextColor3={Color3.fromRGB(255, 255, 255)} Font={Enum.Font.ArialBold}/>
            <frame Key="pagingControls" Position={new UDim2(0.24, 0, 0.9, 0)} Size={new UDim2(0.54, 0, 0.1, 0)} BorderSizePixel={0} BackgroundTransparency={1}>
                <textbutton Key="previousPageButton" Text="" Position={new UDim2(0.5, -95, 0.5, -20)} Size={new UDim2(0, 60, 0, 40)} Style={Enum.ButtonStyle.RobloxButton} TextSize={24} TextColor3={Color3.fromRGB(255, 255, 255)} Font={Enum.Font.ArialBold}>
                    <imagelabel Key="imageLabel" Image="http://www.roblox.com/asset?id=54138586" Position={new UDim2(0, 8, 0, -1)} Size={new UDim2(0, 18, 0, 18)} BackgroundTransparency={1} BorderSizePixel={0}/>
                </textbutton>
                <textlabel Key="pageText" Text="" Position={new UDim2(0.5, -30, 0.5, -20)} Size={new UDim2(0, 60, 0, 40)} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(102, 0, 102)} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={24} Font={Enum.Font.ArialBold}/>
                <textbutton Key="nextPageButton" Text="" Position={new UDim2(0.5, 35, 0.5, -20)} Size={new UDim2(0, 60, 0, 40)} Style={Enum.ButtonStyle.RobloxButton} TextSize={24} TextColor3={Color3.fromRGB(255, 255, 255)} Font={Enum.Font.ArialBold}>
                    <imagelabel Key="imageLabel" Image="http://www.roblox.com/asset?id=54138563" Position={new UDim2(0, 10, 0, -1)} Size={new UDim2(0, 18, 0, 18)} BackgroundTransparency={1} BorderSizePixel={0}/>
                </textbutton>
            </frame>
            <frame Key="sets" Position={new UDim2(0, 0, 0, 5)} Size={new UDim2(0.23, 0, 1, -5)} BorderSizePixel={0} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(255, 0, 102)}>
                <frame Key="line" Position={new UDim2(1, -3, 0.06, 0)} Size={new UDim2(0, 3, 0.9, 0)} BorderSizePixel={0} BackgroundTransparency={0.7} BackgroundColor3={Color3.fromRGB(255, 255, 255)}/>
                <textlabel Key="setsHeader" Text="Sets" Size={new UDim2(0, 47, 0, 24)} TextYAlignment={Enum.TextYAlignment.Top} BackgroundTransparency={1} TextXAlignment={Enum.TextXAlignment.Left} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={24} Font={Enum.Font.ArialBold}/>
                <frame Key="setsLists" Position={new UDim2(0, 0, 0.06, 0)} Size={new UDim2(1, -6, 0.94, 0)} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(204, 0, 153)}>
                    <uigridlayout CellPadding={new UDim2(0, 0, 0, 0)} CellSize={new UDim2(1, -5, 0, 18)} FillDirection={Enum.FillDirection.Vertical}/>
                </frame>
            </frame>
            <frame Key="itemPreview" Position={new UDim2(0.79, 0, 0.085, 0)} Size={new UDim2(0.21, 0, 0.9, 0)} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(102, 0, 51)}>
                <imagelabel Key="largePreview" ZIndex={3} Position={new UDim2(0.5, -82, 0, 0)} Size={new UDim2(1, 0, 0, 164)} BorderSizePixel={0} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(0, 0, 0)}/>
                <frame Key="textPanel" Position={new UDim2(0, 0, 0, 164)} Size={new UDim2(1, 0, 0, 165)} BackgroundTransparency={1} BackgroundColor3={Color3.fromRGB(128, 0, 128)}>
                    <textlabel Key="rolloverText" Text="" Size={new UDim2(1, 0, 0, 48)} BackgroundColor3={Color3.fromRGB(204, 255, 153)} BackgroundTransparency={1} BorderSizePixel={0} TextYAlignment={Enum.TextYAlignment.Top} TextXAlignment={Enum.TextXAlignment.Left} TextSize={24} TextWrapped={true} TextColor3={Color3.fromRGB(242, 243, 243)} Font={Enum.Font.ArialBold}/>
                    <frame Key="configureText" Visible={false} Position={new UDim2(0, 0, 0, 48)} Size={new UDim2(1, 0, 1, -48)} BackgroundTransparency={1}>
                        <textlabel Key="configure" Text="Configure:" Size={new UDim2(1, 0, 0, 14)} BackgroundColor3={Color3.fromRGB(255, 0, 102)} BackgroundTransparency={1} BorderSizePixel={0} TextYAlignment={Enum.TextYAlignment.Top} TextXAlignment={Enum.TextXAlignment.Left} TextSize={14} TextWrapped={true} TextColor3={Color3.fromRGB(242, 243, 243)} Font={Enum.Font.ArialBold}/>
                        <textlabel Key="configure1" Text="Speed" Position={new UDim2(0, 0, 0, 14)} Size={new UDim2(1, 0, 0, 14)} BackgroundTransparency={1} BorderSizePixel={0} TextYAlignment={Enum.TextYAlignment.Top} TextXAlignment={Enum.TextXAlignment.Left} TextSize={14} TextWrapped={true} TextColor3={Color3.fromRGB(242, 243, 243)} Font={Enum.Font.Arial}/>
                        <textlabel Key="configure2" Text="Damage" Position={new UDim2(0, 0, 0, 28)} Size={new UDim2(1, 0, 0, 14)} BackgroundTransparency={1} BorderSizePixel={0} TextYAlignment={Enum.TextYAlignment.Top} TextXAlignment={Enum.TextXAlignment.Left} TextSize={14} TextWrapped={true} TextColor3={Color3.fromRGB(242, 243, 243)} Font={Enum.Font.Arial}/>
                        <textlabel Key="configure3" Text="Delay" Position={new UDim2(0, 0, 0, 42)} Size={new UDim2(1, 0, 0, 14)} BackgroundTransparency={1} BorderSizePixel={0} TextYAlignment={Enum.TextYAlignment.Top} TextXAlignment={Enum.TextXAlignment.Left} TextSize={14} TextWrapped={true} TextColor3={Color3.fromRGB(242, 243, 243)} Font={Enum.Font.Arial}/>
                    </frame>
                </frame>
            </frame>
        </frame>

    }

    didMount() {

        const props = this.props as InsertPanelProps

        const insertPanel = this.ref.current as Frame

        let open = true

        RunService.RenderStepped.Connect(() => {
            
            if (props.stamper.inserting && !open) {

                insertPanel.TweenPosition(new UDim2(0.2, 2, 0.1, 24), Enum.EasingDirection.InOut, Enum.EasingStyle.Sine, 0.35, true)

                open = true
    
            } else if (!props.stamper.inserting && open) {
    
                insertPanel.TweenPosition(new UDim2(0.2, 2, 1, 24), Enum.EasingDirection.InOut, Enum.EasingStyle.Sine, 0.35, true)

                open = false
    
            }

        })

    }

    ref: Roact.Ref<Frame>
    
}