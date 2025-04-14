import { address, createSolanaRpc, createSolanaRpcSubscriptions } from "@solana/kit";



const rpc = createSolanaRpc("https://api.devnet.solana.com");
const wallet = address("4e912VLe29C3yVkX8LQomv1J5nJ3M53kgjSqTKfiedEE");
const balance = await rpc.getBalance(wallet).send();

console.log(balance);

const rpcSubscription = createSolanaRpcSubscriptions("wss://api.devnet.solana.com");

const abortController = new AbortController();

const accountNotifications = await rpcSubscription
  .accountNotifications(wallet, { commitment: "confirmed"})
  .subscribe({ abortSignal: abortController.signal });

  
