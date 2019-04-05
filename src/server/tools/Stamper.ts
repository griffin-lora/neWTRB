import { Tool } from "../Tool"
import { getEntityDatum, settings } from "../../shared/settings"
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
                
                const entityDatum = getEntityDatum(name)

                entityDatum.components.forEach(componentDatum => {

                    if (componentDatum.name === "Render") {

                        componentDatum.props.cframe = cframe

                    }

                })
                
                const entity = localManager.createEntity(entityDatum)

                if (settings.restricted) {

                    const area = localManager.getAreaByPlayer(player)
                    
                    area.save()

                }

            } else {

                throw "attempt to place outside of building area."

            }

        } else {

            throw "attempt to fire remote with invalid types."

        }

    }

}