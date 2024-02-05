export async function fetchData() {
    const res = await fetch("https://65c0bb89dc74300bce8ca2c4.mockapi.io/api/inspections",{cache:"no-cache"})
    const data =await res.json()
    return data
    
}