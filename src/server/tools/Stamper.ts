import { Tool } from "../Tool"
import { getEntitySetting, settings } from "../../shared/settings"
import { localManager } from "../localManager"
import Render, { RenderProps } from "../components/Render"
import { globalManager } from "../../shared/globalManager"

export default class Stamper extends Tool {
    
    constructor() {

        super("stamper")

    }

    event(player: Player, name: unknown, cframe: unknown, ...args: unknown[]) {

        super.event(player, name, cframe, ...args)
        
        if (typeIs(name, "string") && typeIs(cframe, "CFrame")) {

            let valid = true

            if (settings.restricted) {

                const area = localManager.getAreaByPlayer(player)

                valid = globalManager.isInArea(area.model, cframe)

            }
            
            if (valid) {
                
                const entitySetting = getEntitySetting(name)
                
                const entity = localManager.createEntity(entitySetting)

                const render = entity.components.get(Render)

                if (render) {

                    const props = render.props as RenderProps

                    props.cframe = cframe

                } else {

                    throw "Entity does not have Render component."

                }

                if (settings.restricted) {

                    const area = localManager.getAreaByPlayer(player)
                    
                    area.save()

                }

            } else {

                throw "Attempted to place outside of building area."

            }

        } else {

            throw "Attempted to fire remote with invalid types."

        }

    }

}