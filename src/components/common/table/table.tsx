import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableFooter, useTheme, CircularProgress, Box, Button, Skeleton } from '@mui/material';
import { tokens } from '@/theme/theme';
import { useAppDispatch } from '@/redux/hooks';
import { setBodyData, setHeaderData } from '@/redux/features/ExportSlice';
import { TableRowsLoader } from './TableRowsLoader';
import "./table.css"

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
    renderExportButton?: boolean; // Optional prop for rendering the export button
    isloading?: boolean;
    isPagination?: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({ data, headers, isloading, isPagination = true }) => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    const colors = tokens(theme?.palette.mode);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const paginatedData = rowsPerPage === -1 ? data : data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const header = headers.map(header => header.label);
    const body = data.map(row => {
        return headers.map(header => {
            return header.customRender ? header.customRender(row[header.id], row) : row[header.id];
        });
    });

    useEffect(() => {
        const bodyData = body.map(row => row.map(cell => {
            // Extract relevant information from React elements if necessary
            return typeof cell === 'object' && cell !== null && 'props' in cell ? cell.props.children : cell;
        }));
        dispatch(setBodyData(bodyData));
        dispatch(setHeaderData(header));
    }, []);
    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: "65vh", overflow: 'auto', width: "100%", position: "relative" }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell key={header.id} sx={{ background: '#9ddbe0', color: 'rgba(0, 0, 0, 0.7)', fontWeight: "600", position: 'sticky', top: 0, zIndex: 100 }}>
                                    {header.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isloading ? (
                            <TableRowsLoader headers={headers} rowsNum={10} />
                        ) : paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={headers.length} align="center" sx={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                                    No data available!
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((row, index) => (
                                <TableRow
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: colors.primary.light,
                                        },
                                    }}
                                    key={index}
                                >
                                    {headers.map((header) => (
                                        <TableCell key={header.id}
                                        >
                                            {header.customRender ? header.customRender(row[header.id], row) : row[header.id]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                    {isPagination && (
                        <TableFooter sx={{ background: '#9ddbe0', position: "sticky", bottom: 0, zIndex: 100, width: '100%' }}>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[15, 30, 60, 120, { value: -1, label: 'All' }]}
                                    count={data.length}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    color='rgba(0, 0, 0, 0.7)'
                                />
                            </TableRow>
                        </TableFooter>
                    )}
                </Table>


            </TableContainer>

        </>
    );
};

export default CustomTable;
