/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { CwmBroker, CwmBrokerInterface } from "../CwmBroker";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_stableCoin",
        type: "address",
      },
      {
        internalType: "contract CwmTokenV2",
        name: "_cwmToken",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "_oldToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_vault",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "cwmToken",
    outputs: [
      {
        internalType: "contract CwmTokenV2",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "oldToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stableCoin",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "swap_old",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620019c1380380620019c1833981810160405281019062000037919062000276565b620000576200004b6200016560201b60201c565b6200016d60201b60201c565b83600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050506200038c565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60008151905062000242816200033e565b92915050565b600081519050620002598162000358565b92915050565b600081519050620002708162000372565b92915050565b600080600080608085870312156200028d57600080fd5b60006200029d878288016200025f565b9450506020620002b08782880162000248565b9350506040620002c3878288016200025f565b9250506060620002d68782880162000231565b91505092959194509250565b6000620002ef826200031e565b9050919050565b60006200030382620002e2565b9050919050565b60006200031782620002e2565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6200034981620002e2565b81146200035557600080fd5b50565b6200036381620002f6565b81146200036f57600080fd5b50565b6200037d816200030a565b81146200038957600080fd5b50565b611625806200039c6000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063992642e511610066578063992642e5146100f85780639b31910f14610116578063b31c710a14610134578063b6b55f2514610152578063f2fde38b1461016e57610093565b80632643bca11461009857806340c10f19146100b4578063715018a6146100d05780638da5cb5b146100da575b600080fd5b6100b260048036038101906100ad9190610dd2565b61018a565b005b6100ce60048036038101906100c99190610d6d565b6102d6565b005b6100d86103e5565b005b6100e261046d565b6040516100ef919061101c565b60405180910390f35b610100610496565b60405161010d91906110db565b60405180910390f35b61011e6104bc565b60405161012b91906110c0565b60405180910390f35b61013c6104e2565b60405161014991906110db565b60405180910390f35b61016c60048036038101906101679190610dd2565b610508565b005b61018860048036038101906101839190610d44565b610836565b005b6000819050600081116101d2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101c990611138565b60405180910390fd5b61024333600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1661092e909392919063ffffffff16565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166340c10f1933836040518363ffffffff1660e01b81526004016102a0929190611097565b600060405180830381600087803b1580156102ba57600080fd5b505af11580156102ce573d6000803e3d6000fd5b505050505050565b6102de6109b7565b73ffffffffffffffffffffffffffffffffffffffff166102fc61046d565b73ffffffffffffffffffffffffffffffffffffffff1614610352576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610349906111b8565b60405180910390fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166340c10f1983836040518363ffffffff1660e01b81526004016103af929190611097565b600060405180830381600087803b1580156103c957600080fd5b505af11580156103dd573d6000803e3d6000fd5b505050505050565b6103ed6109b7565b73ffffffffffffffffffffffffffffffffffffffff1661040b61046d565b73ffffffffffffffffffffffffffffffffffffffff1614610461576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610458906111b8565b60405180910390fd5b61046b60006109bf565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000811161054b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161054290611198565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016105a6919061101c565b60206040518083038186803b1580156105be57600080fd5b505afa1580156105d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f69190610dfb565b811115610638576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161062f90611178565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e33306040518363ffffffff1660e01b8152600401610695929190611037565b60206040518083038186803b1580156106ad57600080fd5b505afa1580156106c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106e59190610dfb565b811115610727576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161071e906111d8565b60405180910390fd5b61079833600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1661092e909392919063ffffffff16565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166340c10f1933600a846107e4919061126a565b6040518363ffffffff1660e01b8152600401610801929190611097565b600060405180830381600087803b15801561081b57600080fd5b505af115801561082f573d6000803e3d6000fd5b5050505050565b61083e6109b7565b73ffffffffffffffffffffffffffffffffffffffff1661085c61046d565b73ffffffffffffffffffffffffffffffffffffffff16146108b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108a9906111b8565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610922576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161091990611118565b60405180910390fd5b61092b816109bf565b50565b6109b1846323b872dd60e01b85858560405160240161094f93929190611060565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610a83565b50505050565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000610ae5826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16610b4a9092919063ffffffff16565b9050600081511115610b455780806020019051810190610b059190610da9565b610b44576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b3b90611218565b60405180910390fd5b5b505050565b6060610b598484600085610b62565b90509392505050565b606082471015610ba7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b9e90611158565b60405180910390fd5b610bb085610c76565b610bef576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610be6906111f8565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051610c189190611005565b60006040518083038185875af1925050503d8060008114610c55576040519150601f19603f3d011682016040523d82523d6000602084013e610c5a565b606091505b5091509150610c6a828286610c89565b92505050949350505050565b600080823b905060008111915050919050565b60608315610c9957829050610ce9565b600083511115610cac5782518084602001fd5b816040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ce091906110f6565b60405180910390fd5b9392505050565b600081359050610cff816115aa565b92915050565b600081519050610d14816115c1565b92915050565b600081359050610d29816115d8565b92915050565b600081519050610d3e816115d8565b92915050565b600060208284031215610d5657600080fd5b6000610d6484828501610cf0565b91505092915050565b60008060408385031215610d8057600080fd5b6000610d8e85828601610cf0565b9250506020610d9f85828601610d1a565b9150509250929050565b600060208284031215610dbb57600080fd5b6000610dc984828501610d05565b91505092915050565b600060208284031215610de457600080fd5b6000610df284828501610d1a565b91505092915050565b600060208284031215610e0d57600080fd5b6000610e1b84828501610d2f565b91505092915050565b610e2d816112c4565b82525050565b6000610e3e82611238565b610e48818561124e565b9350610e58818560208601611354565b80840191505092915050565b610e6d8161130c565b82525050565b610e7c81611330565b82525050565b6000610e8d82611243565b610e978185611259565b9350610ea7818560208601611354565b610eb0816113b6565b840191505092915050565b6000610ec8602683611259565b9150610ed3826113c7565b604082019050919050565b6000610eeb601983611259565b9150610ef682611416565b602082019050919050565b6000610f0e602683611259565b9150610f198261143f565b604082019050919050565b6000610f31600e83611259565b9150610f3c8261148e565b602082019050919050565b6000610f54601a83611259565b9150610f5f826114b7565b602082019050919050565b6000610f77602083611259565b9150610f82826114e0565b602082019050919050565b6000610f9a601083611259565b9150610fa582611509565b602082019050919050565b6000610fbd601d83611259565b9150610fc882611532565b602082019050919050565b6000610fe0602a83611259565b9150610feb8261155b565b604082019050919050565b610fff81611302565b82525050565b60006110118284610e33565b915081905092915050565b60006020820190506110316000830184610e24565b92915050565b600060408201905061104c6000830185610e24565b6110596020830184610e24565b9392505050565b60006060820190506110756000830186610e24565b6110826020830185610e24565b61108f6040830184610ff6565b949350505050565b60006040820190506110ac6000830185610e24565b6110b96020830184610ff6565b9392505050565b60006020820190506110d56000830184610e64565b92915050565b60006020820190506110f06000830184610e73565b92915050565b600060208201905081810360008301526111108184610e82565b905092915050565b6000602082019050818103600083015261113181610ebb565b9050919050565b6000602082019050818103600083015261115181610ede565b9050919050565b6000602082019050818103600083015261117181610f01565b9050919050565b6000602082019050818103600083015261119181610f24565b9050919050565b600060208201905081810360008301526111b181610f47565b9050919050565b600060208201905081810360008301526111d181610f6a565b9050919050565b600060208201905081810360008301526111f181610f8d565b9050919050565b6000602082019050818103600083015261121181610fb0565b9050919050565b6000602082019050818103600083015261123181610fd3565b9050919050565b600081519050919050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b600061127582611302565b915061128083611302565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156112b9576112b8611387565b5b828202905092915050565b60006112cf826112e2565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006113178261131e565b9050919050565b6000611329826112e2565b9050919050565b600061133b82611342565b9050919050565b600061134d826112e2565b9050919050565b60005b83811015611372578082015181840152602081019050611357565b83811115611381576000848401525b50505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000601f19601f8301169050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f596f75206e65656420746f2073656e6420736f6d652043574d00000000000000600082015250565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b7f62616c616e6365206973206c6f77000000000000000000000000000000000000600082015250565b7f596f75206e65656420746f2073656e6420736f6d652055534443000000000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f616c6c6f77616e6365206973206c6f7700000000000000000000000000000000600082015250565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b6115b3816112c4565b81146115be57600080fd5b50565b6115ca816112d6565b81146115d557600080fd5b50565b6115e181611302565b81146115ec57600080fd5b5056fea2646970667358221220e12a28ae78f974ddace0fb8354f8d80411e7431e261f341c4c825a83bc18ea9664736f6c63430008020033";

type CwmBrokerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CwmBrokerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CwmBroker__factory extends ContractFactory {
  constructor(...args: CwmBrokerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "CwmBroker";
  }

  deploy(
    _stableCoin: string,
    _cwmToken: string,
    _oldToken: string,
    _vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CwmBroker> {
    return super.deploy(
      _stableCoin,
      _cwmToken,
      _oldToken,
      _vault,
      overrides || {}
    ) as Promise<CwmBroker>;
  }
  getDeployTransaction(
    _stableCoin: string,
    _cwmToken: string,
    _oldToken: string,
    _vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _stableCoin,
      _cwmToken,
      _oldToken,
      _vault,
      overrides || {}
    );
  }
  attach(address: string): CwmBroker {
    return super.attach(address) as CwmBroker;
  }
  connect(signer: Signer): CwmBroker__factory {
    return super.connect(signer) as CwmBroker__factory;
  }
  static readonly contractName: "CwmBroker";
  public readonly contractName: "CwmBroker";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CwmBrokerInterface {
    return new utils.Interface(_abi) as CwmBrokerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CwmBroker {
    return new Contract(address, _abi, signerOrProvider) as CwmBroker;
  }
}
