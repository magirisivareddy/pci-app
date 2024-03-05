async function fetchData(apiEndpoint: string, method = 'GET', payload = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
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
export async function fetchInspections(payload: any) {
    return fetchData('inspections', 'POST', payload);
}
export async function fetchviewReport(payload: any) {
    return fetchData('viewReport', 'POST', payload);
}
export async function insertOrUpdateReport(payload: any) {
    return fetchData('InsertOrUpdateReport', 'POST', payload);
}



//Post Api

export async function searchDevices(payload: any) {    // api integration done need payload
    return fetchData('SearchDevices', 'POST', payload);
}

export async function searchAdmins(payload: any) {    // api integration done need payload
    return fetchData('searchAdmins', 'POST', payload);
}
export async function searchGroupInspectors(payload: any) {  // api integration done need payload
    return fetchData('searchGroupInspectors', 'POST', payload);
}
export async function searchVenues(payload: any) {  // api integration done need payload
    return fetchData('SearchVenues', 'POST', payload);
}
export async function addUpdateDevice(payload: any) {  // api integration done need payload
    return fetchData('AddUpdateDevice', 'POST', payload);
}

export async function addUpdateVenue(payload: any) {
    return fetchData('AddUpdateVenue', 'POST', payload);
}
export async function addVenueToGroupInspector(payload: any) {
    return fetchData('AddVenueToGroupInspector', 'POST', payload);
}
export async function changeAdminLevel(payload: any) {
    return fetchData('ChangeAdminLevel', 'POST', payload);
}
export async function addGroupInspector(payload: any) {
    return fetchData('AddGroupInspector', 'POST', payload);
}
export async function addVenueInspector(payload: any) {
    return fetchData('AddVenueInspector', 'POST', payload);
}
// Admin/ChangeAdminLevel





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








//above one done


export async function recordHistory(payload: any) {
    return fetchData('Common/RecordHistory', 'POST', payload);
}
export async function generateMenuAccess(payload: any) {
    return fetchData('Common/GenerateMenuAccess', 'POST', payload);
}
// export async function addUpdateDevice(payload: any) {
//     return fetchData('Common/AddUpdateDevice', 'POST', payload);
// }

export async function receiveNoticesGroupInspector(payload: any) {
    return fetchData('Common/ReceiveNoticesGroupInspector', 'POST', payload);
}







//Devices Api

//Get APIS
export async function updatePciLabeled(employeeNumber: any, deviceId: any) {
    return fetchData(`Device/UpdatePciLabeled?deviceId=${deviceId}&employeeNumber=${employeeNumber}`, 'GET');
}
export async function loadVenueDevices(venueId: any) {
    return fetchData(`Common/LoadVenueDevices?venueId=${venueId}`, 'GET');
}
// export async function getDeviceHistory(deviceId: any) {
//     return fetchData(`Common/GetDeviceHistory?deviceId=${deviceId}`, 'GET');
// }
export async function loadSlotNumbers(deviceId: any) {
    return fetchData(`Common/LoadSlotNumbers?deviceId=${deviceId}`, 'GET');
}

export async function getVenueInfo(employeeNumber: any) {
    return fetchData(`Common/GetVenueInfo?employeeNumber=${employeeNumber}`, 'GET');
}
export async function loadGroupVenues(employeeNumber: any) {
    return fetchData(`Common/LoadGroupVenues?inspectorId=${employeeNumber}`, 'GET');
}
export async function getVenueInspectors(venueId: any, employeeNumber: any) {
    return fetchData(`Common/GetVenueInspectors?venueId=${venueId}$employeeNumber=${employeeNumber}`, 'GET');
}

//DELETE APIS
export async function deleteDevice(firstName: any, lastName: any) {
    return fetchData(`Device/DeleteDevice?firstName=${firstName}&lastName=${lastName}`, 'DELETE');
}



// export async function deleteGroupInspector(inspectorId: any) {
//     return fetchData(`Device/DeleteGroupInspector?inspectorId=${inspectorId}`, 'DELETE');
// }






// Admin API

export async function addAdmin(queryParams: any) {
    return fetchData('Admin/AddAdmin?employeeNumber=', 'POST');
}
//api/Admin/ChangeAdminLevel


//Common apis
export const fetchVenue = async () => {
    const res = await fetch(`${process.env.PCI_API_URL}/common/GetVenues`, { method: 'GET' });
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
    const res = await fetch(`${process.env.PCI_API_URL}/common/GetInspectors`, { method: 'GET' });
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
