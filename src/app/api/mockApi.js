import { delay } from "../common/util/util";
import { sampleData } from "./sampleData";

export function fetchSampleData() {
  return delay(1000).then(() => {
    return new Promise((resolve) => resolve(sampleData));
  });
}
