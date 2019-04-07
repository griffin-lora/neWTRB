import { Component } from "../Component"
import { Entity } from "../Entity"
import { localManager } from "../localManager"
import Source, { SourceProps } from "./Source"

export interface ReceiverProps {

    name: string
    sourceId: string | undefined

}

export default class Receiver extends Component {

    constructor(entity: Entity, props: ReceiverProps) {

        super(entity, props)
        
    }

    update() {

        super.update()

        const props = this.props as ReceiverProps

        if (props.sourceId && this.sourceId !== props.sourceId) {

            pcall(() => {

                if (props.sourceId) {

                    this.sourceEntity = localManager.getEntityById(props.sourceId)
                    this.sourceId = props.sourceId

                }

            })

        }

        if (this.sourceEntity) {

            if (!this.sourceEntity.exists) {

                props.sourceId = undefined
                this.sourceEntity = undefined

            }
            
        }

        if (this.sourceEntity) {

            const source = this.sourceEntity.components.get(Source) as Source

            if (source) {
                
                const sourceProps = source.props as SourceProps
                
                this.active = sourceProps.active
                
            }
            
        } else {

            this.active = false

        }

    }

    destroy() {

        super.destroy()

    }

    sourceEntity: Entity | undefined
    sourceId: string | undefined
    active = false

}