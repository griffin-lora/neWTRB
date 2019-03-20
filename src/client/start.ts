import { ToolGui } from "./components/ToolGui"
import { Tool } from "./Tool"
import * as Roact from "rbx-roact"
import { Players } from "rbx-services";

const toolGui = Roact.createElement(ToolGui, {})
Roact.mount(toolGui, Players.LocalPlayer.PlayerGui)