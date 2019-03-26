import { Component } from "../Component"
import { Entity } from "../Entity"

export interface CoreProps {

    id: string

}

export default class Core extends Component {

    constructor(entity: Entity, props: CoreProps) {
        
        super(entity, props)

    }

}