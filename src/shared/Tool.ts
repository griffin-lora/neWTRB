export class Tool {

    constructor(player: Player) {

        if (!this.name) {

            this.name = "Tool"

        }

        const tool = new Instance("Tool")

        tool.Parent = player

        if (this.name) {

            tool.Name = this.name

        }

    }

    name: string | undefined
    

}