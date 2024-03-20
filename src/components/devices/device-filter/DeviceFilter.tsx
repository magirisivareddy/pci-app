import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
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
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const is_it = "1"
  const { devicesData, devicesInfo, formData } = useAppSelector(state => state.devices);
  const { venueDropdown } = useAppSelector(state => state.common)
  const assignedVenue = [
    { label: "All but RMA DEVICES", value: "all selected" }, { label: "ARCHIVED DEVICES", value: "-1" }, { label: "IT STORAGE", value: '-2' }, { label: "SPARE DEVICES", value: "50" }, { label: "RMA DEVICES", value: "0" }
  ]
  let updatedVenueDropdown = [...assignedVenue, ...venueDropdown];

  // if (is_it == "1") {
  //   updatedVenueDropdown = [...updatedVenueDropdown, ...assignedVenue,]
  // }

  const addDevice = () => {
    dispatch(clearDeviceFilterFormData())
    dispatch(
      setDeviceInfo({
        isDeviceModal: true,
        deviceModalType: 'Add'
      })
    );
  };
  const handleExport = () => {
    const header = [
      'Device Id',
      'Venue Id',
      'Venue Name',
      'Common AssetName',
      'Asset Number',
      'Manufacturer',
      'Vendor',
      'Model Number',
      'Serial Number',
      'Device Location',
      'Terminal Id',
      'Profile Id',
      'Ip Address',
      'Slot Number',
      'Was Deleted',
      'Pci Labeled',
      'Deleted Date',
      'Is Labeled',
      'Is LabeledExcel'
    ];

    const body = devicesData.map((device: any) => [
      device.deviceId,
      device.venueId,
      device.venueName,
      device.commonAssetName,
      device.assetNumber,
      device.manufacturer,
      device.vendor,
      device.modelNumber,
      device.serialNumber,
      device.deviceLocation,
      device.terminalId,
      device.profileId,
      device.ipAddress,
      device.slotNumber,
      device.wasDeleted,
      device.pciLabeled,
      device.deletedDate,
      device.isLabeled,
      device.isLabeledExcel
    ]);

    const data = [header, ...body];
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Make header row bold
    const headerStyle = { font: { bold: true } };
    for (let col = 0; col < header.length; col++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: col });
      if (!ws[cellRef].s) ws[cellRef].s = {};
      Object.assign(ws[cellRef].s, headerStyle); // Apply bold style
    }

    // Set fixed width for columns
    const colWidths = [ // Adjust column widths as needed
      { wpx: 100 }, // Device Id
      { wpx: 100 }, // Venue Id
      { wpx: 150 }, // Venue Name
      { wpx: 200 }, // Common AssetName
      { wpx: 120 }, // Asset Number
      { wpx: 150 }, // Manufacturer
      { wpx: 150 }, // Vendor
      { wpx: 150 }, // Model Number
      { wpx: 150 }, // Serial Number
      { wpx: 200 }, // Device Location
      { wpx: 120 }, // Terminal Id
      { wpx: 120 }, // Profile Id
      { wpx: 150 }, // Ip Address
      { wpx: 100 }, // Slot Number
      { wpx: 100 }, // Was Deleted
      { wpx: 100 }, // Pci Labeled
      { wpx: 150 }, // Deleted Date
      { wpx: 100 }, // Is Labeled
      { wpx: 150 }, // Is LabeledExcel
    ];
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Devices');

    const currentDate = new Date();
    const timestamp = currentDate.toISOString().replace(/[-:T.]/g, '').slice(0, 14); // Get timestamp in format YYYYMMDDHHmmss
    const fileName = `NQ_PCI_Devices_${timestamp}.xls`;

    XLSX.writeFile(wb, fileName);
  };

const onClear=()=>{
  dispatch(clearDeviceFilterFormData())
}

  return (
    <>
      <Box display="flex" mb={2} gap={1} justifyContent="flex-end" pr={2}>
        <Button onClick={addDevice} size="small" variant="outlined">
          Add Device
        </Button>
        <Button onClick={handleExport} size="small" variant="outlined">
          Export to Excel
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: isDesktop ? 'row' : 'column' }}>
        <Grid container spacing={2} mb={2} md={10} >
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

        <Grid container spacing={2} mb={2} md={2} sx={{
          gap: isDesktop ? "53px" : "",
          marginLeft: isDesktop ? "10px" : ""
        }} >
          <Grid item xs={12} md={1}>
            <Button onClick={onClear} sx={{ marginTop: '22px', width: isDesktop ? 'auto' : '100%', padding: "6px 16px " }} variant="outlined">
              Clear
            </Button>
          </Grid>
          <Grid item xs={12} md={1}>
            <Button onClick={handelSubmit} sx={{ marginTop: '22px', width: isDesktop ? 'auto' : '100%' }} variant="contained">
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DeviceFilter;
