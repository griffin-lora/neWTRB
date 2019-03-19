import { Component, ComponentProperties } from "./Component"
import inspect from "rbx-inspect";

export class Entity {

    constructor() {



    }

    addComponent(componentClass: typeof Component, properties: ComponentProperties) {

        const component = new componentClass(componentClass, properties)

        this.components.push(component)

        return component

    }

    components = new Array<Component>()

}