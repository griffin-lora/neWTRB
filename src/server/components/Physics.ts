import { Component } from "../Component"
import { Entity } from "../Entity"
import Render, { RenderProps } from "./Render"
import { Workspace } from "rbx-services"

export class Collision {

    constructor(part: BasePart, normal: Vector3) {
        
        const position = part.CFrame.Position
        const halfSize = part.Size.div(2)
        const direction = normal.mul(halfSize).mul(1.1)
        
        const ray = new Ray(position, direction)

        const [ hitPart ] = Workspace.FindPartOnRay(ray, part.Parent)
        
        this.hit = !!hitPart
        this.hitPart = hitPart

    }

    hit: boolean
    hitPart: BasePart | undefined

}

export interface PhysicsProps {

    

}

export default class Physics extends Component {

    constructor(entity: Entity, props: PhysicsProps) {

        super(entity, props)

        const render = this.entity.components.get(Render) as Render

        if (render) {

            this.render = render
            
            const renderProps = render.props as RenderProps

            const collisions = this.getCollisions()

            const model = renderProps.model
            const primaryPart = model.PrimaryPart as BasePart
            
            collisions.forEach(collision => {

                if (collision.hitPart) {
                    
                    const weldConstraint = new Instance("WeldConstraint")
                    weldConstraint.Part0 = collision.hitPart
                    weldConstraint.Part1 = primaryPart
                    weldConstraint.Parent = primaryPart

                }

            })

            renderProps.anchored = false

            model.GetDescendants().forEach(descendant => {

                if (descendant.IsA("BasePart") && descendant !== primaryPart) {
                    
                    const weldConstraint = new Instance("WeldConstraint")
                    weldConstraint.Part0 = descendant
                    weldConstraint.Part1 = primaryPart
                    weldConstraint.Parent = descendant
                    
                } else if (descendant.IsA("JointInstance")) {

                    descendant.Destroy()

                }

            })
            
        }

    }

    update() {
        
        if (this.render) {
            
            const renderProps = this.render.props as RenderProps

            /*if (renderProps.anchored) {

                const collisions = this.getCollisions()

                let hit = false

                collisions.forEach(collision => {

                    if (collision.hit) {

                        hit = true

                    }

                })
                
                if (hit === false) {
                    
                    renderProps.anchored = false
                    
                }

            }*/

            const model = renderProps.model
            
            model.GetDescendants().forEach(descendant => {

                if (descendant.IsA("BasePart")) {
                    
                    descendant.Anchored = renderProps.anchored
                    
                }

            })

        }

    }

    destroy() {

        super.destroy()

    }

    getCollisions() {

        const collisions = new Array<Collision>()

        if (this.render) {
            
            const renderProps = this.render.props as RenderProps

            const primaryPart = renderProps.model.PrimaryPart as BasePart
            
            collisions.push(new Collision(primaryPart, new Vector3(1, 0, 0)))
            collisions.push(new Collision(primaryPart, new Vector3(-1, 0, 0)))
            collisions.push(new Collision(primaryPart, new Vector3(0, 1, 0)))
            collisions.push(new Collision(primaryPart, new Vector3(0, -1, 0)))
            collisions.push(new Collision(primaryPart, new Vector3(0, 0, 1)))
            collisions.push(new Collision(primaryPart, new Vector3(0, 0, -1)))

        }

        return collisions

    }

    render: Render | undefined

}