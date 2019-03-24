import { Component } from "../Component"
import { Entity } from "../Entity"
import { Workspace } from "rbx-services"

export interface RenderProps {

    cframe: CFrame
    size: Vector3
    model: Model

}

export default class Render extends Component {

    constructor(entity: Entity, props: RenderProps) {

        super(entity, props)

        this.model = props.model.Clone()
        this.model.SetPrimaryPartCFrame(props.cframe)
        this.model.Parent = Workspace

    }

    update() {

        const props = this.props as RenderProps
        
        this.model.SetPrimaryPartCFrame(props.cframe)

    }

    model: Model

}