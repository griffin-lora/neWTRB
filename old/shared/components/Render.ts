import { Component } from "../Component"
import { Workspace } from "rbx-services"

export interface RenderProperties {

    model: Model,
    cframe: CFrame,
    size: Vector3

}

export class Render extends Component {

    start() {

        const properties = this.properties
        
        if (this.properties) {
            
            this.model = this.properties.model.Clone()

            this.model.Parent = Workspace

        }
    
    }

    update() {

        if (this.model && this.properties) {

            this.model.SetPrimaryPartCFrame(this.properties.cframe)

        }
        
    }

    model: Model | undefined

    properties: RenderProperties | undefined

    static properties = { model: new Instance("Model"), cframe: new CFrame(), size: new Vector3() }

}