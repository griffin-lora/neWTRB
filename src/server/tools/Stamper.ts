import { Tool } from "../Tool"
import { getEntityDatum, settings } from "../../shared/settings"
import { localManager } from "../localManager"
import Render, { RenderProps } from "../components/Render"
import { globalManager } from "../../shared/globalManager"
import { placementType } from "../../shared/enum"

export default class Stamper extends Tool {
    
    constructor() {

        super("stamper")

    }

    event(player: Player, receivedPlacementType: number, ...args: unknown[]) {

        super.event(player, ...args)

        if (typeIs(receivedPlacementType, "number") && receivedPlacementType === placementType.name) {
            
            const [ name, cframe ] = [ ...args ]

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
                    
                    this.fire(player)

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

        } else if (receivedPlacementType === placementType.id) {

            const [ id, cframe ] = [ ...args ]

            if (typeIs(id, "string") && typeIs(cframe, "CFrame")) {

                let valid = true

                if (settings.restricted) {

                    const area = localManager.getAreaByPlayer(player)

                    valid = globalManager.isInArea(area.model, cframe)

                }
                
                if (valid) {

                    const entity = localManager.getEntityById(id)

                    const entityDatum = localManager.clone(entity.entityDatum)

                    entityDatum.components.forEach((componentDatum, index) => {

                        if (componentDatum.name === "Core") {

                            entityDatum.components.remove(index)

                        }

                    })

                    entityDatum.components.forEach(componentDatum => {

                        if (componentDatum.name === "Render") {

                            componentDatum.props.cframe = cframe

                        }

                    })

                    const clone = localManager.createEntity(entityDatum)
                    
                    this.fire(player)

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

        } else {

            throw "attempt to use an invalid PlacementType."

        }

    }

}