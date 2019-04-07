import { Component } from "../Component"
import { Entity } from "../Entity"

export interface SourceProps {

    name: string
    active: boolean

}

export default class Source extends Component {

    constructor(entity: Entity, props: SourceProps) {

        super(entity, props)
        
    }

    update() {

        super.update()

    }

    destroy() {

        super.destroy()

    }

}