import { localManager } from "./localManager"
import { Remote } from "./Remote"

export class Tool {

    constructor(name: string, image: string) {
        
        this.name = name
        this.remote = new Remote(name)
        this.remote.event((...args) => {

            this.event(...args)

        })
        this.image = image

    }

    equip() {

        this.equipped = true
        
        if (localManager.tool) {

            localManager.tool.unequip()

        }

        localManager.tool = this

    }

    unequip() {

        this.equipped = false

        localManager.tool = undefined
        
    }

    event(...args: unknown[]) {



    }

    fire(...args: unknown[]) {

        this.remote.fire(...args)

    }

    equipped = false

    name: string
    remote: Remote
    image: string

}