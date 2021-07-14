import {UpdateModel} from "./UpdateModel";

/**
 * The model of the state of an object: just the set of its updates.
 */
export class StateModel {
    updates: Array<UpdateModel>

    constructor(updates: Array<UpdateModel>) {
        this.updates = updates
    }
}