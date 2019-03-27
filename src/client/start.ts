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

// Disabled while roblox-ts still has the type import bug
// localManager.requireTools()

localManager.renderTools()

Players.LocalPlayer.CharacterAdded.Connect(character => {

    if (localManager.area) {

        const prim = localManager.area.PrimaryPart as BasePart

        (character.WaitForChild("HumanoidRootPart") as BasePart).CFrame = prim.CFrame.add(new Vector3(0, 10, 0))

    }

})