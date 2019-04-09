import { Component } from "../Component"
import { Entity } from "../Entity"
import { ContentProvider } from "rbx-services"
import Render from "./Render"

const faces = [ "rbxassetid://15324447", "rbxassetid://30265036", "rbxassetid://14123340", "rbxassetid://28118994", "rbxassetid://24067663", "rbxassetid://23931977", "rbxassetid://8329421" ]

export interface ToiletProps {

    

}

export default class Toilet extends Component {

    constructor(entity: Entity, props: ToiletProps) {

        super(entity, props)
        
        const render = (entity.components.get(Render) as Render) || undefined

        if (render) {

            const model = render.model
            
            const toilet = model.Seat as Seat

            let head: BasePart | undefined
            let face: Decal | undefined
            let toiletFace: Decal | undefined

            toilet.GetPropertyChangedSignal("Occupant").Connect(() => {

                const occupant = toilet.Occupant

                if (!head && occupant) {

                    const character = occupant.Parent as Model

                    head = character.Head as BasePart

                    face = head.face as Decal

                    face.Parent = undefined

                    toiletFace = face.Clone()
                    toiletFace.Texture = faces[math.random(0, faces.length - 1)]
                    toiletFace.Parent = head

                } else if (toiletFace && head && face) {
                    
                    toiletFace.Destroy()
                    
                    face.Parent = head

                    head = undefined
                    face = undefined
                    toiletFace = undefined

                }

            })

        }
        
    }

    update() {

        super.update()

    }

    destroy() {

        super.destroy()

    }

}