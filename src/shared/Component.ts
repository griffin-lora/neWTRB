import { RunService } from "rbx-services"

export interface ComponentProperties {

    [key: string]: unknown

}

export class Component {

    constructor(properties: ComponentProperties) {

        this.properties = properties

        this.start()

        RunService.Stepped.Connect(this.update)

    }

    start() {



    }

    update() {

        

    }

    properties: ComponentProperties

}