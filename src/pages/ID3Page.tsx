import { useEffect, useState } from "react";
import { ToggleDarkMode } from "../components/ToggleDarkMode";
import Box from "@mui/material/Box";
import {
  // GenerateEmployeeNominalData,
  GenerateWeatherNominalData,
} from "../datagenerator/Generator";
import { DataTable } from "../components/DataTable";
import { CreateSubsetsByCategory } from "../datagenerator/Subset";
import Typography from "@mui/material/Typography";
import { DropDownSelect } from "../components/DropDownSelect";
import { Entropy } from "../util/equations";
import TextField from "@mui/material/TextField";
import { CustomDownloadDataButton } from "../components/CustomCSVDownloadButton";
import { generateSeed } from "../util/equations";
import { CategorySubset } from "../datagenerator/types";

const initialRecordCount = 5;
const initialMinUnique = 2;
const initialMaxUnique = 3;
const initialMaxCategoryCount = -1;
const initialSeed = generateSeed();
const GenerateAllNominalData = GenerateWeatherNominalData;

export function ID3Page() {
  const [currentSeed, setCurrentSeed] = useState(initialSeed);

  const [nominalData, setNominalData] = useState(
    GenerateAllNominalData({
      recordCount: initialRecordCount,
      minUnique: initialMinUnique,
      maxUnique: initialMaxUnique,
      maxCategoryCount: initialMaxCategoryCount,
      seed: initialSeed,
    })
  );
  const [recordCount, setRecordCount] = useState<number>(initialRecordCount);
  const [minUnique, setMinUnique] = useState<number>(initialMinUnique);
  const [maxUnique, setMaxUnique] = useState<number>(initialMaxUnique);
  const [maxCategoryCount, setMaxCategoryCount] = useState<number>(
    initialMaxCategoryCount
  );

  const [targetLabel, setTargetLabel] = useState<string>("");
  const [targetEntropy, setTargetEntropy] = useState<number>(0);
  const [tablesByAttributeValue, setTablesByAttributeValue] =
    useState<CategorySubset[]>();

  useEffect(() => {
    setNominalData(
      GenerateAllNominalData({
        recordCount: recordCount,
        minUnique: minUnique,
        maxUnique: maxUnique,
        maxCategoryCount: maxCategoryCount,
        seed: currentSeed,
      })
    );
  }, [recordCount, minUnique, maxUnique, currentSeed, maxCategoryCount]);

  useEffect(() => {
    if (targetLabel) {
      const { res, workingOut } = Entropy({
        data: nominalData,
        categoryName: targetLabel,
      });
      console.log(workingOut);
      setTargetEntropy(res);

      // Here is where I can calculate
      const subTablesByValueByAttribute: CategorySubset[] = Object.keys(
        nominalData[0]
      ).map((attributeName) => {
        return {
          categoryName: attributeName,
          subset: CreateSubsetsByCategory({
            data: nominalData,
            categoryName: attributeName,
          }),
        };
      });
      setTablesByAttributeValue(subTablesByValueByAttribute);
    }
  }, [targetLabel]);

  return (
    <Box
      p={2}
      width="100%"
      height="100%"
      minHeight="100%"
      style={{
        scrollSnapType: "y proximity",
        scrollPaddingTop: "5vh",
        overflowY: "scroll",
      }}
    >
      <Box
        display="flex"
        width="100%"
        minHeight="100%"
        style={{
          scrollSnapAlign: "start",
        }}
        flexDirection={{ xs: "column", sm: "column", md: "column", lg: "row" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          flex={1}
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography align="center" variant="h1">
            ID3 Algorithm
          </Typography>
          <Typography align="center" variant="h4">
            Iterative Dichotomiser 3
          </Typography>
          <Typography align="center" variant="body1">
            ID3 Algorithm Decision Tree out of Nominal values dataset
          </Typography>
        </Box>
        <Box
          flex={1}
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <ol>
            <li>
              Determine entropy for the overall the dataset using class
              distribution.
            </li>
            <li>
              For each feature.
              <ul>
                <li>Calculate Entropy for Categorical Values.</li>
                <li>
                  Assess information gain for each unique categorical value of
                  the feature.
                </li>
              </ul>
            </li>
            <li>Choose the feature that generates highest information gain.</li>
            <li>
              Iteratively apply all above steps to build the decision tree
              structure.
            </li>
          </ol>
        </Box>
      </Box>

      <Box
        width="100%"
        minHeight="100%"
        style={{
          scrollSnapAlign: "start",
        }}
      >
        <Box display="flex">
          <Box flex={2} p={1}>
            <Typography variant="h2">The Data</Typography>
            <Typography px={1} align="right">
              Nominal Data Table
            </Typography>
            <Box p={1}>
              <DataTable
                data={nominalData}
                // caption={`Nominal Data`}
              />
            </Box>
          </Box>

          <Box
            flex={1}
            p={2}
            display="flex"
            flexDirection="column"
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Box>
              <Box
                flex={1}
                sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
              >
                <Typography>Data Generator Settings</Typography>
                <TextField
                  id="recordcount-number"
                  label="recordCount"
                  type="number"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  value={recordCount}
                  onChange={(e) => {
                    let val = parseInt(e.target.value);
                    if (val > 0) {
                      setRecordCount(parseInt(e.target.value));
                    }
                  }}
                />
                <TextField
                  id="minunique-number"
                  label="minUnique"
                  type="number"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  value={minUnique}
                  onChange={(e) => {
                    let val = parseInt(e.target.value);
                    if (val <= maxUnique && val > 0) {
                      setMinUnique(val);
                    }
                  }}
                />
                <TextField
                  id="maxunique-number"
                  label="maxUnique"
                  type="number"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  value={maxUnique}
                  onChange={(e) => {
                    let val = parseInt(e.target.value);
                    if (val >= minUnique && val > 0) {
                      setMaxUnique(val);
                    }
                  }}
                />
                <TextField
                  id="maxcategorycount-number"
                  label="maxCategoryCount"
                  type="number"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  value={maxCategoryCount}
                  onChange={(e) => {
                    let val = parseInt(e.target.value);
                    if (val > 0) {
                      setMaxCategoryCount(val);
                    }
                  }}
                />
                <TextField
                  id="seed-number"
                  label="seed"
                  type="number"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  value={currentSeed}
                  onChange={(e) => {
                    let val = parseInt(e.target.value);
                    if (val > 0) {
                      setCurrentSeed(val);
                    } else {
                      setCurrentSeed(generateSeed());
                    }
                  }}
                />
              </Box>

              {nominalData ? (
                <Box p={1}>
                  <CustomDownloadDataButton
                    delimiter=","
                    filename={`data-seed_${currentSeed}-min_${minUnique}-max_${maxUnique}-records_${recordCount}.csv`}
                    data={nominalData}
                  />
                </Box>
              ) : null}

              <Box
                p={1}
                display="flex"
                alignItems="center"
                flexDirection="column"
              >
                <Typography variant="h4" align="center">
                  Step 1. Calculate Overall Entropy
                </Typography>
                <Box m={1}>
                  <DropDownSelect
                    idString="select-target-attribute"
                    labelIdString="select-target-attribute-label"
                    label="Choose a Label (target attribute)"
                    choices={Object.keys(nominalData[0])}
                    onSelect={(val) => {
                      setTargetLabel(val);
                    }}
                  />
                </Box>
                {targetLabel ? (
                  <Typography variant="body1" align="center">
                    Entropy for {targetLabel} is {targetEntropy}
                  </Typography>
                ) : null}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {targetLabel && tablesByAttributeValue ? (
        <>
          <Box
            width="100%"
            minHeight="100%"
            style={{
              scrollSnapAlign: "start",
            }}
          >
            <Typography variant="h1">
              Let's go through each feature and calculate the entropy and
              information gain for categorical values.
            </Typography>
          </Box>
          {tablesByAttributeValue.map((tabByVal) => {
            return tabByVal?.subset?.map((subtable, i1) => {
              if (targetLabel === tabByVal.categoryName) {
                return null;
              }

              return (
                <Box key={i1} minHeight="100%" display="flex">
                  <Box flex={1} m={1}>
                    <Typography px={1} align="right">
                      {tabByVal.categoryName}:{subtable.categoryValue}
                    </Typography>
                    <Box
                      p={1}
                      width="100%"
                      minHeight="100%"
                      style={{
                        scrollSnapAlign: "start",
                      }}
                    >
                      <DataTable
                        data={subtable.subset}
                        // caption={`${tabByVal.categoryName}:${subtable.categoryValue}`}
                      />
                    </Box>
                  </Box>
                  <Box flex={1}>
                    <Typography p={1} variant="body1">
                      Target Label Entropy in this subtable is:{" "}
                      {
                        Entropy({
                          data: subtable.subset,
                          categoryName: targetLabel,
                        }).res
                      }
                    </Typography>
                    <Typography p={1} variant="body2">
                      Information is the probability of "
                      {subtable.categoryValue}" value over total record count.{" "}
                      {subtable.subset.length} {" / "} {nominalData.length} ={" "}
                      {subtable.subset.length / nominalData.length} x Entropy of{" "}
                      {targetLabel} for this subset:{" "}
                      {
                        Entropy({
                          data: subtable.subset,
                          categoryName: targetLabel,
                        }).res
                      }{" "}
                      which equals:{" "}
                      {(subtable.subset.length / nominalData.length) *
                        Entropy({
                          data: subtable.subset,
                          categoryName: targetLabel,
                        }).res}
                    </Typography>
                    <Typography p={1} variant="body2">
                      Information Gain is now the subset's tartget class entropy
                      minus the subset entropy of the target label under the
                      records that have the current value{" "}
                      {subtable.categoryValue} for attribute{" "}
                      {tabByVal.categoryName} which is equal to :{" "}
                      {targetEntropy -
                        (subtable.subset.length / nominalData.length) *
                          Entropy({
                            data: subtable.subset,
                            categoryName: targetLabel,
                          }).res}
                    </Typography>
                  </Box>
                </Box>
              );
            });
          })}
        </>
      ) : null}

      <Box
        width="100%"
        minHeight="100%"
        style={{
          scrollSnapAlign: "start",
        }}
      >
        <p>
          <ToggleDarkMode />
        </p>
        <a
          target="_blank"
          href="https://icons8.com/icon/BTZ3w6agexne/evergreen"
        >
          Tree
        </a>{" "}
        icon by{" "}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </Box>
    </Box>
  );
}
