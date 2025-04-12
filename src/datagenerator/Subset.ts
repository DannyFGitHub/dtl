import { getColumnUniqueValuesWithOccurrence } from "../util/helper";
import { CategoryValueSubset, DataInstance } from "./types";

export function CreateSubsetsByCategory({
  categoryName,
  data,
}: {
  categoryName: string;
  data: DataInstance[];
}): CategoryValueSubset[] {
  if (!data || data.length < 1 || !Object.keys(data[0]).includes(categoryName))
    throw "Not enough in the data table";

  let { uniqueVals } = getColumnUniqueValuesWithOccurrence({
    data,
    categoryName,
  });

  return [
    ...uniqueVals.map((uniqueVal) => {
      let subset = data.filter((entry) => {
        return entry[categoryName] == uniqueVal;
      });
      return {
        categoryValue: uniqueVal,
        subset,
      };
    }),
  ];
}
