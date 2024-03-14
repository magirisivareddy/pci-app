import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput';
import { Alert, Grid } from '@mui/material';
import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import EmailIcon from '@mui/icons-material/Email';
import { addGroupInspector, doLookup } from '@/actions/api';
import Loading from '@/app/loading';

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
const AddGroupInspector = ({ venues }: any) => {
    const [formData, setFormData] = useState<FormData>({
        venue: "All"
    });
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lookupData, setLookup] = useState([])
    const [isloading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [selectedTableRow, setSelectedTableRow] = useState(null)
    const handleTableRowClick = async (row: any) => {
        setSelectedTableRow(row);
        const payload = {
            employeeNumber: row.employeeNumber.toString(),
            venueId: formData.venue.toString()
        }

        try {
            setLoading(true);
            const data = await addGroupInspector(payload)
            setSuccessMessage(data.message)
            setLoading(false);
            setTimeout(() => {
                setSuccessMessage("")
            }, 3000)
        } catch (e: any) {
            setErrorMessage(e.message)
            setTimeout(() => {
                setErrorMessage("")
            }, 3000)
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

    const debouncedFetchDataAndSetDate = debounce(fetchDataAndSetDate, 3000);
    const onChangeLastName = (value: any) => {
        setLastName(value);
        debouncedFetchDataAndSetDate(firstName, value);  // Use current state values
    }

    const onChangeFirstName = (value: any) => {
        setFirstName(value);
        debouncedFetchDataAndSetDate(value, lastName);  // Use current state values
    }
    const updatedVenueDropdown = [{ label: "All", value: "All" }, ...venues];
    return (
        <div>
            <Grid container spacing={2} mb={2}>
            {isloading && <Loading/>}
                <Grid item xs={12} md={4}>
                    <TextInput
                        defaultValue={lastName ?? ""}
                        onChange={onChangeLastName}
                        label={'Last Name'}
                        name={'lastName'}
                        id={'lastName'}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextInput
                        defaultValue={firstName ?? ""}
                        onChange={onChangeFirstName}
                        label={'First Name'}
                        name={'firstName'}
                        id={'firstName'}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <SelectInput
                        selectedOption={formData.venue}
                        onChange={onChange}
                        label={'Add Venue'}
                        options={updatedVenueDropdown}
                        name={'addVenue'}
                        id={'addVenue'} size={'small'} />
                </Grid>
            </Grid>
            <Grid container mt={2}>
                <Table sx={{ border: 'none' }}>
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
                </Table>

                {successMessage && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="success">
                    {successMessage}
                </Alert>}

                {errorMessage && <Alert sx={{ marginTop: "10px" }} variant="filled" severity="error">
                    {errorMessage}
                </Alert>}

            </Grid>
        </div>
    )
}


export default AddGroupInspector