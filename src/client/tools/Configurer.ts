import { Tool } from "../Tool"
import { Workspace, RunService } from "rbx-services"
import { Remote } from "../Remote"
import { EntitySetting, ComponentSetting } from "../../shared/settings"
import { Selector } from "./Selector"
import { mouse } from "../player"
import { Unknown } from "../../shared/Unknown"

const entities = Workspace.entities as Folder
const getEntitySettingRemote = new Remote("getEntitySetting")

export interface ConfigProps {

    config: Unknown

}

class ConfigEntity {

    constructor(model: Model, configSetting: ComponentSetting) {

        this.model = model
        this.configSetting = configSetting

        this.selectionBox = new Instance("SelectionBox")
        this.selectionBox.Color3 = Color3.fromRGB(0, 0, 255)
        this.selectionBox.Adornee = model
        this.selectionBox.Parent = model

    }

    model: Model
    configSetting: ComponentSetting
    selectionBox: SelectionBox

}

export default class Configurer extends Tool {
    
    constructor() {

        super("configurer", "http://www.roblox.com/asset/?id=59102714")

        entities.GetChildren().forEach(model => {

            this.addConfigEntity(model)

        })

        entities.ChildAdded.Connect(model => {

            this.addConfigEntity(model)

        })

        mouse.Button1Up.Connect(() => {

            const configEntity = this.getSelected()
            
            if (configEntity) {

                const props = configEntity.configSetting.props as ConfigProps

                const entries = Object.entries(props.config)

                entries.forEach(entry => {

                    const name = entry[0]
                    const value = entry[1]

                    print(name, value)

                })

            }

        })

    }

    addConfigEntity(model: Instance) {

        if (model.IsA("Model")) {

            let entitySetting: EntitySetting | undefined

            getEntitySettingRemote.event((receivedEntitySetting: unknown, ...args: unknown[]) => {
                
                if (typeIs(receivedEntitySetting, "table")) {

                    entitySetting = receivedEntitySetting as EntitySetting

                }

            })
            
            getEntitySettingRemote.fire(model.WaitForChild("entityId").Value)

            do {

                wait()

            } while (!entitySetting)
            
            getEntitySettingRemote.clear()

            if (entitySetting && typeIs(entitySetting, "table")) {

                entitySetting = entitySetting as EntitySetting

                let configSetting: ComponentSetting | undefined

                entitySetting.components.forEach(componentSetting => {

                    if (componentSetting.name === "Config") {

                        configSetting = componentSetting

                    }

                })

                if (configSetting) {

                    const configEntity = new ConfigEntity(model, configSetting)
                    configEntity.selectionBox.Visible = this.equipped

                    this.configEntities.push(configEntity)

                }

            }

        }

    }

    getSelected(): ConfigEntity | undefined {

        const selected = Selector.getSelected(this)

        let actualConfigEntity: ConfigEntity | undefined

        this.configEntities.forEach(configEntity => {
            
            if (configEntity.model === selected) {

                actualConfigEntity = configEntity
                
            }

        })

        return actualConfigEntity

    }

    equip() {

        super.equip()

        this.configEntities.forEach(configEntity => {

            configEntity.selectionBox.Visible = true

        })
        
    }

    unequip() {

        super.unequip()

        this.configEntities.forEach(configEntity => {

            configEntity.selectionBox.Visible = false

        })

    }

    configEntities = new Array<ConfigEntity>()

}