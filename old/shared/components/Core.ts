import { Component } from "../Component"
import { HttpService } from "rbx-services"

const ids = new Array<string>()

export interface CoreProperties {

    id: string,
    name: string

}

export class Core extends Component {

    start() {

        let found = false

        ids.forEach(otherId => {

            if (this.properties && otherId === this.properties.id) {

                found = true

            }

        })

        if (this.properties && found) {

            error(`2 entities have the same id. ${this.properties.id}`)

        }
    
    }

    update() {

        
        
    }

    properties: CoreProperties | undefined

    static properties = { id: "{ENTITY-ID}", name: "Name" }

}