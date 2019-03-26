import { Entity } from "./Entity"
import { RunService } from "rbx-services"

export class Component {

    constructor(entity: Entity, props: object) {

        this.entity = entity
        this.props = props

        RunService.Stepped.Connect(() => {

            this.update()

        })
        
    }

    update() {

        

    }

    destroy() {



    }

    entity: Entity
    props: object

}