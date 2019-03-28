import { Entity } from "./Entity"
import { RunService } from "rbx-services"

export class Component {

    constructor(entity: Entity, props: object) {

        this.entity = entity
        this.props = props

        this.updateConnection = RunService.Stepped.Connect(() => {

            this.update()

        })
        
    }

    update() {

        

    }

    destroy() {

        this.exists = false
        this.updateConnection.Disconnect()

    }

    entity: Entity
    props: object
    updateConnection: RBXScriptConnection
    exists = true

}