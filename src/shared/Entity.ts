import { Component, ComponentProperties } from "./Component"

export class Entity {

    constructor() {



    }

    addComponent(componentClass: typeof Component, properties: ComponentProperties) {

        const component = new componentClass(componentClass, this, properties)

        this.components.push(component)

        return component

    }

    destroy() {

        this.components.forEach(component => {

            component.destroy()

        })

    }

    components = new Array<Component>()

}