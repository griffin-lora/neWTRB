import { Tool } from "../Tool"
import { localManager } from "../localManager"
import Render, { RenderProps } from "../components/Render"
import { settings } from "../../shared/settings"
import { globalManager } from "../../shared/globalManager"
import Config, { ConfigProps, NumberConstrainedData } from "../components/Config"
import { Unknown } from "../../shared/Unknown"
import inspect from "rbx-inspect";

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
                    
                    if (configProps.configTypes[name]) {

                        const configType = configProps.configTypes[name]

                        let receivedTypeName = typeOf(value) as string
                        
                        if (typeIs(value, "number") && (configType.name === "NumberConstrained" || configType.name === "Option")) {

                            receivedTypeName = configType.name

                            if (configType.name === "NumberConstrained") {

                                const data = configType.data as NumberConstrainedData

                                const newValue = math.clamp(value, data.min, data.max)

                                if (newValue !== value) {

                                    throw "attempt to go below min or above max."

                                }

                            } else if (configType.name === "Option") {

                                const data = configType.data as Array<string>

                                if (value < 0 || value > data.length) {

                                    throw "attempt to chose an invalid option."

                                }

                            }

                        }

                        if (receivedTypeName === configType.name) {

                            configProps.configValues[name] = value

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