import { Tool } from "../Tool"
import { getEntitySetting } from "../../shared/settings"
import { localManager } from "../localManager"
import Render, { RenderProps } from "../components/Render"

export default class Stamper extends Tool {
    
    constructor() {

        super("stamper")

    }

    event(player: Player, name: unknown, cframe: unknown, ...args: unknown[]) {

        super.event(player, name, cframe, ...args)
        
        if (typeIs(name, "string") && typeIs(cframe, "CFrame")) {
            
            const entitySetting = getEntitySetting(name)
            
            if (entitySetting) {

                const entity = localManager.createEntity(entitySetting)

                const render = entity.components.get(Render)

                if (render) {

                    const props = render.props as RenderProps

                    props.cframe = cframe

                }

            }

        }

    }

}