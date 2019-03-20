import { Entity } from "../Entity"
import { Core } from "../components/Core"
import { Render } from "../components/Render"
import { Asset } from "../components/Asset"
import { ReplicatedStorage, HttpService } from "rbx-services"

export default class Brick extends Entity {

    constructor() {

        super()
        
        this.addComponent(Core, { id: HttpService.GenerateGUID(), name: "brick" })
        this.addComponent(Render, { model: ReplicatedStorage.assets.brick })
        this.addComponent(Asset, { })

    }

}