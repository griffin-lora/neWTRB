import * as Roact from "rbx-roact"
import Stamper from "../tools/Stamper"
import { stamperMode } from "../enum"
import { RunService } from "rbx-services"

export interface StamperPanelProps {

    stamper: Stamper

}

export class StamperPanel extends Roact.Component {

    constructor(props: object) {

        super(props)

        this.ref = Roact.createRef()

    }

    render() {

        const props = this.props as StamperPanelProps

        return <frame Ref={this.ref} Key="stamperPanel" Active={true} ZIndex={2} Position={new UDim2(0.5, -175, 1, -135)} Size={new UDim2(0, 350, 0, 48)} Style={Enum.FrameStyle.RobloxRound}>
            <textbutton Key="minimizeButton" Text="" ZIndex={3} Position={new UDim2(1, -32, 0, -2)} Size={new UDim2(0, 34, 0, 34)} Style={Enum.ButtonStyle.RobloxButtonDefault} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={24} Font={Enum.Font.ArialBold}>
                <imagelabel Image="http://www.roblox.com/asset?id=54932670" ZIndex={4} Position={new UDim2(0, -3, 0, -4)} Size={new UDim2(0, 16, 0, 20)} BackgroundTransparency={1} BorderSizePixel={0}/>
            </textbutton>
            <frame Key="stamperButtons" Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
                <frame Key="recentFrame" Active={true} ZIndex={3} Position={new UDim2(0, 103, 0, -6)} Size={new UDim2(0, 192, 0, 44)} BackgroundTransparency={1}>
                    <textbutton Key="Button1" Text="" Visible={false} ZIndex={4} Position={new UDim2(0, 0, 0, -2)} Size={new UDim2(0, 48, 0, 48)} TextTransparency={0.1} BorderSizePixel={0} BackgroundTransparency={0.1} Style={Enum.ButtonStyle.RobloxButton} TextColor3={Color3.fromRGB(255, 255, 255)} TextXAlignment={Enum.TextXAlignment.Left} TextYAlignment={Enum.TextYAlignment.Top} BackgroundColor3={Color3.fromRGB(71, 71, 71)}>
                        <imagelabel Key="ButtonImage" Image="http://gametest.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&assetversionid=209434543" ZIndex={5} Position={new UDim2(0, -8, 0, -8)} Size={new UDim2(1, 16, 1, 16)} BackgroundTransparency={1}/>
                        <textlabel Key="ShortcutText" Text="F" ZIndex={8} Position={new UDim2(0, -7, 0, -8)} Size={new UDim2(0, 7, 0, 12)} BackgroundTransparency={1} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={14} Font={Enum.Font.ArialBold}/>
                    </textbutton>
                    <textbutton Key="Button2" Text="" Visible={false} ZIndex={4} Position={new UDim2(0, 48, 0, -2)} Size={new UDim2(0, 48, 0, 48)} TextTransparency={0.1} Style={Enum.ButtonStyle.RobloxButton} BackgroundColor3={Color3.fromRGB(71, 71, 71)} BackgroundTransparency={0.1} BorderSizePixel={0}>
                        <imagelabel Key="ButtonImage" Image="http://gametest.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&assetversionid=209434543" ZIndex={5} Position={new UDim2(0, -8, 0, -8)} Size={new UDim2(1, 16, 1, 16)} BackgroundTransparency={1}/>
                        <textlabel Key="ShortcutText" Text="G" ZIndex={8} Position={new UDim2(0, -7, 0, -8)} Size={new UDim2(0, 7, 0, 12)} BackgroundTransparency={1} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={14} Font={Enum.Font.ArialBold}/>
                    </textbutton>
                    <textbutton Key="Button3" Text="" Visible={false} ZIndex={4} Position={new UDim2(0, 95, 0, -3)} Size={new UDim2(0, 48, 0, 48)} TextTransparency={0.1} Style={Enum.ButtonStyle.RobloxButton} BackgroundColor3={Color3.fromRGB(71, 71, 71)} BackgroundTransparency={0.1} BorderSizePixel={0}>
                        <imagelabel Key="ButtonImage" Image="http://gametest.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&assetversionid=209434543" ZIndex={5} Position={new UDim2(0, -8, 0, -8)} Size={new UDim2(1, 16, 1, 16)} BackgroundTransparency={1}/>
                        <textlabel Key="ShortcutText" Text="H" ZIndex={8} Position={new UDim2(0, -7, 0, -8)} Size={new UDim2(0, 7, 0, 12)} BackgroundTransparency={1} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={14} Font={Enum.Font.ArialBold}/>
                    </textbutton>
                    <textbutton Key="Button4" Text="" Visible={false} ZIndex={4} Position={new UDim2(0, 142, 0, -3)} Size={new UDim2(0, 48, 0, 48)} TextTransparency={0.1} Style={Enum.ButtonStyle.RobloxButton} BackgroundColor3={Color3.fromRGB(71, 71, 71)} BackgroundTransparency={0.1} BorderSizePixel={0}>
                        <imagelabel Key="ButtonImage" Image="http://gametest.roblox.com/Game/Tools/ThumbnailAsset.ashx?fmt=png&wd=420&ht=420&assetversionid=209434543" ZIndex={5} Position={new UDim2(0, -8, 0, -8)} Size={new UDim2(1, 16, 1, 16)} BackgroundTransparency={1}/>
                        <textlabel Key="ShortcutText" Text="J" ZIndex={8} Position={new UDim2(0, -7, 0, -8)} Size={new UDim2(0, 7, 0, 12)} BackgroundTransparency={1} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={14} Font={Enum.Font.ArialBold}/>
                    </textbutton>
                </frame>
                <textbutton Key="cloneButton" Text="" ZIndex={3} Position={new UDim2(0, 0, 0, -6)} Size={new UDim2(0, 45, 0, 45)} Style={Enum.ButtonStyle.RobloxButton} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={14} Font={Enum.Font.ArialBold}>
                    <imagelabel Key="imageLabel" Image="http://www.roblox.com/asset?id=51641555" ZIndex={4} Position={new UDim2(0, -7, 0, -7)} Size={new UDim2(1, 14, 1, 14)} BackgroundTransparency={1} BorderSizePixel={0}/>
                    <textlabel Key="cloneShortcut" Text="E" ZIndex={5} Position={new UDim2(0, -7, 0, -8)} Size={new UDim2(0, 8, 0, 12)} BackgroundTransparency={1} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={14} Font={Enum.Font.ArialBold}/>
                </textbutton>
                <textbutton Key="partsButton" Text="" ZIndex={3} Position={new UDim2(0, 45, 0, -6)} Size={new UDim2(0, 45, 0, 45)} Style={Enum.ButtonStyle.RobloxButton} Selected={true} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={14} Font={Enum.Font.ArialBold} Event={{
                    MouseButton1Click: () => {

                        props.stamper.inserting = !props.stamper.inserting

                    }
                }}>
                    <imagelabel Key="imageLabel" Image="http://www.roblox.com/asset?id=54966682" ZIndex={4} Position={new UDim2(0, -7, 0, -7)} Size={new UDim2(1, 14, 1, 14)} BackgroundTransparency={1} BorderSizePixel={0}/>
                    <textlabel Key="partsShortcut" Text="Q" ZIndex={5} Position={new UDim2(0, -7, 0, -8)} Size={new UDim2(0, 8, 0, 12)} BackgroundTransparency={1} TextStrokeTransparency={0} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={14} Font={Enum.Font.ArialBold}/>
                </textbutton>
                <frame Key="clonePanel" Visible={false} Position={new UDim2(0, 0, 0, -8)} Size={new UDim2(0, 80, 1, 16)} Style={Enum.FrameStyle.RobloxSquare}>
                    <textlabel Key="clonePanelText" Text="Click on a part to clone it" Position={new UDim2(0, -6, 0, -8)} Size={new UDim2(1, 12, 1, 16)} BackgroundTransparency={1} TextWrapped={true} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={14} Font={Enum.Font.ArialBold}/>
                </frame>
            </frame>
            <textbutton Key="restoreButton" Text="" Visible={false} ZIndex={3} Position={new UDim2(0, -25, 0, -20)} Size={new UDim2(0, 50, 0, 25)} Style={Enum.ButtonStyle.RobloxButtonDefault} TextColor3={Color3.fromRGB(255, 255, 255)} TextSize={24} Font={Enum.Font.ArialBold}>
                <imagelabel Image="http://www.roblox.com/asset?id=54933540" ZIndex={4} Position={new UDim2(0, -4, 0, -4)} Size={new UDim2(1, 8, 1, 8)} BackgroundTransparency={1} BorderSizePixel={0}/>
            </textbutton>
        </frame>

    }

    didMount() {

        const props = this.props as StamperPanelProps

        const stamperPanel = this.ref.current as Frame

        const partsButton = stamperPanel.stamperButtons.partsButton as TextButton

        RunService.RenderStepped.Connect(() => {

            partsButton.Selected = props.stamper.inserting

        })

    }

    ref: Roact.Ref<Frame>
    
}