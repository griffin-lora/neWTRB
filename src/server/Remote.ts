import { ReplicatedStorage } from "rbx-services"

const remoteEvent = ReplicatedStorage.remoteEvent as RemoteEvent

export class Remote {

    constructor(name: string) {

        this.name = name

        remoteEvent.OnServerEvent.Connect((player, name: unknown, ...args) => {

            if (typeIs(name, "string") && name === this.name) {

                this.events.forEach(event => {

                    event(player, ...args)
        
                })
                
            }

        })

    }

    fire(player: Player, ...args: unknown[]) {

        remoteEvent.FireClient(player, this.name, ...args)

    }

    fireAll(...args: unknown[]) {

        remoteEvent.FireAllClients(this.name, ...args)

    }

    event(event: (player: Player, ...args: unknown[]) => void) {

        this.events.push(event)

    }

    name: string

    private events = new Array<Function>()

}