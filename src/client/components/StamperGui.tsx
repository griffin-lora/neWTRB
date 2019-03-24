import * as Roact from "rbx-roact"
import { RunService } from "rbx-services"
import { Tool } from "../Tool"
import Stamper from "../tools/Stamper"
import { InsertPanel } from "./InsertPanel";
import { StamperPanel } from "./StamperPanel";

export interface StamperGuiProps {

    stamper: Stamper

}

export class StamperGui extends Roact.Component {

    constructor(props: object) {

        super(props)

        this.ref = Roact.createRef()

    }

    render() {

        const props = this.props as StamperGuiProps

        let insertPanelOpen = true

        return <screengui Ref={this.ref} ResetOnSpawn={false} Enabled={false}>
            <InsertPanel stamper={props.stamper}></InsertPanel>
            <StamperPanel stamper={props.stamper}></StamperPanel>
            <frame Key="loadDialog" Visible={false} Position={new UDim2(0.5, -175, 0.5, -25)} Size={new UDim2(0, 350, 0, 50)} SizeConstraint={Enum.SizeConstraint.RelativeXX} Style={Enum.FrameStyle.RobloxRound}>
                <textlabel Key="loadLabel" Text="Loading..." Position={new UDim2(0, 0, 0, -8)} Size={new UDim2(0, 155, 0.5, 36)} BackgroundTransparency={1} TextSize={36} TextColor3={Color3.fromRGB(248, 248, 248)} Font={Enum.Font.ArialBold}/>
            </frame>

        </screengui>

    }

    didMount() {

        const props = this.props as StamperGuiProps
        const gui = this.ref.current as ScreenGui

        RunService.RenderStepped.Connect(() => {

            gui.Enabled = props.stamper.equipped

        })

    }

    ref: Roact.Ref<ScreenGui>

}