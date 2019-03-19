import { Entity } from "../shared/Entity"
import { Render } from "../shared/components/Render"
import { ReplicatedStorage } from "rbx-services"

const entity = new Entity()

const comp = entity.addComponent(Render, { model: ReplicatedStorage.assets.map })