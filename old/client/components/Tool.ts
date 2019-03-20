import { Component } from "../../shared/Component"

export interface ToolProperties {

    player: Player,
    equipped: boolean

}

export class Tool extends Component {

    start() {

        
        
    }

    update() {

        
        
    }

    properties: ToolProperties | undefined

    static properties = { player: undefined, equipped: false }

}