import { Component } from "../Component"
import { Entity } from "../Entity"
import { Unknown } from "../../shared/Unknown"

export interface ConfigProps {

    configTypes: Unknown<ConfigType>
    configValues: Unknown<unknown>

}

export interface ConfigType {

    name: string
    data: unknown | undefined

}

export interface NumberConstrainedData {
    
    min: number
    max: number

}

export default class Config extends Component {

    constructor(entity: Entity, props: ConfigProps) {

        super(entity, props)
    }

    update() {

        super.update()

    }

    destroy() {

        super.destroy()

    }

}