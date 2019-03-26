import { Component } from "../Component"
import { Entity } from "../Entity"
import { Workspace } from "rbx-services"
import Core, { CoreProps } from "./Core"
const entities = Workspace.entities

export interface RenderProps {

    cframe: CFrame
    size: Vector3
    model: Model

}

export default class Render extends Component {

    constructor(entity: Entity, props: RenderProps) {

        super(entity, props)

        this.model = props.model.Clone()

        const core = entity.components.get(Core)
        
        if (core) {

            const coreProps = core.props as CoreProps

            const id = new Instance("StringValue")
            id.Name = "entityId"
            id.Value = coreProps.id
            id.Parent = this.model

        }

        this.model.SetPrimaryPartCFrame(props.cframe)
        this.model.Parent = entities

    }

    update() {

        super.update()

        const props = this.props as RenderProps
        
        if (this.model.PrimaryPart) {

            this.model.SetPrimaryPartCFrame(props.cframe)

        }

    }

    destroy() {

        super.destroy()

        this.model.Destroy()
        
    }

    model: Model

}