import { ToolGui } from "./components/ToolGui"
import { Tool } from "./Tool"
import * as Roact from "rbx-roact"
import { Players, StarterGui, ReplicatedStorage } from "rbx-services"
import { localManager } from "./localManager"
import { settings } from "../shared/settings"
import { Export } from "../shared/Export"
const tools = ReplicatedStorage.client.tools

StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Backpack, false)

settings.tools.forEach(toolSetting => {

    const toolModule = tools[toolSetting.name] as ModuleScript
    const toolExport = require(toolModule) as Export
    const toolClass = toolExport._default as typeof Tool

    const tool = localManager.addTool(new toolClass("", ""))

})

localManager.renderTools()

Players.LocalPlayer.CharacterAdded.Connect(character => {

    (character.WaitForChild("HumanoidRootPart") as BasePart).CFrame = new CFrame(24, 53.9, -88)

})