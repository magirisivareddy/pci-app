import React, { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Dialog, IconButton, DialogTitle, DialogContent } from '@mui/material';
import ReactToPrint from 'react-to-print';
import { useAppSelector } from '@/redux/hooks';
import { loadVenueDevices } from '@/actions/api';
import { TableRowsLoader } from '@/components/common/table/TableRowsLoader';

type Header = {
    id: string;
    label: string;
    customRender?: (_value: any, row: any) => JSX.Element;
    width?: string;
};

const TotalDeviceModal = ({ open, handleClose }: any) => {
    const [isLoading, setLoading] = useState(true);
    const [devicesData, setDevicesData] = useState([]);
    const { selectedVenueInspector } = useAppSelector(state => state.Venues.venueInfo);

    const componentRef = useRef(null);

    const getTotalDevice = async () => {
        try {
            const res = await loadVenueDevices(selectedVenueInspector.venue_id);
            setDevicesData(res);
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTotalDevice();
    }, []);

    const devicesHeader: Header[] = [
        {
            id: 'commonAssetName',
            label: 'Common Asset Name /Model',
            width: '200px',
            customRender: (_, row) => {
                const commonAssetName = row.commonAssetName || '';
                const modelNumber = row.modelNumber || '';
                return (
                    <>
                        {commonAssetName && modelNumber ? `${commonAssetName} / ${modelNumber}` : commonAssetName || modelNumber}
                    </>
                );
            },
        },
        {
            id: 'assetNumber',
            label: 'Asset / Serial',
            width: '200px',
            customRender: (_, row) => {
                const assetNumber = row.assetNumber || '';
                const serialNumber = row.serialNumber || '';
                return <p>{assetNumber && serialNumber ? `${assetNumber} / ${serialNumber}` : assetNumber || serialNumber}</p>;
            },
        },
        {
            id: 'terminalId',
            label: 'Terminal ID / Profile Id',
            width: '200px',
            customRender: (_, row) => {
                const terminalId = row.terminalId || '';
                const profileId = row.profileId || '';
                return <p>{terminalId && profileId ? `${terminalId} / ${profileId}` : terminalId || profileId}</p>;
            },
        },
        {
            id: 'deviceLocation',
            label: 'Location',
            width: '200px',
        },
    ];

    return (
        <>
            <Dialog
                open={true}
                onClose={handleClose}
                fullWidth={false}
                maxWidth={'md'}
                PaperProps={{
                    sx: {
                        overflowX: 'hidden',
                    },
                }}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    sx={{ position: 'absolute', top: 8, right: 20 }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogTitle color={"primary"} id="scroll-dialog-title">
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <span><b>{`Venue: ${selectedVenueInspector?.venue_name}`}</b></span>
                        <span style={{ marginRight: "30px" }} > <ReactToPrint trigger={() => <PrintOutlinedIcon sx={{cursor:"pointer"}} color='primary' />} content={() => componentRef.current} /></span>
                    </Box>
                </DialogTitle>

                <DialogContent dividers={true} sx={{ overflowX: 'hidden' }}>
                    <div ref={componentRef}>

                        <TableContainer component={Paper}  >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {devicesHeader.map(header => (
                                            <TableCell key={header.id}
                                            
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
                                    {
                                        isLoading ? <TableRowsLoader headers={devicesHeader} rowsNum={5} /> :
                                            devicesData.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={devicesHeader.length} align="center">
                                                        No data available
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                devicesData.map((row, index) => (
                                                    <TableRow key={index}>
                                                        {devicesHeader.map(header => (
                                                            <TableCell key={header.id}>
                                                                {header.customRender ? header.customRender(row[header.id], row) : row[header.id]}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))
                                            )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                </DialogContent>

            </Dialog>
        </>
    );
};

export default TotalDeviceModal;
