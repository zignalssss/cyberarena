import clientPromise from '../../../../lib/mongo.js';
import { NextResponse } from 'next/server';

// Define a GET request handler to fetch data by `teamId`
export async function GET(req) {
  try {
    // Extract the search parameters from the request URL
    const { searchParams } = new URL(req.url);
    
    // Get the `teamId` from the query string
    const teamId = searchParams.get('teamId');
    
    // If no `teamId` is provided, return an error response
    if (!teamId) {
      return NextResponse.json({ error: 'teamId is required' }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("CYBERARENA_DATABASE");

    // Fetch the team by `teamId`
    const data = await db.collection("TEAM_DETIAL").findOne({ teamId: parseInt(teamId) });

    // If the team is not found, return a 404 response
    if (!data) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    // Return the team data in the response
    return NextResponse.json({ data }, { status: 200 });

  } catch (error) {
    console.error('Error fetching team data by teamId:', error);
    
    // Return a 500 response in case of errors
    return NextResponse.json({ error: 'Unable to fetch data' }, { status: 500 });
  }
}
