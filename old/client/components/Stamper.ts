import { Component } from "../../shared/Component"
import { Tool } from "./Tool"
import { Players } from "rbx-services"
import { gameManager } from "../../shared/gameManager"
import Brick from "../../shared/assets/Brick"
import { Entity } from "../../shared/Entity"
import { Render } from "../../shared/components/Render"

const player = Players.LocalPlayer as Player
const mouse = player.GetMouse() as Mouse

export interface StamperProperties {

    

}

export class Stamper extends Component {

    start() {

        const asset = gameManager.createEntity(Brick)

        this.asset = asset

        const tool = this.entity.getComponent(Tool)

        if (tool !== undefined) {

            this.tool = tool

        }
        
    }

    update() {

        if (this.tool && this.tool.properties && this.tool.properties.equipped && this.asset) {

            const render = this.asset.getComponent(Render)

            if (render !== undefined && render.properties) {

                

            }

        }
        
    }

    asset: Entity | undefined

    tool: Tool | undefined

    properties: StamperProperties | undefined

    static properties = {  }

}