import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

export function DropDownSelect({
  idString,
  labelIdString,
  label,
  choices,
  onSelect,
}: {
  idString: string;
  labelIdString: string;
  label: string;
  choices: string[];
  onSelect: (value: string) => void;
}) {
  const [targetLabelAttribute, setTargetLabelAttribute] = useState("");

  function handleTargetLabelAttributeChange(e: SelectChangeEvent) {
    console.log(e.target.value);
    setTargetLabelAttribute(e.target.value);
    onSelect(e.target.value);
  }
  return (
    <FormControl
      fullWidth
      sx={{ "& .MuiSelect-root": { maxWidth: "50ch", minWidth: "25ch" } }}
    >
      <InputLabel id={labelIdString}>{label}</InputLabel>
      <Select
        labelId={labelIdString}
        id={idString}
        value={targetLabelAttribute}
        label={label}
        onChange={handleTargetLabelAttributeChange}
      >
        {choices.map((choice, index) => {
          return (
            <MenuItem key={index} value={choice}>
              {choice}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
