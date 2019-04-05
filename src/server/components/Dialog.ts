import { Component } from "../Component"
import { Entity } from "../Entity"
import Render from "./Render"
import Config, { ConfigProps } from "./Config"
import { Chat, TextService } from "rbx-services"

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
        
        this.render = (render as Render) || undefined
        this.config = (config as Config) || undefined

        spawn(() => {

            while (true) {

                if (this.render && this.config) {

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

                    Chat.Chat(primaryPart, configValues.Message, color)
        
                }

                wait(1)

            }

        })

    }

    update() {

        super.update()

    }

    destroy() {

        super.destroy()

    }

    render: Render | undefined
    config: Config | undefined

}