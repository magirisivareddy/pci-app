import { loadVenueDevices } from '@/actions/api'
import CustomTable from '@/components/common/table/Table';
import { useAppSelector } from '@/redux/hooks'
import React, { useEffect, useState } from 'react'
type Header = {
    id: string;
    label: string;
    customRender?: (_value: any, row: any) => JSX.Element;
    width?: string
};
const TotalDeviceModal = () => {
    const [isLoading, setLoading] = useState(true)
    const [devicesData, setDevicesData] = useState([])
    const { selectedVenueInspector } = useAppSelector(state => state.Venues.venueInfo)
    const getTotalDevice = async () => {
        try {
            const res = await loadVenueDevices(selectedVenueInspector.venue_id)

            setDevicesData(res)
            setLoading(false)

        } catch (error: any) {
            setLoading(false)

        }
    }
    useEffect(() => {
        if (selectedVenueInspector?.totalDevices !== 0) {
            getTotalDevice()
        } else {
            setLoading(false)
        }

    }, [])
    const devicesHeader: Header[] = [
        {
            id: 'commonAssetName', label: 'Common Asset Name /Model', width: "182px", customRender: (_, row) => {
                const commonAssetName = row.commonAssetName || "";
                const modelNumber = row.modelNumber || "";
                return (
                    <>
                        {commonAssetName && modelNumber ? `${commonAssetName} / ${modelNumber}` : commonAssetName || modelNumber}
                    </>

                );
            }
        },
        // { id: 'modelNumber', label: 'Model',width: "100px" },
        {
            id: 'assetNumber', label: 'Asset / Serial', width: "172px", customRender: (_, row) => {
                const assetNumber = row.assetNumber || "";
                const serialNumber = row.serialNumber || "";
                return (
                    <p>
                        {assetNumber && serialNumber ? `${assetNumber} / ${serialNumber}` : assetNumber || serialNumber}
                    </p>
                );
            }
        },
        {
            id: 'terminalId',
            label: 'Terminal ID / Profile Id', width: "180px",
            customRender: (_, row) => {
                const terminalId = row.terminalId || "";
                const profileId = row.profileId || "";
                return (
                    <p>
                        {terminalId && profileId ? `${terminalId} / ${profileId}` : terminalId || profileId}
                    </p>
                );
            }
        },
        {
            id: 'deviceLocation', label: 'Location', width: "300px",
        },

    ]
    return (
        <CustomTable data={devicesData} headers={devicesHeader} isloading={isLoading} isPagination={false} />
    )
}

export default TotalDeviceModal