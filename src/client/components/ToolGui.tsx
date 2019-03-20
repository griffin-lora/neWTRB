import * as Roact from "rbx-roact"
import { ToolButton } from "./ToolButton"
import Stamper from "../tools/Stamper"

export class ToolGui extends Roact.Component {

    render() {

        return <screengui Name="toolGui" ResetOnSpawn={false}>

            <ToolButton tool={new Stamper()} id={1} image="rbxassetid://59102781"></ToolButton>
            
        </screengui>

    }

    createToolButton(tool: Tool) {

        

    }

}