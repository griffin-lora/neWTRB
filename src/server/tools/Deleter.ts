import { Tool } from "../Tool"
import { localManager } from "../localManager"
import { settings } from "../../shared/settings"
import { globalManager } from "../../shared/globalManager"
import Render, { RenderProps } from "../components/Render"

export default class Deleter extends Tool {
    
    constructor() {

        super("deleter")

    }

    event(player: Player, id: unknown, ...args: unknown[]) {

        super.event(player, id, ...args)
        
        if (typeIs(id, "string")) {
            
            const entity = localManager.getEntityById(id)

            const render = entity.components.get(Render)

            if (render) {

                const props = render.props as RenderProps

                let valid = localManager.isValid(props.cframe, player)

                if (valid) {

                    localManager.destroyEntity(entity)

                    localManager.save(player)

                } else {

                    throw "attempt to delete outside of building area."

                }

            } else {

                throw `missing render component.`

            }

        } else {

            throw "attempt to fire remote with invalid types."

        }

    }

}