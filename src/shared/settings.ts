import { ReplicatedStorage } from "rbx-services"

export interface ComponentProps {

    [key: string]: unknown

}

export interface ComponentSetting {

    name: string
    props: ComponentProps

}

export interface EntitySetting {

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

            components: [

                { name: "Model", props: { model: ReplicatedStorage.assets.brick } }

            ]

        }

    ],

    tools: [

        { name: "Stamper" }

    ]

} as Settings