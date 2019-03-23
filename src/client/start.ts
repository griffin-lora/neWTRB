import { ToolGui } from "./components/ToolGui"
import { Tool } from "./Tool"
import * as Roact from "rbx-roact"
import { Players, StarterGui } from "rbx-services"
import Stamper from "./tools/Stamper"
import Deleter from "./tools/Deleter"
import { localManager } from "./localManager"
import Rotator from "./tools/Rotator"
import Configurer from "./tools/Configurer"
import Wirer from "./tools/Wirer"

StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Backpack, false)

localManager.addTool(new Stamper())
localManager.addTool(new Deleter())
localManager.addTool(new Rotator())
localManager.addTool(new Configurer())
localManager.addTool(new Wirer())
localManager.renderTools()

Players.LocalPlayer.CharacterAdded.Connect(character => {

    (character.WaitForChild("HumanoidRootPart") as BasePart).CFrame = new CFrame(24, 53.9, -88)

})