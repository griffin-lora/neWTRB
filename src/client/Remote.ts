import { ReplicatedStorage } from "rbx-services"

const remoteEvent = ReplicatedStorage.remoteEvent as RemoteEvent

export class Remote {

    constructor(name: string) {

        this.name = name

        remoteEvent.OnClientEvent.Connect((name: unknown, ...args) => {

            if (typeIs(name, "string") && name === this.name) {

                this.events.forEach(event => {

                    event(...args)
        
                })
                
            }

        })

    }

    fire(...args: unknown[]) {

        remoteEvent.FireServer(this.name, ...args)

    }

    event(event: (...args: unknown[]) => void) {

        this.events.push(event)

    }

    name: string

    private events = new Array<Function>()

}