import { useEffect, useState } from "react";
import { providers } from "ethers";
import { CwmBroker } from "../typechain/CwmBroker";
import { CwmBroker__factory } from "../typechain/factories/CwmBroker__factory";
import { JsonRpcSigner } from "@ethersproject/providers";
import { ERC20, ERC20__factory } from "../typechain";

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

const ADDRESS_CWM_BROKER = "0x";

export function useContract() {
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [brokerContract, setBrokerContract] = useState<CwmBroker | null>();
  const [erc20Contract, setERC20Contract] = useState<ERC20 | null>();

  useEffect(() => {
    async function enableMetamask() {
      if (!window.ethereum) return;
      await window.ethereum.enable();

      const provider = new providers.Web3Provider(window.ethereum);
      setSigner(provider.getSigner());
    }
    enableMetamask();
  }, []);

  useEffect(() => {
    if (!signer) return;
    const broker = new CwmBroker__factory(signer).attach(ADDRESS_CWM_BROKER);
    setBrokerContract(broker);
  }, [signer]);

  useEffect(() => {
    if (!signer) return;
    const erc20 = new ERC20__factory(signer).attach(ADDRESS_CWM_BROKER);
    setERC20Contract(erc20);
  }, [signer]);

  return { brokerContract, erc20Contract, signer };
}
