import { Entity } from "../Entity"
import { Render } from "../components/Render"
import { ReplicatedStorage } from "rbx-services"

export class World extends Entity {

    constructor() {

        super()

        this.addComponent(Render, { model: ReplicatedStorage.assets.map })

    }

}