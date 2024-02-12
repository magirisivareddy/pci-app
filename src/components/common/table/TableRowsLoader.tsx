import { Skeleton, TableCell, TableRow } from "@mui/material";

const TableRowsLoader = ({ headers, rowsNum }: any) => {
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

export default TableRowsLoader