import * as Roact from "rbx-roact"
import { ToolGui } from "./components/ToolGui"
import { playerGui, player, getCharacter } from "./player"
import { settings } from "../shared/settings"
import { ReplicatedStorage } from "rbx-services"
import { Export } from "../shared/Export"
import { Tool } from "./Tool"
import { Remote } from "./Remote"
const tools = ReplicatedStorage.client.tools

class LocalManager {

    constructor() {

        this.tool = undefined

        this.joinRemote.event((area: unknown) => {

            if (typeIs(area, "Instance") && area.IsA("Model")) {

                this.area = area

            }
            
            const character = getCharacter()

            if (this.area) {

                const prim = this.area.PrimaryPart as BasePart

                (character.WaitForChild("HumanoidRootPart") as BasePart).CFrame = prim.CFrame.add(new Vector3(0, 10, 0))

            }

        })

    }
    
    addTool(tool: Tool) {

        this.tools.push(tool)

    }

    renderTools() {

        const toolGui = Roact.createElement(ToolGui, { tools: this.tools })
        Roact.mount(toolGui, playerGui)
        
    }

    requireTools() {
        
        /*settings.tools.forEach(toolSetting => {

            const toolModule = tools[toolSetting.name] as ModuleScript
            const toolExport = require(toolModule) as Export
            const toolClass = toolExport._default as typeof Tool

            const tool = this.addTool(new toolClass("", ""))

        })*/

    }

    tools = new Array<Tool>()
    tool: Tool | undefined
    area: Model | undefined

    joinRemote = new Remote("join")

}

export const localManager = new LocalManager()