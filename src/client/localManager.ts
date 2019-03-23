import { Players } from "rbx-services"
import * as Roact from "rbx-roact"
import { Tool } from "./Tool"
import { ToolGui } from "./components/ToolGui"
const player = Players.LocalPlayer as Player
const playerGui = player.PlayerGui as PlayerGui


class LocalManager {

    constructor() {

        this.tool = undefined

    }
    
    addTool(tool: Tool) {

        this.tools.push(tool)

    }

    renderTools() {

        const toolGui = Roact.createElement(ToolGui, { tools: this.tools })
        Roact.mount(toolGui, playerGui)
        
    }

    tools = new Array<Tool>()
    tool: Tool | undefined

}

export const localManager = new LocalManager()