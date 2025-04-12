import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export function DataTable({
  data,
}: {
  data: {
    [key: string]: number | string;
  }[];
}) {
  if (!data || data.length < 1) {
    return null;
  }

  return (
    <TableContainer elevation={3} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(data[0]).map((k, index) => {
              return (
                <TableCell align="left" key={index}>
                  {k}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((entry, i1) => {
            return (
              <TableRow
                key={i1}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.keys(data[0]).map((k, i2) => {
                  return (
                    <TableCell key={i2} component="th" scope="row">
                      {entry[k]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
