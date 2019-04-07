import { ToolGui } from "./components/ToolGui"
import { Tool } from "./Tool"
import * as Roact from "rbx-roact"
import { Players, StarterGui, ReplicatedStorage, Workspace, RunService } from "rbx-services"
import { localManager } from "./localManager"
import { settings } from "../shared/settings"
import { Export } from "../shared/Export"
import { player } from "./player"
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

player.CharacterAdded.Connect(character => {

    do {

        RunService.RenderStepped.Wait()

    } while (!character.PrimaryPart)

    if (localManager.area) {

        character.SetPrimaryPartCFrame(localManager.area.GetPrimaryPartCFrame().add(new Vector3(0, 10, 0)))

    } else {

        Workspace.GetDescendants().forEach(descendant => {

            if (descendant.IsA("SpawnLocation") && descendant.Enabled) {

                character.SetPrimaryPartCFrame(descendant.CFrame.add(new Vector3(0, 10, 0)))

            }

        })

    }

})