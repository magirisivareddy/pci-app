import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";

export const TableRowsLoader = ({ headers, rowsNum }: any) => {
    return [...Array(rowsNum)].map((row, index) => (
        <TableRow key={index}>
            {headers.map((header: { id: React.Key | null | undefined; }) => (
                <TableCell key={header.id} component="th" scope="row">
                    <Skeleton animation="wave" variant="text" />
                </TableCell>
            ))}
        </TableRow>
    ));
};

export const TableLoader = ({ rowsNum }: any) => {
    return (
      <TableBody>
        {[...Array(rowsNum)].map((_, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              <Skeleton animation="wave" variant="text" />
            </TableCell>
      
          </TableRow>
        ))}
      </TableBody>
    );
  };