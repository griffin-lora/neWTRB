import { RunService } from "rbx-services"
import { Entity } from "./Entity"

export interface ComponentProperties {

    [key: string]: unknown

}

export class Component {

    constructor(componentClass: typeof Component, entity: Entity, properties: ComponentProperties) {
        
        this.entity = entity

        const entries = Object.entries(componentClass.properties)

        entries.forEach(entry => {

            const key = entry[0]
            
            if (!properties[key]) {

                properties[key] = componentClass.properties[key]

            }

        })

        this.properties = properties

        this.start()

        RunService.Stepped.Connect((time, step) => {

            this.update(time, step)

        })

    }

    start() {



    }

    update(time: number, step: number) {

        

    }

    destroy() {



    }

    entity: Entity

    properties: ComponentProperties | unknown

    static properties: ComponentProperties

}