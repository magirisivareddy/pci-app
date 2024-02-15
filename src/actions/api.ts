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

//Inspections page apis
export async function fetchInspections(payload: any) {
    return fetchData('inspections', 'POST', payload);
}
export async function fetchviewReport(payload: any) {
    return fetchData('viewReport', 'POST', payload);
}


//Common apis
export const fetchVenue = async () => {
    const res = await fetch(`https://pciapplication.azurewebsites.net/api/common/GetVenues`, { method: 'GET' });
    if (res.ok) {
        const venues = await res.json();  // Wait for the JSON data to be resolved
        const data = venues.map((venue: { venueId: any; venueName: any; }) => {
            return {
                ...venue,
                label: venue.venueName,
                value: venue.venueId
            };
        });
        console.log("data", data);
        return data;  // Return the mapped data
    }

    return [];
}
export const fetchInspectors = async () => {
    const res = await fetch(`https://pciapplication.azurewebsites.net/api/common/GetInspectors`, { method: 'GET' });
    if (res.ok) {
        const inspectors = await res.json();  // Wait for the JSON data to be resolved
        const data = inspectors.map((inspector: { inspectorId: any; inspectorName: any; }) => {
            return {
                ...inspector,
                label: inspector.inspectorName,
                value: inspector.inspectorId
            };
        });
        console.log("data", data);
        return data;  // Return the mapped data
    }

    return [];
}
