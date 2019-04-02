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

            const render = entity.components.get(Render) as Render

            if (render) {

                const props = render.props as RenderProps
                
                let valid = true
                
                if (settings.restricted) {

                    const area = localManager.getAreaByPlayer(player)

                    valid = globalManager.isInArea(area.model, props.cframe)

                }

                if (valid) {

                    // props.anchored = false

                    props.model.GetDescendants().forEach(descendant => {

                        if (descendant.IsA("BasePart")) {

                            descendant.Anchored = true

                        }
                        
                    })

                    const [ x, y, z ] = props.cframe.toEulerAnglesYXZ()
                    
                    props.cframe = new CFrame(props.cframe.Position).mul(CFrame.Angles(x, y + math.rad(90), z))
                    render.model.SetPrimaryPartCFrame(props.cframe)

                    /*props.model.GetDescendants().forEach(descendant => {

                        if (descendant.IsA("BasePart")) {

                            descendant.Anchored = false

                        }
                        
                    })*/
                    
                    //props.anchored = true
                    
                    if (settings.restricted) {

                        const area = localManager.getAreaByPlayer(player)
                        
                        area.save()

                    }

                } else {

                    throw "attempt to rotate outside of building area."

                }

            } else {

                throw "missing render component."

            }

        } else {

            throw "attempt to fire remote with invalid types."

        }

    }

}