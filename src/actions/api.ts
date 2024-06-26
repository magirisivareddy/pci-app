
export const fetchQueryparamsData = async (endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE", payload: any) => {
    const url = `${process.env.PCI_API_URL}${endpoint}`
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': `${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
        },
        body: payload ? JSON.stringify(payload) : undefined,
    };

    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error(`Error fetching data from ${endpoint}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
}

export async function fetchInspections(payload: any) {
    return fetchQueryparamsData('Search/SearchInspections', 'POST', payload);
}
export async function fetchInitialInspections(payload: any) {
    return fetchQueryparamsData('Search/SearchInspections', 'POST', payload);
}


export async function fetchviewReport(payload: any) {
    return fetchQueryparamsData('Report/ViewReport', 'POST', payload);
}
export async function insertOrUpdateReport(payload: any) {
    return fetchQueryparamsData('report/InsertOrUpdateReport', 'POST', payload);
}



export async function searchDevices(payload: any) {
    return fetchQueryparamsData('search/SearchDevices', 'POST', payload);
}

export async function searchAdmins(payload: any) {   
    return fetchQueryparamsData('search/SearchAdmins', 'POST', payload);
}
export async function searchGroupInspectors(payload: any) {
    return fetchQueryparamsData('search/SearchGroupInspectors', 'POST', payload);
}
export async function searchVenues(payload: any) { 
    return fetchQueryparamsData('search/SearchVenues', 'POST', payload);
}
export async function addUpdateDevice(payload: any) {
    return fetchQueryparamsData('device/AddUpdateDevice', 'POST', payload);
}

export async function addUpdateVenue(payload: any) {
    return fetchQueryparamsData('venue/AddUpdateVenue', 'POST', payload);
}
export async function addVenueToGroupInspector(payload: any) {
    return fetchQueryparamsData('Inspector/AddVenueToGroupInspector', 'POST', payload);
}
export async function changeAdminLevel(payload: any) {
    return fetchQueryparamsData('Admin/ChangeAdminLevel', 'POST', payload);
}
export async function addGroupInspector(payload: any) {
    return fetchQueryparamsData('Inspector/AddGroupInspector', 'POST', payload);
}
export async function addVenueInspector(payload: any) {
    return fetchQueryparamsData('Inspector/AddVenueInspector', 'POST', payload);
}
export async function helpDeskTicket(payload: any) {
    return fetchQueryparamsData('Common/HelpDeskTicket', 'POST', payload);
}
export async function receiveNoticesGroupInspector(inspectorId: any) {
    return fetchQueryparamsData(`Inspector/ReceiveNoticesGroupInspector?inspectorId=${inspectorId}`, 'GET', null);
}
export async function getDeviceHistory(deviceId: any) {
    return fetchQueryparamsData(`device/GetDeviceHistory?deviceId=${deviceId}`, "GET", null);
}

export async function deleteGroupInspector(inspectorId: any) {
    return fetchQueryparamsData(`Inspector/DeleteGroupInspector?inspectorId=${inspectorId}`, "DELETE", null);
}
export async function deleteAdmin(adminId: any) {
    return fetchQueryparamsData(`Admin/DeleteAdmin?adminId=${adminId}`, "DELETE", null);
}
export async function doLookup(firstName: any, lastName: any) {
    return fetchQueryparamsData(`Common/DoLookup?firstName=${firstName}&lastName=${lastName}`, "GET", null);
}
export async function groupInspectorRemoveVenue(employeeNumber: any, venueId: any) {
    return fetchQueryparamsData(`Inspector/GroupInspectorRemoveVenue?employeeNumber=${employeeNumber}&venueId=${venueId}`, "DELETE", null);
}
export async function deleteVenue(employeeNumber: any, venueId: any) {
    return fetchQueryparamsData(`venue/DeleteVenue?venueId=${venueId}&employeeNumber=${employeeNumber}`, "DELETE", null);
}
export async function deleteVenueInspector(inspectorId: any) {
    return fetchQueryparamsData(`Inspector/DeleteVenueInspector?inspectorId=${inspectorId}`, "DELETE", null);
}
export async function deleteDevice(deviceId:any,employeeNumber: any) {
    return fetchQueryparamsData(`Device/DeleteDevice?deviceId=${deviceId}&employeeNumber=${employeeNumber}`, "DELETE", null);
}


export async function getVenueInspectorReport(employeeNumber: any) {
    return fetchQueryparamsData(`Report/GetVenueInspectorReport?employeeNumber=${employeeNumber}`, "GET", null);
}

export async function fetchEmployeeRole(email: any) {
    return fetchQueryparamsData(`Common/GetEmployeeRole?email=${email}`, "GET", null);
}

export async function getVenueStatusReport(employeeNumber: string, venueId?: string, deviceLocation?: string) {
    let url = `Report/GetVenueSummaryReport?employeeNumber=${employeeNumber}`;

    if (venueId ) {
        url += `&venueId=${venueId}`;
    }
    if(deviceLocation){
        url += `&location=${deviceLocation}`;
    }

    return fetchQueryparamsData(url, "GET", null);
}

export async function getVenueSummaryReport(employeeNumber: string, venueId?: string, inspectorId?: string) {
    let url = `Report/GetVenuePassFailSummaryReport?employeeNumber=${employeeNumber}`;
    if (venueId) {
        url += `&venueId=${venueId}`;
    }
    if ( inspectorId) {
        url += `&inspectorId=${inspectorId}`;
    }
    return fetchQueryparamsData(url, "GET", null);
}

export async function updatePciLabeled(deviceId: any, employeeNumber: any) {
    return fetchQueryparamsData(`Device/UpdatePciLabeled?deviceId=${deviceId}&employeeNumber=${employeeNumber}`, "PUT", null);
}
export async function loadVenueDevices(venueId: any) {
    return fetchQueryparamsData(`Device/LoadVenueDevices?venueId=${venueId}`, "GET", null);
}
export async function loadSlotNumbers(deviceId: any) {
    return fetchQueryparamsData(`Device/LoadSlotNumbers?deviceId=${deviceId}`, "GET", null);
}

export async function getVenuePassFailSummaryReport(employeeNumber: string, venueName?: string, inspector?: string) {
    let url = `Report/GetVenueDevicesFailSummaryReport?employeeNumber=${employeeNumber}`;

    if (venueName) {
        url += `&venueId=${venueName}`;
    }
    if ( inspector) {
        url += `&inspectorId=${inspector}`;
    }

    return fetchQueryparamsData(url, "GET", null);
}


//Common apis
export const fetchVenue = async () => {
    const res = await fetch(`${process.env.PCI_API_URL}common/GetVenues`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': `${process.env.NEXT_PUBLIC_API_SECRET_KEY}`
        },
    });

    if (res.ok) {
        const venues = await res.json();  // Wait for the JSON data to be resolved
        const data = venues.map((venue: { venueId: any; venueName: any; }) => {
            return {
                ...venue,
                label: venue.venueName,
                value: venue.venueId
            };
        });
        return data;  // Return the mapped data
    }

    return [];
}

export const fetchInspectors = async () => {
    const res = await fetch(`${process.env.PCI_API_URL}common/GetInspectors`, {
        method: 'GET', headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': `${process.env.NEXT_PUBLIC_API_SECRET_KEY}`
        },
    });
    if (res.ok) {
        const inspectors = await res.json();  // Wait for the JSON data to be resolved
        const data = inspectors.map((inspector: { inspectorId: any; inspectorName: any; }) => {
            return {
                ...inspector,
                label: inspector.inspectorName,
                value: inspector.inspectorId
            };
        });
        return data;  // Return the mapped data
    }

    return [];
}
