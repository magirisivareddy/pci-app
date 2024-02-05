"use client"
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableFooter, useTheme } from '@mui/material';
import { tokens } from '@/theme/theme';
// import "./table.css";

interface TableRowData {
    [key: string]: any;
}

interface CustomTableProps {
    data: TableRowData[];
    headers: {
        id: string;
        label: string;
        customRender?: (data: any, row: TableRowData) => React.ReactNode;
    }[];
}

const CustomTable: React.FC<CustomTableProps> = ({ data, headers }) => {
    const theme = useTheme();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const colors = tokens(theme?.palette.mode);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <TableContainer component={Paper}>
            <Table >
                <TableHead
                    sx={{ background:'#9ddbe0'}}
                >
                    <TableRow>
                        {headers.map((header) => (
                            <TableCell key={header.id}>
                                {header.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedData.map((row, index) => (
                        <TableRow  sx={{
                            '&:hover': {
                                backgroundColor: colors.primary.light, // change to your preferred hover color
                            },
                        }} key={index}>
                            {headers.map((header) => (
                                <TableCell key={header.id} sx={{color:""}}>
                                    {header.customRender ? header.customRender(row[header.id], row) : row[header.id]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter  sx={{ background: '#9ddbe0' }}>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            count={data.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            color='rgba(0, 0, 0, 0.6'
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default CustomTable;
