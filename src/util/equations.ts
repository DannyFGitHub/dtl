import { getColumnUniqueValuesWithOccurrence } from "./helper";

export function Entropy({
  data,
  categoryName,
}: {
  data: { [key: string]: string | number }[];
  categoryName: string;
}): {
  res: number;
  workingOut: string;
} {
  console.log("Calculating");

  let { uniqueValsWithOccurrence, uniqueVals, totalValCount } =
    getColumnUniqueValuesWithOccurrence({ data, categoryName });

  let workingOut = "";
  let entropy = 0;
  for (let i = 0; i < uniqueVals.length; i++) {
    let pCi = uniqueValsWithOccurrence[uniqueVals[i]] / totalValCount;
    entropy += pCi * Math.log2(pCi);
    workingOut +=
      "(" +
      uniqueValsWithOccurrence[uniqueVals[i]] +
      " / " +
      totalValCount +
      " ) x log2 " +
      "(" +
      uniqueValsWithOccurrence[uniqueVals[i]] +
      " / " +
      totalValCount +
      " ) + ";
  }
  return {
    res: -entropy,
    workingOut,
  };
}

export function generateSeed() {
  return Math.floor(100000 + Math.random() * 900000);
}
