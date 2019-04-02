import { Tool } from "../Tool"

export default class Configurer extends Tool {
    
    constructor() {

        super("configurer")

    }

    event(player: Player, id: unknown, cframe: unknown, ...args: unknown[]) {

        super.event(player, id, cframe, ...args)

    }

}