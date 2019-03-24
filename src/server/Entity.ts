import { Component } from "./Component"

export class Entity {

    components = new Map<typeof Component, Component>()

}