import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput';
import { Alert, Button, Grid, Paper, TableBody, TableContainer, TableFooter, Typography } from '@mui/material';
import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import EmailIcon from '@mui/icons-material/Email';
import { addGroupInspector, doLookup } from '@/actions/api';
import Loading from '@/app/loading';
import { getGroupInspectors } from '@/redux/features/GroupInspectorsSlice';
import { useAppDispatch } from '@/redux/hooks';

interface FormData {
    venue: any;
}
const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};
const AddGroupInspector = ({ venues, onClose }: any) => {
    const dispatch = useAppDispatch()
    const [formData, setFormData] = useState<FormData>({
        venue: "101"
    });
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lookupData, setLookup] = useState([])
    const [isloading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [selectedTableRow, setSelectedTableRow] = useState(null)
    const [textErrorMessage, setTextErrorMessage] = useState("");
    const handleTableRowClick = async (row: any) => {
        setSelectedTableRow(row);
        const payload = {
            employeeNumber: row.employeeNumber.toString(),
            venueId: formData.venue.toString()
        }
        try {
            setLoading(true);
            const data = await addGroupInspector(payload)
            if (data?.validationMessage) {
                setLoading(false);
                setErrorMessage(data.validationMessage);
                setTimeout(() => {
                    setErrorMessage("");
                }, 2000)
                return
            }
            setSuccessMessage(data.message)
            setLoading(false);
            setTimeout(() => {
                onClose()
                const obj = {
                    venueId: 'All',
                    inspectorEmployeeNumber: 'All',
                    is_It: '1'
                };
                dispatch(getGroupInspectors(obj));
                setSuccessMessage("")
            }, 2000)
        } catch (e: any) {
            setErrorMessage(e.message)
            setTimeout(() => {
                setErrorMessage("")
            }, 2000)
        } finally {
            setLoading(false);
        }
    }
    const fetchDataAndSetDate = async (firstname: any, lastname: any) => {
        try {
            setLoading(true);
            const data = await doLookup(firstname, lastname);
            setLookup(data)
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    const onChange = (value: any, name: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    const onChangeLastName = (value: any) => {
        setTextErrorMessage("")
        setLastName(value);

    }

    const onChangeFirstName = (value: any) => {
        setTextErrorMessage("")
        setFirstName(value);

    }
    // const onSearch = () => {
    //     fetchDataAndSetDate(firstName, lastName)
    // }
    const onSearch = () => {
        if (!firstName.trim() && !lastName.trim()) {
            setTextErrorMessage("Please enter at least one field (First Name or Last Name).");
            return;
        }

        fetchDataAndSetDate(firstName, lastName);
    };
    const updatedVenueDropdown = [{ label: "All", value: "All" }, ...venues];
    return (
        <div>
            <Grid container spacing={2} mb={2}>
                {isloading && <Loading />}
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
                        selectedOption={formData.venue}
                        onChange={onChange}
                        label={'Add Venue'}
                        options={updatedVenueDropdown}
                        name={'venue'}
                        id={'venue'}
                        size={'small'} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button sx={{ marginTop: "20px" }} onClick={onSearch} variant='contained'>Search</Button>
                </Grid>
            </Grid>
            {textErrorMessage && (
                <Grid item xs={12} md={12}>
                    <Alert sx={{ marginTop: "10px" }} variant="filled" severity="error">
                        {textErrorMessage}
                    </Alert>
                </Grid>
            )}
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

                                    {successMessage && (
                                        <TableRow>
                                            <TableCell colSpan={12} align="center">
                                                <Alert sx={{ marginTop: "10px" }} variant="filled" severity="success">
                                                    {successMessage}
                                                </Alert>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {errorMessage && (
                                        <TableRow>
                                            <TableCell colSpan={12} align="center">
                                                <Alert sx={{ marginTop: "10px" }} variant="filled" severity="error">
                                                    {errorMessage}
                                                </Alert>
                                            </TableCell>
                                        </TableRow>
                                    )}

                                </>
                            )}
                        </TableFooter>


                    </Table>
                </TableContainer>
            </Grid>

        </div>
    )
}


export default AddGroupInspector