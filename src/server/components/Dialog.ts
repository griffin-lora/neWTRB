import { Component } from "../Component"
import { Entity } from "../Entity"
import Render from "./Render"
import Config, { ConfigProps } from "./Config"
import { Chat, TextService } from "rbx-services"
import Receiver from "./Receiver"

export interface DialogProps {



}

export interface DialogConfigValues {

    Message: string
    Color: 0 | 1 | 2 | 3

}

export default class Dialog extends Component {

    constructor(entity: Entity, props: DialogProps) {

        super(entity, props)

        const render = entity.components.get(Render)
        const config = entity.components.get(Config)
        const receiver = entity.components.get(Receiver)
        
        this.render = (render as Render) || undefined
        this.config = (config as Config) || undefined
        this.receiver = (receiver as Receiver) || undefined

    }

    update() {

        super.update()

        if (this.render && this.config && this.receiver && (tick() - this.lastTicked) >= 1) {

            this.lastTicked = tick()

            const props = this.config.props as ConfigProps

            const configValues = props.configValues as DialogConfigValues

            const primaryPart = this.render.model.PrimaryPart as BasePart

            let color: Enum.ChatColor | undefined
            
            if (configValues.Color === 0) {

                color = Enum.ChatColor.Blue

            } else if (configValues.Color === 1) {

                color = Enum.ChatColor.Green

            } else if (configValues.Color === 2) {

                color = Enum.ChatColor.Red

            } else if (configValues.Color === 3) {

                color = Enum.ChatColor.White

            }

            if (this.receiver.active && configValues.Message !== "") {

                Chat.Chat(primaryPart, configValues.Message, color)
                
            }

        }

    }

    destroy() {

        super.destroy()

    }

    render: Render | undefined
    config: Config | undefined
    receiver: Receiver | undefined
    lastTicked = tick()
    
}