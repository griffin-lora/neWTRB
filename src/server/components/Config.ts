import { Component } from "../Component"
import { Entity } from "../Entity"
import { Unknown } from "../../shared/Unknown"

export interface ConfigProps {

    config: Unknown

}

export default class Config extends Component {

    constructor(entity: Entity, props: ConfigProps) {

        super(entity, props)
    }

    update() {

        

    }

    destroy() {

        super.destroy()

    }

}