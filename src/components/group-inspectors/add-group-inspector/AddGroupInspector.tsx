import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput';
import { Grid } from '@mui/material';
import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import EmailIcon from '@mui/icons-material/Email';

interface FormData {
    lastName: string;
    firstName: string;
    venue: any;
}
const AddGroupInspector = ({venues}:any) => {
    const [formData, setFormData] = useState<FormData>({
        lastName: "",
        firstName: '',
        venue: 101
    });
    const data = [
        { firstName: 'John', lastName: 'Doe', age: 118451,id:"15066", venue:"Assistant Controller", city: 'New York', email: 'john@example.com' },
        { firstName: 'Jane', lastName: 'Doe', age: 118451,id:"15066", venue:"East Cook",city: 'San Francisco', email: 'jane@example.com' },
        { firstName: 'Bob', lastName: 'Smith', age: 118451, id:"15066",venue:"Assistant Controller", city: 'Los Angeles', email: '' },
        // Add more data as needed
    ];
    const onChange = (value: any, name: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    return (
        <div>
            <Grid container spacing={2} mb={2}>
                <Grid item xs={12} md={4}>
                    <TextInput
                        defaultValue={formData.lastName ?? ""}
                        onChange={onChange}
                        label={'Last Name'}
                        name={'lastName'}
                        id={'lastName'}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextInput
                        defaultValue={formData.firstName ?? ""}
                        onChange={onChange}
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
                        options={venues}
                        name={'addVenue'}
                        id={'addVenue'} />
                </Grid>
            </Grid>
            <Grid container mt={2}>
                <Table sx={{ border: 'none' }}>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f2f2f2' } }}>
                                <TableCell>{row.firstName}</TableCell>
                                <TableCell>{row.lastName}</TableCell>
                                <TableCell>{row.age}</TableCell>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.venue}</TableCell>
                                <TableCell>{row.city}</TableCell>
                                <TableCell>
                                    <EmailIcon color={row.email ? 'success' : 'error'} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </Grid>
        </div>
    )
}


export default AddGroupInspector