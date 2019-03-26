import { Players, ReplicatedStorage } from "rbx-services"
import { localManager } from "./localManager"
import { Remote } from "./Remote"
import { Area } from "./Area"
import { settings } from "../shared/settings"
import Stamper from "./tools/Stamper"
import Deleter from "./tools/Deleter"
import { Tool } from "./Tool"
import { Export } from "../shared/Export"
const tools = ReplicatedStorage.server.tools

Players.PlayerAdded.Connect(localManager.playerConnect)
Players.PlayerRemoving.Connect(localManager.playerDisconnect)

localManager.addArea(new Area(new CFrame(8, 20.3000031, -5)))
localManager.addArea(new Area(new CFrame(120, 20.3000031, -5)))
localManager.addArea(new Area(new CFrame(8, 20.3000031, 107)))
localManager.addArea(new Area(new CFrame(120, 20.3000031, 107)))
localManager.addArea(new Area(new CFrame(-104, 20.3000031, -5)))
localManager.addArea(new Area(new CFrame(-104, 20.3000031, 107)))
localManager.addArea(new Area(new CFrame(-104, 20.3000031, -117)))
localManager.addArea(new Area(new CFrame(8, 20.3000031, -117)))
localManager.addArea(new Area(new CFrame(120, 20.3000031, -117)))

localManager.createEntity(settings.entities[0])

settings.tools.forEach(toolSetting => {

    const toolModule = tools[toolSetting.name] as ModuleScript
    const toolExport = require(toolModule) as Export
    const toolClass = toolExport._default as typeof Tool

    const tool = new toolClass("")

})

/*
	self.list = {BuildingArea(Vector3(8, 20.3000031, -5), Vector3(0, 90, 0), clients), BuildingArea(Vector3(120, 20.3000031, -5), Vector3(0, 0, 0), clients), BuildingArea(Vector3(8, 20.3000031, 107), Vector3(0, 180, 0), clients), BuildingArea(Vector3(120, 20.3000031, 107), Vector3(0, 270, 0), clients), BuildingArea(Vector3(-104, 20.3000031, -5), Vector3(0, 90, 0), clients), BuildingArea(Vector3(-104, 20.3000031, 107), Vector3(0, 180, 0), clients), BuildingArea(Vector3(-104, 20.3000031, -117), Vector3(0, 180, 0), clients), BuildingArea(Vector3(8, 20.3000031, -117), Vector3(0, 90, 0), clients), BuildingArea(Vector3(120, 20.3000031, -117), Vector3(0, 0, 0), clients)}

*/