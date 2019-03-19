import { Component } from "../Component"
import { Render } from "./Render"

export interface AssetProperties {

    

}

export class Asset extends Component {

    start() {

        const render = this.entity.getComponent(Render)

        if (render !== undefined) {

            this.render = render

        }
    
    }

    update() {

        if (this.render) {



        }
        
    }

    render: Render | undefined

    properties: AssetProperties | undefined

    static properties = {  }

}