import { Entity } from "../Entity"
import { Core } from "../components/Core"
import { Render } from "../components/Render"
import { ReplicatedStorage } from "rbx-services"

export class World extends Entity {

    constructor() {

        super()

        this.addComponent(Core, { id: "{WORLD-ENTITY}", name: "world" })
        this.addComponent(Render, { model: ReplicatedStorage.assets.map })

    }

}