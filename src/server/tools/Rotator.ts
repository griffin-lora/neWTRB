import { Tool } from "../Tool"
import { localManager } from "../localManager"
import Render, { RenderProps } from "../components/Render"

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

                const eulerAngles = [ props.cframe.toEulerAnglesYXZ() ]

                const [ x, y, z ] = [ eulerAngles[0], eulerAngles[1], eulerAngles[2] ]

                if (typeIs(x, "number") && typeIs(y, "number") && typeIs(z, "number")) {

                    props.cframe = new CFrame(props.cframe.Position).mul(CFrame.Angles(x, y + math.rad(90), z))

                }

            }

        }

    }

}