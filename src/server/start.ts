import { Players, ServerScriptService } from "rbx-services"
import { localManager } from "./localManager"
import { Remote } from "./Remote"
import { Area } from "./Area"
import { settings } from "../shared/settings"
import Stamper from "./tools/Stamper"
import Deleter from "./tools/Deleter"
import { Tool } from "./Tool"
import { Export } from "../shared/Export"
import { Cleaner } from "./Cleaner"

Players.PlayerAdded.Connect(player => {
    
    localManager.playerConnect(player)

})
Players.PlayerRemoving.Connect(player => {

    localManager.playerDisconnect(player)

})

if (settings.restricted) {

    settings.areaCframes.forEach(cframe => {

        localManager.addArea(new Area(cframe))

    })

}

localManager.requireTools()

const getEntityDatumRemote = new Remote("getEntityDatum", false)
getEntityDatumRemote.event((player, id: unknown, ...args) => {
    
    if (typeIs(id, "string")) {

        const entity = localManager.getEntityById(id) // CAUSES AN ERROR SOMETIMES.

        const entityDatum = entity.entityDatum
        
        getEntityDatumRemote.fire(player, entityDatum)

    } else {

        throw "attempt to fire remote with invalid types."

    }

})

if (settings.restricted) {

    const cleaner = new Cleaner()

}

/*
	self.list = {BuildingArea(Vector3(8, 20.3000031, -5), Vector3(0, 90, 0), clients), BuildingArea(Vector3(120, 20.3000031, -5), Vector3(0, 0, 0), clients), BuildingArea(Vector3(8, 20.3000031, 107), Vector3(0, 180, 0), clients), BuildingArea(Vector3(120, 20.3000031, 107), Vector3(0, 270, 0), clients), BuildingArea(Vector3(-104, 20.3000031, -5), Vector3(0, 90, 0), clients), BuildingArea(Vector3(-104, 20.3000031, 107), Vector3(0, 180, 0), clients), BuildingArea(Vector3(-104, 20.3000031, -117), Vector3(0, 180, 0), clients), BuildingArea(Vector3(8, 20.3000031, -117), Vector3(0, 90, 0), clients), BuildingArea(Vector3(120, 20.3000031, -117), Vector3(0, 0, 0), clients)}

*/