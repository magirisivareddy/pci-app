import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableFooter,
  useTheme,
  CircularProgress,
  Box,
  Button,
  Skeleton,
} from "@mui/material";
import { tokens } from "@/theme/theme";
import { useAppDispatch } from "@/redux/hooks";
import { TableRowsLoader } from "./TableRowsLoader";
import "./table.css";

interface TableRowData {
  [key: string]: any;
}

interface CustomTableProps {
  data: TableRowData[];
  headers: {
    id: string;
    label: string;
    customRender?: (data: any, row: TableRowData) => React.ReactNode;
    width?: string;
  }[];
  renderExportButton?: boolean; // Optional prop for rendering the export button
  isloading?: boolean;
  isPagination?: boolean;
  isFixed?: any
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  headers,
  isloading,
  isPagination = true,
  isFixed
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const colors = tokens(theme?.palette.mode);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  // useEffect(() => {
  //   setRowsPerPage(15);
  //   setPage(0);
  // }, [data]);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("event.target.value", event.target.value)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const paginatedData =
    rowsPerPage === -1
      ? data
      : data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: isFixed?"":"65vh",
          overflow: "auto",
          width: "100%",
          position: "relative",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  key={header.id}
                  align="center"
                  sx={{
                    // minWidth: 100,
                    width: header.width ?? "auto",
                    background: "#9ddbe0",
                    color: "rgba(0, 0, 0, 0.7)",
                    fontWeight: "600",
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                  }}
                >
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
                <TableCell
                  colSpan={headers.length}
                  align="center"
                  sx={{ color: "rgba(0, 0, 0, 0.7)" }}
                >
                  No data available!
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => (
                <TableRow
                  sx={{
                    "&:hover": {
                      backgroundColor: colors.primary.light,
                    },
                  }}
                  key={index}
                >
                  {headers.map((header) => (
                    <TableCell
                      align="center"
                      key={header.id}
                      sx={{
                        maxWidth: header.width ?? "15px",
                        wordBreak: "break-all",
                        '@media (max-width: 768px)': {
                          maxWidth: '100%', // Adjusted for desktop view
                        }
                      }}
                    >
                      {header.customRender
                        ? header.customRender(row[header.id], row)
                        : row[header.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
          {isPagination && (
            <TableFooter
              sx={{
                background: "#9ddbe0",
                position: isFixed?"":"sticky",
                bottom: 0,
                zIndex: 100,
                width: "100%",
              }}
            >
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    15,
                    30,
                    60,
                    120,
                    { value: -1, label: "All" },
                  ]}
                  count={data.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  color="rgba(0, 0, 0, 0.7)"
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