import { Component } from "../Component"
import { Entity } from "../Entity"
import { Workspace } from "rbx-services"
import Core, { CoreProps } from "./Core"
const entities = Workspace.entities

export interface RenderProps {

    cframe: CFrame
    size: Vector3
    model: Model
    anchored: boolean

}

export default class Render extends Component {

    constructor(entity: Entity, props: RenderProps) {

        super(entity, props)

        this.model = props.model.Clone()
        props.model = this.model

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
            
            if (props.anchored) {
                
                this.model.SetPrimaryPartCFrame(props.cframe)
                
            } else {
                
                props.cframe = this.model.GetPrimaryPartCFrame()
                
            }

        }

    }

    destroy() {

        super.destroy()

        this.model.Destroy()
        
    }

    model: Model

}