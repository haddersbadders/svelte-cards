
    
    import Papa from 'papaparse';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const cacheBuster = `?t=${Date.now()}`;
    // 1. Your Google Sheet CSV URL (the one from "Publish to Web")
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR032ubZhNyO0rChS20l_SiUFZ5kv8P-0yVTw1pnqtYdUemtjFjQIBvNWsL0ZhQ7ioPdCOjWUqW-yXc/pub?output=csv' + cacheBuster;
    
    const res = await fetch(sheetUrl, {
        // This tells the browser/server: "Don't look at your old saved version"
        headers: {
            'Cache-Control': 'no-cache'
        }
    });
    const csvString = await res.text();

    // 2. Parse the CSV
    const parsed = Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true
    });

    // 3. Map long Google Form headers to clean variable names
    const chartData = parsed.data.map((row: any) => ({
        timestamp: row['Timestamp'],
        email: row['Email address'],
        name: row['Your name'],
        title: row['Title of your resource'],         // Matches your header
        description: row['Description of your resource'], // Matches your header
        category: row['Category'],                    // Matches your header
        link: row['Links to further information or resources'], // Matches your header
        gdoc: row['Column 1']
    }));

    return { 
        // We pass the cleaned array to our +page.svelte
        chartData 
    };
};