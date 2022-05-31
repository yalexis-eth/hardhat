import type { NumberLike } from "../../types";

import {
  getHardhatProvider,
  toRpcQuantity,
  assertLargerThan,
} from "../../utils";

import { latest } from "./latest";
import { millis } from "./duration";

/**
 * Sets the timestamp of the next block but doesn't mine one.
 *
 * @param timestamp Can be `Date` or Epoch seconds. Must be greater than the latest block's timestamp
 */
export async function setNextBlockTimestamp(
  timestamp: NumberLike | Date
): Promise<void> {
  const provider = await getHardhatProvider();

  const timestampRpc = toRpcQuantity(
    timestamp instanceof Date ? millis(timestamp.valueOf()) : timestamp
  );

  const latestTimestampRpc = toRpcQuantity(await latest());

  assertLargerThan(
    BigInt(timestampRpc),
    BigInt(latestTimestampRpc),
    "timestamp"
  );

  await provider.request({
    method: "evm_setNextBlockTimestamp",
    params: [timestampRpc],
  });
}
