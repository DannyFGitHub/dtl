import CsvDownloadButton from "react-json-to-csv";
import { styled } from "@mui/material/styles";

export const CustomDownloadDataButton = styled(CsvDownloadButton)(
  ({ theme }) => ({
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    transition: "all 150ms ease",
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(14),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: theme.shadows[2],
    },
  })
);
