export function getColumnUniqueValuesWithOccurrence({
  data,
  categoryName,
}: {
  data: { [key: string]: string | number }[];
  categoryName: string;
}) {
  let uniqueValsWithOccurrence: { [key: string]: number } = {};
  for (let i = 0; i < data.length; i++) {
    if (uniqueValsWithOccurrence.hasOwnProperty(data[i][categoryName])) {
      uniqueValsWithOccurrence[data[i][categoryName]]++;
    } else {
      uniqueValsWithOccurrence[data[i][categoryName]] = 1;
    }
  }

  return {
    uniqueValsWithOccurrence,
    uniqueVals: Object.keys(uniqueValsWithOccurrence),
    totalValCount: data.length,
  };
}
