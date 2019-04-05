import { Component } from "../Component"
import { Entity } from "../Entity"
import Render from "./Render"
import Config, { ConfigProps } from "./Config"

const ids = ["rbxassetid://60059129", "rbxassetid://60051616", "rbxassetid://60047782", "rbxassetid://60049010"]

export interface BoomboxProps {



}

export interface BoomboxConfigValues {

    Music: 0 | 1 | 2 | 3
    Volume: number

}

export default class Boombox extends Component {

    constructor(entity: Entity, props: BoomboxProps) {

        super(entity, props)
        

        const render = entity.components.get(Render)
        const config = entity.components.get(Config)
        
        this.render = (render as Render) || undefined
        this.config = (config as Config) || undefined

    }

    update() {

        if (this.render && this.config) {

            const props = this.config.props as ConfigProps

            const configValues = props.configValues as BoomboxConfigValues

            const sound = this.render.model.Boombox.Sound as Sound

            const soundId = ids[configValues.Music]

            if (sound.SoundId !== soundId) {

                sound.Play()

            }
            
            sound.SoundId = soundId
            sound.Volume = configValues.Volume

        }

    }

    destroy() {

        super.destroy()

    }

    render: Render | undefined
    config: Config | undefined

}