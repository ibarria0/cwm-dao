import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
} from "@mui/material";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useContract } from "../hooks/contract";

const Home: NextPage = () => {
  const [value, setValue] = useState(0);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(BigNumber.from(0));
  const [erc20Balance, setERC20Balance] = useState(BigNumber.from(0));
  const { brokerContract, erc20Contract, signer } = useContract();

  useEffect(() => {
    if (!signer) return;
    signer.getBalance().then(setBalance);
    signer.getAddress().then(setAddress);
  }, [signer]);

  useEffect(() => {
    if (!erc20Contract || !address) return;
    erc20Contract.balanceOf(address).then(setERC20Balance);
  }, [erc20Contract, address]);

  async function handleApprove() {
    if (value < 1) {
      alert(`Value needs to be above 0: ${value}`);
      return;
    }

    const response = await erc20Contract?.approve(
      address,
      ethers.utils.parseEther(value.toString())
    );
    await response?.wait();

    alert("Transfer Approved");
  }

  async function handleDeposit() {
    if (value < 1) {
      alert(`Value needs to be above 0: ${value}`);
      return;
    }

    const response = await brokerContract?.deposit(
      ethers.utils.parseEther(value.toString())
    );
    await response?.wait();
    alert("Tokens deposited");
  }

  return (
    <>
      <Head>
        <title>CWM</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Card>
          <CardContent className={styles.form}>
            <TextField
              label="Balance"
              value={ethers.utils.formatEther(balance)}
              disabled
            />

            <TextField
              label="USCD"
              value={ethers.utils.formatEther(erc20Balance)}
              disabled
            />

            <TextField
              id="outlined-number"
              label="Amount to Deposit"
              type="number"
              value={value}
              onChange={(event) => setValue(parseInt(event.target.value))}
            />
          </CardContent>

          <CardActions>
            <Button onClick={handleApprove}>Do Approve</Button>
            <Button onClick={handleDeposit}>Do Deposit</Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};

export default Home;
