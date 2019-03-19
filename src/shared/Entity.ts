import { Component, ComponentProperties } from "./Component"

export class Entity {

    constructor() {



    }

    addComponent(componentClass: typeof Component, properties: ComponentProperties) {

        const component = new componentClass(properties)

        this.components.push(component)

    }

    components = new Array<Component>()

}