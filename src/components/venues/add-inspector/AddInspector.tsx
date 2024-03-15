import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput';
import { Alert, Button, Grid, Paper, TableContainer, TableFooter, Typography } from '@mui/material';
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

const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

const AddInspector = ({ selectedRow, onClose }: any) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<FormData>({
        inspectorType: "Backup Inspector"
    });
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lookupData, setLookup] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { selectedVenueRow } = useAppSelector(state => state.Venues.venueInfo);

    const handleTableRowClick = async (row: any) => {
        const payload = {
            employeeNumber: row.employeeNumber.toString(),
            venueId: selectedVenueRow.venue_id.toString(),
            inspectorType: formData.inspectorType.toString()
        };

        try {
            setLoading(true);
            const data = await addVenueInspector(payload);
            setSuccessMessage(data.message);
            setLoading(false);
            setTimeout(() => {
                onClose()
                setSuccessMessage("");
                const obj = {
                    "employeeNumber": "0004236",
                    "is_it": "1",
                    "adminLevel": "1",
                    "inspectorType": "1",
                    "venueId": "All",
                    "inspectorEmployeeNumber": "All"
                };

                dispatch(getVenues(obj));
            }, 2000);
        } catch (e: any) {
            setErrorMessage(e.message);
            setTimeout(() => {
                setErrorMessage("");
            }, 2000);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataAndSetDate = async (firstname: any, lastname: any) => {
        try {
            setLoading(true);
            const data = await doLookup(firstname, lastname);
            setLookup(data);
        } finally {
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
        setLastName(value);
        // debouncedFetchDataAndSetDate(firstName, value);  // Use current state values
    };

    const onChangeFirstName = (value: any) => {
        setFirstName(value);
        // debouncedFetchDataAndSetDate(value, lastName);  // Use current state values
    };
    const onSearch = () => {
        fetchDataAndSetDate(firstName, lastName)
    }


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
                            { label: "Group Inspector", value: "Group Inspector" },
                            { label: "Main Inspector", value: "Main Inspector" },

                        ]}
                        name={'inspectorType'}
                        id={'inspectorType'} size={'small'} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button sx={{ marginTop: "20px" }} onClick={onSearch} variant='contained'>Search</Button>
                </Grid>
            </Grid>
            <Grid container mt={2}>
                <TableContainer component={Paper} sx={{ maxHeight: "55vh", overflow: 'auto', width: "100%", position: "relative" }}>
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
                </TableContainer>
            </Grid>

        </div>
    );
};

export default AddInspector;
