import { DataStoreService } from "rbx-services"

export class DataStore<T> {

    constructor(store: string) {

        this.instance = DataStoreService.GetDataStore(store)

        game.BindToClose(() => {

            if (this.data) {

                this.instance.SetAsync("key", this.data)

            }

        })

    }

    get() {
        
        return this.data || this.instance.GetAsync("key")

    }

    set(data: T) {

        this.data = data

    }

    private instance: GlobalDataStore
    private data: T | undefined

}