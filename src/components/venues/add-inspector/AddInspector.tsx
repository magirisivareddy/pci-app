import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput';
import { Alert, Box, Button, Grid, Paper, TableContainer, TableFooter, Typography } from '@mui/material';
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import EmailIcon from '@mui/icons-material/Email';
import { addVenueInspector, doLookup } from '@/actions/api';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getVenues } from '@/redux/features/VenuesSlice';
import Loading from '@/app/loading';

interface FormData {
    inspectorType: string;
}
const AddInspector = ({ onClose }: any) => {
    const dispatch = useAppDispatch();
    const { employeeInfo } = useAppSelector(state => state.common)
    const [formData, setFormData] = useState<FormData>({
        inspectorType: "Backup Inspector"
    });
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lookupData, setLookup] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [showGrid, setShowGrid] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [textErrorMessage, setTextErrorMessage] = useState("");
    const [infoNote, setInfoNote] = useState(true)
    const { selectedVenueRow } = useAppSelector(state => state.Venues.venueInfo);
    const venueFormData = useAppSelector(state => state.Venues.venueInfo.formData);

    const handleTableRowClick = async (row: any) => {
        const payload = {
            employeeNumber: row.employeeNumber.toString(),
            venueId: selectedVenueRow.venue_id.toString(),
            inspectorType: formData.inspectorType.toString()
        };

        try {
            setLoading(true);
            const data = await addVenueInspector(payload);
            if (data?.validationMessage) {
                setLoading(false);
                setErrorMessage(data.validationMessage);
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000)
                return
            }
            setSuccessMessage(data.message);
            setLoading(false);
            setTimeout(() => {
                onClose()
                setSuccessMessage("");
                const obj = {
                    employeeNumber:  employeeInfo?.employeeNumber,
                    is_it:  employeeInfo?.role === "IT"?"1":"0",
                    adminLevel: "1",
                    inspectorType: "1",
                    venueId: venueFormData.venueId.toString() ?? "All",
                    inspectorEmployeeNumber: venueFormData.inspectorEmployeeNumber.toString() ?? "All"
                };

                dispatch(getVenues(obj));
            }, 3000);
        } catch (e: any) {
            setErrorMessage(e.message);
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataAndSetDate = async (firstname: any, lastname: any) => {
        setInfoNote(false)
        try {
            setLoading(true);
       
            const data = await doLookup(firstname, lastname);
            setLookup(data);
           
        } finally {
            setShowGrid(true)
            setLoading(false);
        }
    };

    const onChange = (value: any, name: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const onChangeLastName = (value: any) => {
        setTextErrorMessage("")
        setLastName(value);
    };
    const onChangeFirstName = (value: any) => {
        setTextErrorMessage("")
        setFirstName(value);
    };
    const onSearch = () => {
        if (!firstName.trim() && !lastName.trim()) {
            setTextErrorMessage("Please enter at least one field (First Name or Last Name).");
            return;
        }

        fetchDataAndSetDate(firstName, lastName);
    };
    return (
        <div>
            <Grid container spacing={2} mb={2}>
                {isLoading && <Loading />}
                <Grid item xs={12} md={3.3}>
                    <TextInput
                        defaultValue={lastName ?? ""}
                        onChange={onChangeLastName}

                        label={'Last Name'}
                        name={'lastName'}
                        id={'lastName'}
                    />
                </Grid>
                <Grid item xs={12} md={3.3}>
                    <TextInput
                        defaultValue={firstName ?? ""}
                        onChange={onChangeFirstName}

                        label={'First Name'}
                        name={'firstName'}
                        id={'firstName'}
                    />
                </Grid>

                <Grid item xs={12} md={3.3}>
                    <SelectInput
                        selectedOption={formData.inspectorType}
                        onChange={onChange}
                        label={'Inspector Type'}
                        options={[
                            { label: "Backup Inspector", value: "Backup Inspector" },
                            // { label: "Group Inspector", value: "Group Inspector" },
                            { label: "Main Inspector", value: "Main Inspector" },
                        ]}
                        name={'inspectorType'}
                        id={'inspectorType'} size={'small'} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button sx={{ marginTop: "20px" }} onClick={onSearch} variant='contained'>Search</Button>
                </Grid>
                {textErrorMessage && (
                    <Grid item xs={12} md={12}>
                        <Alert sx={{ marginTop: "10px" }} variant="filled" severity="error">
                            {textErrorMessage}
                        </Alert>
                    </Grid>
                )}
            </Grid>
            {infoNote && <Box sx={{
                backgroundColor: "#f2f2f2",
              
                textAign: "left",
                padding: "16px 10px",
                color: "rgba(0, 0, 0, 0.87)"
            }}>
                <Typography sx={{paddingBottom:"5px"}} variant='body1'>To search, type a letter in first name or last name. </Typography>
                <Typography sx={{paddingBottom:"5px"}}  variant='body1'>To search, click on search button. </Typography>
                <Typography sx={{paddingBottom:"5px"}}  variant='body1'>To select, click on a the resulted row</Typography>
            </Box>}
            <Grid container mt={2}>
                {showGrid && <TableContainer component={Paper} sx={{ maxHeight: "55vh", overflow: 'auto', width: "100%", position: "relative" }}>
                    <Table>
                        <TableBody>
                            {lookupData?.length === 0 ? (
                                <TableRow>
                                    <TableCell align="center" sx={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                                        No data available!
                                    </TableCell>
                                </TableRow>
                            ) : lookupData?.map((row: any, index) => (
                                <TableRow key={index} sx={{
                                    '&:nth-of-type(odd)': { backgroundColor: '#f2f2f2' },
                                }} onClick={() => handleTableRowClick(row)} style={{ cursor: "pointer" }}  >
                                    <TableCell>{row.firstName}</TableCell>
                                    <TableCell>{row.lastName}</TableCell>
                                    <TableCell>{row.badgeNumber}</TableCell>
                                    <TableCell>{row.employeeNumber}</TableCell>
                                    <TableCell>{row.jobTitle}</TableCell>
                                    <TableCell>{row.department}</TableCell>
                                    <TableCell>
                                        <EmailIcon color={row.email ? 'success' : 'error'} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter sx={{ background: '#fff', position: "sticky", bottom: -1, zIndex: 100, width: '100%' }}>
                            {lookupData?.length !== 0 && (
                                <>
                                    <TableRow>
                                        <TableCell colSpan={12} align="center">
                                            <Typography variant='subtitle2' sx={{ display: "flex", gap: "5px", alignItems: "center", justifyContent: "center" }}>
                                                <EmailIcon color={'error'} />
                                                Has no email address
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={12} align="center">
                                            {successMessage && (
                                                <Alert sx={{ marginTop: "10px" }} variant="filled" severity="success">
                                                    {successMessage}
                                                </Alert>
                                            )}
                                            {errorMessage && (
                                                <Alert sx={{ marginTop: "10px" }} variant="filled" severity="error">
                                                    {errorMessage}
                                                </Alert>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </>
                            )}
                        </TableFooter>
                    </Table>
                </TableContainer>}

            </Grid>
        </div>
    );
};

export default AddInspector;
