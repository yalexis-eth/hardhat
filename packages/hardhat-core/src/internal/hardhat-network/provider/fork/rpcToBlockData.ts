import { BlockData } from "@ignored/block";

import { RpcBlockWithTransactions } from "../../../core/jsonrpc/types/output/block";

import { rpcToTxData } from "./rpcToTxData";

export function rpcToBlockData(rpcBlock: RpcBlockWithTransactions): BlockData {
  return {
    header: {
      parentHash: rpcBlock.parentHash,
      uncleHash: rpcBlock.sha3Uncles,
      coinbase: rpcBlock.miner,
      stateRoot: rpcBlock.stateRoot,
      transactionsTrie: rpcBlock.transactionsRoot,
      receiptTrie: rpcBlock.receiptsRoot,
      logsBloom: rpcBlock.logsBloom,
      difficulty: rpcBlock.difficulty,
      number: rpcBlock.number ?? undefined,
      gasLimit: rpcBlock.gasLimit,
      gasUsed: rpcBlock.gasUsed,
      timestamp: rpcBlock.timestamp,
      extraData: rpcBlock.extraData,
      mixHash: rpcBlock.mixHash,
      nonce: rpcBlock.nonce,
      baseFeePerGas: rpcBlock.baseFeePerGas,
    },
    transactions: rpcBlock.transactions.map(rpcToTxData),
    // uncleHeaders are not fetched and set here as provider methods for getting them are not supported
  };
}
