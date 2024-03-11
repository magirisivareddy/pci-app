async function fetchData(apiEndpoint: string, method = 'GET', payload = null) {
    console.log("process.env.NEXT_PUBLIC_API_SECRET_KEY", process.env.NEXT_PUBLIC_API_SECRET_KEY)
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Cache-Control': 'no-cache',
                'Ocp-Apim-Subscription-Key': `${process.env.NEXT_PUBLIC_API_SECRET_KEY}`
            },
            body: payload ? JSON.stringify(payload) : undefined,
        };

        const res = await fetch(`/api/${apiEndpoint}`, options);

        if (!res.ok) {
            throw new Error(`Error fetching data from ${apiEndpoint}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${apiEndpoint}:`, error);
        throw error; // Re-throw the error to let the calling code handle it
    }
}
// async function fetchData(apiEndpoint: string, method = 'GET', payload = null, queryParams = null) {
//     try {
//         // Build the URL with query parameters
//         const url = `/api/${apiEndpoint}${queryParams ? `?${new URLSearchParams(queryParams)}` : ''}`;

//         const options = {
//             method,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: method !== 'GET' ? JSON.stringify(payload) : undefined, // Only include body for non-GET requests
//         };

//         const res = await fetch(url, options);

//         if (!res.ok) {
//             throw new Error(`Error fetching data from ${apiEndpoint}`);
//         }

//         // For DELETE request, no need to parse response body
//         if (method === 'DELETE') {
//             return null;
//         }

//         const data = await res.json();
//         return data;
//     } catch (error) {
//         console.error(`Error fetching data from ${apiEndpoint}:`, error);
//         throw error; // Re-throw the error to let the calling code handle it
//     }
// }














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


//Inspections page apis
// export async function fetchInspections(payload: any) {
//     return fetchData('inspections', 'POST', payload);
// }



//Post Api




// Admin/ChangeAdminLevel



export async function fetchInspections(payload: any) {
    return fetchQueryparamsData('Search/SearchInspections', 'POST', payload);
}

export async function fetchviewReport(payload: any) {
    // return fetchData('viewReport', 'POST', payload);
    return fetchQueryparamsData('Report/ViewReport', 'POST', payload);
}
export async function insertOrUpdateReport(payload: any) {
    // return fetchData('InsertOrUpdateReport', 'POST', payload);
    return fetchQueryparamsData('report/InsertOrUpdateReport', 'POST', payload);
}

export async function searchDevices(payload: any) {    
    // return fetchData('SearchDevices', 'POST', payload);
    return fetchQueryparamsData('search/SearchDevices', 'POST', payload);
}

export async function searchAdmins(payload: any) {    // api integration done need payload
    // return fetchData('searchAdmins', 'POST', payload);
    return fetchQueryparamsData('search/SearchAdmins', 'POST', payload);
}
export async function searchGroupInspectors(payload: any) {  // api integration done need payload
    // return fetchData('searchGroupInspectors', 'POST', payload);
    return fetchQueryparamsData('search/SearchGroupInspectors', 'POST', payload);
}
export async function searchVenues(payload: any) {  // api integration done need payload
    // return fetchData('SearchVenues', 'POST', payload);
    return fetchQueryparamsData('search/SearchVenues', 'POST', payload);
}
export async function addUpdateDevice(payload: any) {  // api integration done need payload
    // return fetchData('AddUpdateDevice', 'POST', payload);
    return fetchQueryparamsData('device/AddUpdateDevice', 'POST', payload);
}

export async function addUpdateVenue(payload: any) {
    // return fetchData('AddUpdateVenue', 'POST', payload);
    return fetchQueryparamsData('venue/AddUpdateVenue', 'POST', payload);
}
export async function addVenueToGroupInspector(payload: any) {
    // return fetchData('AddVenueToGroupInspector', 'POST', payload);
    return fetchQueryparamsData('Inspector/AddVenueToGroupInspector', 'POST', payload);
}
export async function changeAdminLevel(payload: any) {
    // return fetchData('Admin/ChangeAdminLevel', 'POST', payload);
    return fetchQueryparamsData('Admin/ChangeAdminLevel', 'POST', payload);
}
export async function addGroupInspector(payload: any) {
    // return fetchData('Inspector/AddGroupInspector', 'POST', payload);
    return fetchQueryparamsData('Inspector/AddGroupInspector', 'POST', payload);
}
export async function addVenueInspector(payload: any) {
    return fetchQueryparamsData('Inspector/AddVenueInspector', 'POST', payload);
}
export async function helpDeskTicket(payload: any) {
    return fetchQueryparamsData('Common/HelpDeskTicket', 'POST', payload);
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
export async function getVenueInspectorReport(employeeNumber: any) {
    return fetchQueryparamsData(`Report/GetVenueInspectorReport?employeeNumber=${employeeNumber}`, "GET", null);
}
export async function getVenueSummaryReport(employeeNumber: string, venueId?: string, deviceLocation?: string, inspectorId?: string) {
    let url = `Report/GetVenueSummaryReport?employeeNumber=${employeeNumber}`;

    if (venueId || deviceLocation) {
        url += `&venueId=${venueId || ''}&deviceLocation=${deviceLocation || ''}&inspectorId=${inspectorId || ''}`;
    }

    return fetchQueryparamsData(url, "GET", null);
}

export async function getVenuePassFailSummaryReport(employeeNumber: string, venueName?: string, inspector?: string) {
    let url = `Report/GetVenuePassFailSummaryReport?employeeNumber=${employeeNumber}`;

    if (venueName || inspector) {
        url += `&venueName=${venueName || ''}&inspector=${inspector || ''}`;
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
