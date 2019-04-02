import { Players, ServerScriptService } from "rbx-services"
import { localManager } from "./localManager"
import { Remote } from "./Remote"
import { Area } from "./Area"
import { settings } from "../shared/settings"
import Stamper from "./tools/Stamper"
import Deleter from "./tools/Deleter"
import { Tool } from "./Tool"
import { Export } from "../shared/Export"
import { HelperBot } from "./HelperBot"

Players.PlayerAdded.Connect(player => {
    
    localManager.playerConnect(player)

})
Players.PlayerRemoving.Connect(player => {

    localManager.playerDisconnect(player)

})

if (settings.restricted) {

    localManager.addArea(new Area(new CFrame(8, 20.3000031, -5)))
    localManager.addArea(new Area(new CFrame(120, 20.3000031, -5)))
    localManager.addArea(new Area(new CFrame(8, 20.3000031, 107)))
    localManager.addArea(new Area(new CFrame(120, 20.3000031, 107)))
    localManager.addArea(new Area(new CFrame(-104, 20.3000031, -5)))
    localManager.addArea(new Area(new CFrame(-104, 20.3000031, 107)))
    localManager.addArea(new Area(new CFrame(-104, 20.3000031, -117)))
    localManager.addArea(new Area(new CFrame(8, 20.3000031, -117)))
    localManager.addArea(new Area(new CFrame(120, 20.3000031, -117)))

}

localManager.requireTools()

const getEntitySettingRemote = new Remote("getEntitySetting")
getEntitySettingRemote.event((player, id: unknown, ...args) => {
    
    if (typeIs(id, "string")) {

        const entity = localManager.getEntityById(id)

        const entitySetting = entity.entitySetting

        getEntitySettingRemote.fire(player, entitySetting)

    } else {

        throw "attempt to fire remote with invalid types."

    }

})

const helperBot = new HelperBot()

/*
	self.list = {BuildingArea(Vector3(8, 20.3000031, -5), Vector3(0, 90, 0), clients), BuildingArea(Vector3(120, 20.3000031, -5), Vector3(0, 0, 0), clients), BuildingArea(Vector3(8, 20.3000031, 107), Vector3(0, 180, 0), clients), BuildingArea(Vector3(120, 20.3000031, 107), Vector3(0, 270, 0), clients), BuildingArea(Vector3(-104, 20.3000031, -5), Vector3(0, 90, 0), clients), BuildingArea(Vector3(-104, 20.3000031, 107), Vector3(0, 180, 0), clients), BuildingArea(Vector3(-104, 20.3000031, -117), Vector3(0, 180, 0), clients), BuildingArea(Vector3(8, 20.3000031, -117), Vector3(0, 90, 0), clients), BuildingArea(Vector3(120, 20.3000031, -117), Vector3(0, 0, 0), clients)}

*/