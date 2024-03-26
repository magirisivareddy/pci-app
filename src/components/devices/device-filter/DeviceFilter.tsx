import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material';
import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearDeviceFilterFormData, setDeviceInfo } from '@/redux/features/DevicesSlice';

interface DeviceFilterProps {
  onChange: (value: string, name: string) => void;
  handelSubmit: () => void;
}

const DeviceFilter: React.FC<DeviceFilterProps> = ({ onChange, handelSubmit }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const is_it = "1"
  const { formData } = useAppSelector(state => state.devices);
  const { venueDropdown } = useAppSelector(state => state.common)
  const assignedVenue = [
    { label: "All but RMA DEVICES", value: "all selected" }, { label: "ARCHIVED DEVICES", value: "-1" }, { label: "IT STORAGE", value: '-2' }, { label: "SPARE DEVICES", value: "50" }, { label: "RMA DEVICES", value: "0" }
  ]
  let updatedVenueDropdown = [...assignedVenue, ...venueDropdown];

  // if (is_it == "1") {
  //   updatedVenueDropdown = [...updatedVenueDropdown, ...assignedVenue,]
  // }




  const onClear = () => {
    dispatch(clearDeviceFilterFormData())
  }

  return (
    <>

      <Box sx={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}>
        <Grid container spacing={2}  >
          <Grid item xs={12} md={10}
            sx={{
              display: 'flex',
              flexDirection: "flex",
              gap: "5px",
              '@media (max-width: 600px)': {
                flexDirection: 'column' // Apply column direction for screens with max width 600px
              }
            }}
          >
            <Grid item xs={12} md={2}>
              <SelectInput
                selectedOption={formData.commonAssetName}
                onChange={onChange}
                label={'Common Asset Name'}
                options={[
                  { label: 'Apple Pay Change Point', value: 'Apple Pay Change Point' },
                  { label: 'ATM', value: 'ATM' },
                  { label: 'Credit card terminal', value: 'Credit card terminal' },
                  { label: 'Desktop, Laptop, Tablet', value: 'Desktop, Laptop, Tablet' },
                  { label: 'Fastbar CC Reader', value: 'Fastbar CC Reader' },
                  { label: 'Fastbar POS', value: 'Fastbar POS' },
                  { label: 'POS Card Reader', value: 'POS Card Reader' },
                  { label: 'POS System', value: 'POS System' },
                  { label: 'Receipt Printer', value: 'Receipt Printer' },
                  { label: 'USB credit card swiper', value: 'USB credit card swiper' }
                ]}
                name={'commonAssetName'}
                id={'commonAssetName'}
                size={'small'}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <SelectInput
                selectedOption={formData.venueId}
                onChange={onChange}
                label={'Assigned Venue'}
                options={updatedVenueDropdown}
                name={'venueId'}
                id={'venueId'}
                size={'small'}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextInput
                defaultValue={formData.assetNumber ?? ''}
                onChange={onChange}
                label={'Asset'}
                name={'assetNumber'}
                id={'assetNumber'}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextInput
                defaultValue={formData.serialNumber ?? ''}
                onChange={onChange}
                label={'Serial'}
                name={'serialNumber'}
                id={'serialNumber'}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextInput
                defaultValue={formData.terminalId ?? ''}
                onChange={onChange}
                label={'Terminal id'}
                name={'terminalId'}
                id={'terminalId'}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextInput
                defaultValue={formData.profileId ?? ''}
                onChange={onChange}
                label={'Profile id'}
                name={'profileId'}
                id={'profileId'}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={2}
            sx={{
              display: "flex",
              gap: "57px",
              '@media (max-width: 600px)': {
                gap: '10px' // Apply column direction for screens with max width 600px
              }

            }}
          >
            <Grid item xs={12} md={1}>
              <Button onClick={onClear} sx={{
                marginTop: '22px',
                width: 'auto', padding: "6px 16px ",
                '@media (max-width: 600px)': {
                  width: '100%' // Apply column direction for screens with max width 600px
                }

              }} variant="outlined">
                Clear
              </Button>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button onClick={handelSubmit} sx={{
                marginTop: '22px',
                width: 'auto',
                '@media (max-width: 600px)': {
                  width: '100%' // Apply column direction for screens with max width 600px
                }

              }} variant="contained">
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid container spacing={2} mb={2} md={2} sx={{
          gap: isDesktop ? "53px" : "",
          marginLeft: isDesktop ? "10px" : ""
        }} >
          
        </Grid> */}
      </Box>
    </>
  );
};

export default DeviceFilter;
