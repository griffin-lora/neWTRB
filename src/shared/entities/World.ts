import { Entity } from "../Entity"
import { Render } from "../components/Render"

export class World extends Entity {

    constructor() {

        super()

        this.addComponent(Render, {  })

    }

}