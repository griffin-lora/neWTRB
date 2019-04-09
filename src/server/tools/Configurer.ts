import { Tool } from "../Tool"
import { localManager } from "../localManager"
import Render, { RenderProps } from "../components/Render"
import { settings } from "../../shared/settings"
import { globalManager } from "../../shared/globalManager"
import Config, { ConfigProps, NumberConstrainedData } from "../components/Config"
import { TextService } from "rbx-services"

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

                let valid = localManager.isValid(props.cframe, player)

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

                        } else if (receivedTypeName === "string") {

                            let filteredString = "String filtering failed. Please try again."

                            const [ success ] = pcall(() => {

                                if (typeIs(value, "string")) {

                                    const result = TextService.FilterStringAsync(value, player.UserId) as TextFilterResult

                                    filteredString = result.GetNonChatStringForBroadcastAsync()

                                }

                            })

                            value = filteredString

                        }

                        if (receivedTypeName === configType.name) {

                            configProps.configValues[name] = value

                            localManager.save(player)

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