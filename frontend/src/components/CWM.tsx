import { useWeb3React } from '@web3-react/core';
import { Contract, ethers, Signer } from 'ethers';
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useState
} from 'react';
import styled from 'styled-components';
import CWMTokenArtifact from '../artifacts/contracts/cwmToken.sol/CwmTokenV2.json';
import MockUSDCTokenArtifact from '../artifacts/contracts/mockUSDCToken.sol/MockUSDCToken.json';
import CWMTokenV1Artifact from '../artifacts/contracts/cwmTokenV1.sol/CwmTokenV1.json';
import CWMBrokerArtifact from '../artifacts/contracts/cwmBroker.sol/CwmBroker.json';
import { Provider } from '../utils/provider';
import { SectionDivider } from './SectionDivider';

const StyledDeployContractButton = styled.button`
  width: 180px;
  height: 2rem;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
  place-self: center;
`;

const StyledGreetingDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 135px 2.7fr 1fr;
  grid-gap: 10px;
  place-self: center;
  align-items: center;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledInput = styled.input`
  padding: 0.4rem 0.6rem;
  line-height: 2fr;
`;

const StyledButton = styled.button`
  width: 150px;
  height: 2rem;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
`;

export function CWM(): ReactElement {
  const context = useWeb3React<Provider>();
  const { library, active } = context;

  const [signer, setSigner] = useState<Signer>();
  const [cwmToken, setCwmToken] = useState<Contract>();
  const [cwmBroker, setCwmBroker] = useState<Contract>();
  const [cwmTokenAddress, setCwmTokenAddress] = useState<string>();
  const [cwmBrokerAddress, setCwmBrokerAddress] = useState<string>();
  const [currentBalance, setCurrentBalance] = useState<string>('');
  const [amountInput, setAmountInput] = useState<string>('');

  // Signer comes from a connected wallet (metamask, rainbow, etc)
  useEffect((): void => setSigner(library?.getSigner()), [library]);

  // Get initial values from the contracts if available.
  useEffect((): void => {
    if (!signer || !cwmToken) return;

    async function getBalance(cwmToken: Contract): Promise<void> {
      const _balance = await cwmToken.balanceOf(signer?.getAddress());
      if (_balance !== currentBalance) setCurrentBalance(_balance);
    }

    getBalance(cwmToken);
  }, [cwmToken, currentBalance, signer]);

  function handleDeployContract(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    // only deploy the contracts once, when a signer is defined
    if (!signer || (cwmToken && cwmBroker)) return;

    async function deployContract(artifact: any, signer: Signer, deployArgs: string[]): Promise<Contract> {
      const contract = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);

      const deployedContract = deployArgs.length ? await contract.deploy(...deployArgs) : await contract.deploy();
      await deployedContract.deployed();
      return deployedContract;
    }

    async function deployContracts(signer: Signer) {
      try {
        const cwmToken = await deployContract(CWMTokenArtifact, signer, []);
        const usdcToken = await deployContract(MockUSDCTokenArtifact, signer, []);
        const cwmTokenV1 = await deployContract(CWMTokenV1Artifact, signer, []);
        const cwmBroker = await deployContract(CWMBrokerArtifact, signer, [
          cwmToken.address,
          usdcToken.address, 
          cwmTokenV1.address,
          await signer.getAddress()
        ]);
        setCwmToken(cwmToken);
        setCwmTokenAddress(cwmToken.address);
        setCwmBroker(cwmBroker);
        setCwmBrokerAddress(cwmBroker.address);
      } catch (error: any) {
        window.alert(
          'Error!' + (error && error.message ? `\n\n${error.message}` : '')
        );
      }
    }

    deployContracts(signer);

  }

  function handleAmountInputChange(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setAmountInput(event.target.value);
  }

  function handleAmountInputSubmit(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();

    if (!cwmBroker || !cwmToken) {
      window.alert('Undefined contracts cwmToken or cwmBroker');
      return;
    }

    if (!amountInput) {
      window.alert('Input cannot be empty');
      return;
    }

    async function submitDeposit(cwmBroker: Contract, cwmToken: Contract): Promise<void> {
      try {
        const depositTxn = await cwmBroker.deposit(ethers.utils.parseEther(amountInput));

        await depositTxn.wait();

        const signerAddress = await signer?.getAddress();
        const newBalance = await cwmToken.balanceOf(signerAddress);
        window.alert(`Success!\n\Balance is now: ${newBalance}`);

        if (newBalance !== currentBalance) {
          setCurrentBalance(newBalance);
        }
      } catch (error: any) {
        window.alert(
          'Error!' + (error && error.message ? `\n\n${error.message}` : '')
        );
      }
    }

    submitDeposit(cwmBroker, cwmToken);
  }

  async function handleMint(
    event: MouseEvent<HTMLButtonElement>
  ): Promise<void> {
    event.preventDefault();
    if (!cwmToken) {
      alert('Undefined cwmToken');
      return;
    }
    const withdrawTxn = await cwmToken.mint();
    await withdrawTxn.wait();
  }

  const hasContracts = !!(cwmToken && cwmBroker);
  const deployBtnInactive = !active || hasContracts;
  const canSubmitAmount = active && hasContracts;

  return (
    <>
      <StyledDeployContractButton
        disabled={deployBtnInactive}
        style={{
          cursor: deployBtnInactive ? 'not-allowed' : 'pointer',
          borderColor: deployBtnInactive ? 'unset' : 'blue',
        }}
        onClick={handleDeployContract}>
        Deploy CWM Contracts
      </StyledDeployContractButton>
      <SectionDivider />
      <StyledDeployContractButton onClick={handleMint}>
        Mint
      </StyledDeployContractButton>
      <SectionDivider />
      <StyledGreetingDiv>
        <StyledLabel>CWM Contract addr</StyledLabel>
        <div>{cwmTokenAddress || <em>{`<Contract not yet deployed>`}</em>}</div>
        {/* empty placeholder div below to provide empty first row, 3rd col div for a 2x3 grid */}
        <div></div>
        <StyledLabel>CWM Broker addr</StyledLabel>
        <div>{cwmBrokerAddress || <em>{`<Contract not yet deployed>`}</em>}</div>
        {/* empty placeholder div below to provide empty first row, 3rd col div for a 2x3 grid */}
        <div></div>
        <StyledLabel>Current balance</StyledLabel>
        <div>{currentBalance || <em>{`<Contract not yet deployed>`}</em>}</div>
        {/* empty placeholder div below to provide empty first row, 3rd col div for a 2x3 grid */}
        <div></div>
        <StyledLabel htmlFor='amountInput'>Deposit amount</StyledLabel>
        <StyledInput
          id='amountInput'
          type='text'
          placeholder={amountInput ? '' : '<Contract not yet deployed>'}
          onChange={handleAmountInputChange}
          style={{
            fontStyle: amountInput ? 'normal' : 'italic',
          }}></StyledInput>
        <StyledButton
          disabled={!canSubmitAmount}
          style={{
            cursor: !canSubmitAmount ? 'not-allowed' : 'pointer',
            borderColor: !canSubmitAmount ? 'unset' : 'blue',
          }}
          onClick={handleAmountInputSubmit}>
          Submit
        </StyledButton>
      </StyledGreetingDiv>
    </>
  );
}
