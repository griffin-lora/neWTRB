import { Component } from "../Component"
import { Entity } from "../Entity"
import Render from "./Render"

export interface TrapdoorProps {



}

export default class Trapdoor extends Component {

    constructor(entity: Entity, props: TrapdoorProps) {

        super(entity, props)
        
        const render = (entity.components.get(Render) as Render) || undefined

        if (render) {

            const model = render.model

            const door = model.Head as BasePart

            let open = false

            door.Touched.Connect(() => {
                
                if (!open) {

                    open = true
                    wait(0.3)
                    door.Transparency = 1
                    wait(1)
                    door.Transparency = 0
                    open = false

                }

            })

            door.ClearAllChildren()

        }
        
    }

    update() {

        super.update()

    }

    destroy() {

        super.destroy()

    }

}