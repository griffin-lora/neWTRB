import { Players } from "rbx-services"
import { localManager } from "./localManager"
import { Remote } from "./Remote"
import { Area } from "./Area"

Players.PlayerAdded.Connect(localManager.playerConnect)
Players.PlayerRemoving.Connect(localManager.playerDisconnect)

const stamper = new Remote("stamper")

stamper.event(player => {

    print(player)

})

localManager.addArea(new Area(new CFrame(8, 20.3000031, -5)))
localManager.addArea(new Area(new CFrame(120, 20.3000031, -5)))
localManager.addArea(new Area(new CFrame(8, 20.3000031, 107)))
localManager.addArea(new Area(new CFrame(120, 20.3000031, 107)))
localManager.addArea(new Area(new CFrame(-104, 20.3000031, -5)))
localManager.addArea(new Area(new CFrame(-104, 20.3000031, 107)))
localManager.addArea(new Area(new CFrame(-104, 20.3000031, -117)))
localManager.addArea(new Area(new CFrame(8, 20.3000031, -117)))
localManager.addArea(new Area(new CFrame(120, 20.3000031, -117)))

/*
	self.list = {BuildingArea(Vector3(8, 20.3000031, -5), Vector3(0, 90, 0), clients), BuildingArea(Vector3(120, 20.3000031, -5), Vector3(0, 0, 0), clients), BuildingArea(Vector3(8, 20.3000031, 107), Vector3(0, 180, 0), clients), BuildingArea(Vector3(120, 20.3000031, 107), Vector3(0, 270, 0), clients), BuildingArea(Vector3(-104, 20.3000031, -5), Vector3(0, 90, 0), clients), BuildingArea(Vector3(-104, 20.3000031, 107), Vector3(0, 180, 0), clients), BuildingArea(Vector3(-104, 20.3000031, -117), Vector3(0, 180, 0), clients), BuildingArea(Vector3(8, 20.3000031, -117), Vector3(0, 90, 0), clients), BuildingArea(Vector3(120, 20.3000031, -117), Vector3(0, 0, 0), clients)}

*/