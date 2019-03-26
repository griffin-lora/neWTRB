import { ReplicatedStorage } from "rbx-services"

export interface ComponentProps {

    [key: string]: unknown

}

export interface ComponentSetting {

    name: string
    props: ComponentProps

}

export interface EntitySetting {

    name: string
    displayName: string
    components: Array<ComponentSetting>

}

export interface ToolSetting {

    name: string

}

export interface Settings {

    entities: Array<EntitySetting>
    tools: Array<ToolSetting>

}

export const settings = {

    entities: [

        {

            name: "Brick",
            displayName: "Brick",
            components: [

                { name: "Render", props: { cframe: new CFrame(), size: new Vector3(), model: ReplicatedStorage.assets.brick } }

            ]

        },

        {

            name: "GrassLongWedge",
            displayName: "GrassLongWedge",
            components: [

                { name: "Render", props: { cframe: new CFrame(), size: new Vector3(), model: ReplicatedStorage.assets.GrassLongWedge } }

            ]

        }

    ],

    tools: [

        { name: "Stamper" },
        { name: "Deleter" },
        { name: "Rotator" }

    ]

} as Settings

export const getEntitySetting = (name: string) => {

    let actualEntitySetting: EntitySetting | undefined
    
    settings.entities.forEach(entitySetting => {
        
        if (entitySetting.name === name) {
            
            actualEntitySetting = entitySetting

        }
        
    })

    return actualEntitySetting

}