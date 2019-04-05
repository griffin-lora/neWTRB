import { Component } from "../Component"
import { Entity } from "../Entity"

export interface BaseProps {



}

export default class Base extends Component {

    constructor(entity: Entity, props: BaseProps) {

        super(entity, props)
        
    }

    update() {

        super.update()

    }

    destroy() {

        super.destroy()

    }

}