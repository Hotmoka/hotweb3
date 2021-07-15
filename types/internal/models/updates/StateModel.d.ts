import { UpdateModel } from "./UpdateModel";
/**
 * The model of the state of an object: just the set of its updates.
 */
export declare class StateModel {
    updates: Array<UpdateModel>;
    constructor(updates: Array<UpdateModel>);
}
