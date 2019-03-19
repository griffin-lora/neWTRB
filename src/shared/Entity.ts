import { Component, ComponentProperties } from "./Component"

export class Entity {

    constructor() {



    }

    addComponent(componentClass: typeof Component, properties: ComponentProperties) {

        const component = new componentClass(componentClass, this, properties)
        
        this.components.push([componentClass, component])

        return component

    }

    getComponent(componentClass: typeof Component) {

        this.components.forEach(componentDatum => {

            const otherComponentClass = componentDatum[0]
            const component = componentDatum[1]

            if (componentClass === otherComponentClass) {

                return component

            }

        })

    }

    destroy() {

        this.components.forEach(componentDatum => {

            const component = componentDatum[1]

            component.destroy()

        })

    }

    components = new Array<[typeof Component, Component]>()

}