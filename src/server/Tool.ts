import { Remote } from "./Remote"

export class Tool {

    constructor(name: string) {

        this.name = name
        this.remote = new Remote(name)
        this.remote.event(this.event)

    }

    event(player: Player, ...args: unknown[]) {

        
        
    }

    fire(player: Player, ...args: unknown[]) {

        this.remote.fire(player, ...args)

    }

    name: string
    remote: Remote
    
}