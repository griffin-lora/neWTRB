import { Component } from "../Component"
import { Core } from "./Core"
import { ReplicatedStorage, RunService } from "rbx-services"

const remoteEvent = ReplicatedStorage.assets.remoteEvent as RemoteEvent

export interface RemoteProperties {

    event: boolean,
    args: Array<unknown>

}

export class Remote extends Component {

    start() {

        const core = this.entity.getComponent(Core)

        if (core !== undefined) {

            this.core = core

        }

        if (RunService.IsClient()) {

            remoteEvent.OnClientEvent.Connect((id: string, ...args: unknown[]) => {

                if (this.properties) {

                    this.properties.event = !!(this.core && this.core.properties && this.core.properties.id === id)
                    this.properties.args = [...args]

                }

            })

        } else if (RunService.IsServer()) {

            remoteEvent.OnServerEvent.Connect((player: Player, id: unknown, ...args: unknown[]) => {
                
                if (this.properties && typeIs(id, "string")) {
                    
                    this.properties.event = !!(this.core && this.core.properties && this.core.properties.id === id)
                    this.properties.args = [player, ...args]

                }

            })

        }
    
    }
    
    private core: Core | undefined

    properties: RemoteProperties | undefined

    static properties = { event: false, args: [] }

}