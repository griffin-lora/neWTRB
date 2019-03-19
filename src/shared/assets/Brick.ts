import { Entity } from "../Entity"
import { Render } from "../components/Render"
import { Asset } from "../components/Asset"
import { ReplicatedStorage } from "rbx-services"

export class Brick extends Entity {

    constructor() {

        super()

        this.addComponent(Render, { model: ReplicatedStorage.assets.brick })
        this.addComponent(Asset, { })

    }

}