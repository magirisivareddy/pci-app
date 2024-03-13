import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import TextInput from '@/components/common/input/Input';
import SelectInput from '@/components/common/input/SelectInput';
import { CSVLink } from 'react-csv';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setDeviceInfo } from '@/redux/features/DevicesSlice';

interface DeviceFilterProps {
  venueDropdown: { label: string; value: string }[];
  formData: {
    commonAssetName?: string;
    venueId?: string;
    assetNumber?: string;
    serialNumber?: string;
    terminalId?: string;
    profileId?: string;
  };
  onChange: (value: string, name: string) => void;
  handelSubmit: () => void;
}

const DeviceFilter: React.FC<DeviceFilterProps> = ({ venueDropdown, formData, onChange, handelSubmit }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { devicesData } = useAppSelector(state => state.devices);

  const addDevice = () => {
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

    const body: (string | undefined)[][] = devicesData.map((device: any) => [
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

    const csvData = [header, ...body];
    const csvFileName = 'devices.csv';

    const csvContent = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', csvFileName);

    document.body.appendChild(link);
    link.click();
  };

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
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={1.8}>
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
        <Grid item xs={12} md={1.8}>
          <SelectInput
            selectedOption={formData.venueId}
            onChange={onChange}
            label={'Assigned Venue'}
            options={venueDropdown}
            name={'venueId'}
            id={'venueId'}
            size={'small'}
          />
        </Grid>
        <Grid item xs={12} md={1.8}>
          <TextInput
            defaultValue={formData.assetNumber ?? ''}
            onChange={onChange}
            label={'Asset'}
            name={'assetNumber'}
            id={'assetNumber'}
          />
        </Grid>
        <Grid item xs={12} md={1.8}>
          <TextInput
            defaultValue={formData.serialNumber ?? ''}
            onChange={onChange}
            label={'Serial'}
            name={'serialNumber'}
            id={'serialNumber'}
          />
        </Grid>
        <Grid item xs={12} md={1.8}>
          <TextInput
            defaultValue={formData.terminalId ?? ''}
            onChange={onChange}
            label={'Terminal id'}
            name={'terminalId'}
            id={'terminalId'}
          />
        </Grid>
        <Grid item xs={12} md={1.8}>
          <TextInput
            defaultValue={formData.profileId ?? ''}
            onChange={onChange}
            label={'Profile id'}
            name={'profileId'}
            id={'profileId'}
          />
        </Grid>
        <Grid item xs={12} md={1}>
          <Button onClick={handelSubmit} sx={{ marginTop: '22px', width: isDesktop ? 'auto' : '100%' }} variant="contained">
            Search
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default DeviceFilter;
