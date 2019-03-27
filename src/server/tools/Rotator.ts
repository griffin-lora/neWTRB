import { Tool } from "../Tool"
import { localManager } from "../localManager"
import Render, { RenderProps } from "../components/Render"
import { settings } from "../../shared/settings"
import { globalManager } from "../../shared/globalManager";

export default class Rotator extends Tool {
    
    constructor() {

        super("rotator")

    }

    event(player: Player, id: unknown, ...args: unknown[]) {

        super.event(player, id, ...args)
        
        if (typeIs(id, "string")) {
            
            const entity = localManager.getEntityById(id)

            const render = entity.components.get(Render)

            if (render) {

                const props = render.props as RenderProps
                
                let valid = true
                
                if (settings.restricted) {

                    const area = localManager.getAreaByPlayer(player)

                    valid = globalManager.isInArea(area.model, props.cframe)

                }

                if (valid) {

                    const eulerAngles = [ props.cframe.toEulerAnglesYXZ() ]

                    const [ x, y, z ] = [ eulerAngles[0], eulerAngles[1], eulerAngles[2] ]

                    if (typeIs(x, "number") && typeIs(y, "number") && typeIs(z, "number")) {

                        props.cframe = new CFrame(props.cframe.Position).mul(CFrame.Angles(x, y + math.rad(90), z))

                    }
                    
                    if (settings.restricted) {

                        const area = localManager.getAreaByPlayer(player)
                        
                        area.save()

                    }

                } else {

                    throw "Attempted to rotate outside of building area."

                }

            } else {

                throw "Entity does not have render component."

            }

        } else {

            throw "Attempted to fire remote with invalid types."

        }

    }

}