import { ReplicatedStorage, Workspace } from "rbx-services"

const model = ReplicatedStorage.assets.area
const areas = Workspace.areas

export class Area {

    constructor(cframe: CFrame) {

        this.model = model.Clone() as Model

        this.model.SetPrimaryPartCFrame(cframe)

        this.model.Parent = areas

    }

    model: Model
    player: Player | undefined

}