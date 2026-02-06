
import type { PageLoad } from './$types';
import { GOOGLE_API_KEY } from '$env/static/private'; // Import the secret key

export const load: PageLoad = async ({ fetch }) => {
    
    const sheetId = '1wgoR5jcNsHzhB-djyffjUFjOmZrCjTc1PBxOGJxgnXo';
    const range = 'Form responses 1!A:H';
    
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${GOOGLE_API_KEY}`;


    const res = await fetch(url);
    const data = await res.json();

    console.log('API Status:', res.status);
console.log('Raw Data from Google:', data); // This will show in your TERMINAL

if (!data.values) {
    console.error('No values found! Check your Sheet ID and Range.');
    return { chartData: [] };
}



    const rows = data.values; // This is the array of arrays
    if (!rows || rows.length === 0) return { chartData: [] };

    const headers = rows[0]; // First row contains headers
    const body = rows.slice(1); // Everything else is data

    const chartData = body.map((row: any[]) => {
        // Create a temporary object to map headers to row indices
        const rowObj: any = {};
        headers.forEach((header: string, i: number) => {
            rowObj[header] = row[i];
        });

        // NOW apply your clean variable names
        return {
            timestamp: rowObj['Timestamp'],
            email: rowObj['Email address'],
            name: rowObj['Your name'],
            title: rowObj['Title of your resource'],
            description: rowObj['Description of your resource'],
            category: rowObj['Category'],
            link: rowObj['Links to further information or resources'],
            gdoc: rowObj['Column 1']
        };
    });

    return { chartData };
};