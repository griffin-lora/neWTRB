import { ReplicatedStorage } from "rbx-services"

const remoteEvent = ReplicatedStorage.remoteEvent as RemoteEvent

export class Remote {

    constructor(name: string) {

        this.name = name
        
        remoteEvent.OnServerEvent.Connect((player, name, ...args) => {

            if (typeIs(name, "string") && name === this.name) {

                [...args].forEach(arg => {

                    if (typeIs(arg, "table") || typeIs(arg, "userdata")) {

                        player.Kick("Attempt to give the server a table or userdatum.")

                    }

                })
                
                this.events.forEach(event => {

                    const [ success, message ] = pcall(() => {
                        
                        event(player, ...args)

                    })
                    
                    if (!success) {

                        player.Kick(`Caused a server error. Error is: ${ message }`)

                    }
        
                })
                
            } else if (!typeIs(name, "string")) {

                player.Kick("Attempt to give server invalid name.")

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