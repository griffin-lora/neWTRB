import { Component } from "./Component"
import { EntitySetting } from "../shared/settings"

export class Entity {

    constructor(entitySetting: EntitySetting) {

        this.entitySetting = entitySetting
    
    }

    components = new Map<typeof Component, Component>()
    entitySetting: EntitySetting

}