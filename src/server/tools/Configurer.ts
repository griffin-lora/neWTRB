import { Tool } from "../Tool"
import { localManager } from "../localManager"
import Render, { RenderProps } from "../components/Render"
import { settings } from "../../shared/settings"
import { globalManager } from "../../shared/globalManager"
import Config, { ConfigProps } from "../components/Config"
import { Unknown } from "../../shared/Unknown"


export default class Configurer extends Tool {
    
    constructor() {

        super("configurer")

    }

    event(player: Player, id: unknown, name: unknown, value: unknown, ...args: unknown[]) {

        super.event(player, id, name, value, ...args)

        if (typeIs(id, "string") && typeIs(name, "string") && (typeIs(value, "number") || typeIs(value, "string"))) {
            
            const entity = localManager.getEntityById(id)

            const render = entity.components.get(Render)
            const config = entity.components.get(Config)

            if (render && config) {

                const props = render.props as RenderProps

                let valid = true

                if (settings.restricted) {

                    const area = localManager.getAreaByPlayer(player)

                    valid = globalManager.isInArea(area.model, props.cframe)

                }

                if (valid) {
                    
                    const configProps = config.props as ConfigProps

                    if (configProps.config[name]) {

                        if (typeOf(configProps.config[name]) === typeOf(value)) {

                            configProps.config[name] = value

                            if (settings.restricted) {
                                
                                const area = localManager.getAreaByPlayer(player)
                                
                                area.save()

                            }

                        } else {

                            throw "attempt to change type."

                        }
                        
                    } else {

                        throw "attempt to add config value."

                    }

                } else {

                    throw "attempt to delete outside of building area."

                }

            } else {

                throw `missing render or config component.`

            }

        } else {

            throw "attempt to fire remote with invalid types."

        }

    }

}