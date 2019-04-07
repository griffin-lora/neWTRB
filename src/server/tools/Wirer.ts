import { Tool } from "../Tool"
import { localManager } from "../localManager"
import Source from "../components/Source"
import Receiver, { ReceiverProps } from "../components/Receiver"

export default class Wirer extends Tool {
    
    constructor() {

        super("wirer")

    }

    event(player: Player, sourceId: unknown, receiverId: unknown, ...args: unknown[]) {

        super.event(player, sourceId, receiverId, ...args)
        
        if (typeIs(sourceId, "string") && typeIs(receiverId, "string")) {
            
            const sourceEntity = localManager.getEntityById(sourceId)
            const receiverEntity = localManager.getEntityById(receiverId)

            const source = sourceEntity.components.get(Source)
            const receiver = receiverEntity.components.get(Receiver)

            if (source && receiver) {

                const props = receiver.props as ReceiverProps

                props.sourceId = sourceId

            } else {

                throw "attempt at wiring to an invalid entity."

            }

        } else {

            throw "attempt to fire remote with invalid types."

        }

    }

}