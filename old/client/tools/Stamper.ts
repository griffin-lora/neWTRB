import { Entity } from "../../shared/Entity"
import { Core } from "../../shared/components/Core"
import { Tool } from "../components/Tool"
import { Stamper } from "../components/Stamper"
import { HttpService } from "rbx-services"

export default class StamperTool extends Entity {

    constructor() {

        super()

        this.addComponent(Core, { id: "{STAMPER-ENTITY}", name: "stamper" })
        this.addComponent(Tool, {  })
        this.addComponent(Stamper, {  })

    }

}