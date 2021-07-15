import { Marshallable } from "../marshalling/Marshallable";
import { MarshallingContext } from "../marshalling/MarshallingContext";
/**
 * A class type that can be used for stored objects in blockchain.
 */
export declare class ClassType extends Marshallable {
    /**
     * The frequently used class type for {@link java.lang.Object}.
     */
    static readonly OBJECT: ClassType;
    /**
     * The frequently used class type for {@link java.lang.String}.
     */
    static readonly STRING: ClassType;
    /**
     * The frequently used class type for {@link java.math.BigInteger}.
     */
    static readonly BIG_INTEGER: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.math.UnsignedBigInteger}.
     */
    static readonly UNSIGNED_BIG_INTEGER: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.tokens.ERC20}.
     */
    static readonly ERC20: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.governance.GasPriceUpdate}.
     */
    static readonly GAS_PRICE_UPDATE: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.lang.ExternallyOwnedAccount}.
     */
    static readonly EOA: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.lang.Contract}.
     */
    static readonly CONTRACT: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.lang.Gamete}.
     */
    static readonly GAMETE: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.lang.Account}.
     */
    static readonly ACCOUNT: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.lang.Accounts}.
     */
    static readonly ACCOUNTS: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.tokens.IERC20}.
     */
    static readonly IERC20: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.governance.Manifest}.
     */
    static readonly MANIFEST: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.governance.Validator}.
     */
    static readonly VALIDATOR: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.governance.Validators}.
     */
    static readonly VALIDATORS: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.governance.Versions}.
     */
    static readonly VERSIONS: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.governance.GasStation}.
     */
    static readonly GAS_STATION: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.governance.GenericGasStation}.
     */
    static readonly GENERIC_GAS_STATION: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.governance.tendermint.TendermintValidators}.
     */
    static readonly TENDERMINT_VALIDATORS: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.lang.Storage}.
     */
    static readonly STORAGE: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.lang.Takamaka}.
     */
    static readonly TAKAMAKA: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.lang.Event}.
     */
    static readonly EVENT: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.lang.PayableContract}.
     */
    static readonly PAYABLE_CONTRACT: ClassType;
    /**
     * The frequently used class type for {@code io.takamaka.code.lang.FromContract}.
     */
    static readonly FROM_CONTRACT: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.lang.View}.
     */
    static readonly VIEW: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.lang.Payable}.
     */
    static readonly PAYABLE: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.lang.ThrowsExceptions}.
     */
    static readonly THROWS_EXCEPTIONS: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.Bytes32}.
     */
    static readonly BYTES32: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.Bytes32Snapshot}.
     */
    static readonly BYTES32_SNAPSHOT: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.StorageArray}.
     */
    static readonly STORAGE_ARRAY: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.StorageListView}.
     */
    static readonly STORAGE_LIST: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.StorageLinkedList}.
     */
    static readonly STORAGE_LINKED_LIST: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.StorageMapView}.
     */
    static readonly STORAGE_MAP: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.StorageTreeMap}.
     */
    static readonly STORAGE_TREE_MAP: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.StorageTreeArray}.
     */
    static readonly STORAGE_TREE_ARRAY: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.StorageTreeArray.Node}.
     */
    static readonly STORAGE_TREE_ARRAY_NODE: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.StorageTreeIntMap}.
     */
    static readonly STORAGE_TREE_INTMAP: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.StorageTreeSet}.
     */
    static readonly STORAGE_TREE_SET: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.StorageTreeMap.BlackNode}.
     */
    static readonly STORAGE_TREE_MAP_BLACK_NODE: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.StorageTreeMap.RedNode}.
     */
    static readonly STORAGE_TREE_MAP_RED_NODE: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.StorageSetView}.
     */
    static readonly STORAGE_SET_VIEW: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.StorageMap}.
     */
    static readonly MODIFIABLE_STORAGE_MAP: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.StorageLinkedList.Node}.
     */
    static readonly STORAGE_LINKED_LIST_NODE: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.StorageTreeMap.Node}.
     */
    static readonly STORAGE_TREE_MAP_NODE: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.util.StorageTreeIntMap.Node}.
     */
    static readonly STORAGE_TREE_INTMAP_NODE: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.governance.GenericValidators}.
     */
    static readonly GENERIC_VALIDATORS: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.dao.Poll}.
     */
    static readonly POLL: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.dao.SharedEntity}.
     */
    static readonly SHARED_ENTITY: ClassType;
    /**
     * The frequently used class type for {@link io.takamaka.code.dao.SharedEntityView}.
     */
    static readonly SHARED_ENTITY_VIEW: ClassType;
    /**
     * The name of the class type.
     */
    readonly name: string;
    /**
     * Builds a class type that can be used for storage objects in blockchain.
     * @param name the name of the class
     */
    constructor(name: string);
    private equals;
    /**
     * Marshals this object into a stream.
     * @param context the context holding the stream
     */
    into(context: MarshallingContext): void;
}
