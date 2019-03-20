import { gameManager } from "../shared/gameManager"
import { World } from "../shared/entities/World"
import StamperTool from "./tools/Stamper"
import Brick from "../shared/assets/Brick"
import { Tool } from "./components/Tool"

const world = gameManager.createEntity(World)
const stamper = gameManager.createEntity(StamperTool)

let f = stamper.getComponent(Tool)

let comp: Tool

if (f) {
    
    comp = f

    if (comp.properties) {

        comp.properties.equipped = true

    }

}