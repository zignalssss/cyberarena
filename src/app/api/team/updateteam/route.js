import clientPromise from '../../../../lib/mongo.js';

export async function POST(req) {
  try {
    // Parse the JSON body of the request to get dynamic data
    const data = await req.json();
    
    console.log('Received data:', data);

    // Ensure 'teamId' exists in the request body for updating purposes
    const { teamId, ...rest } = data;
    if (teamId === undefined) {
      return new Response(JSON.stringify({ message: 'teamId is required' }), {
        status: 400,  // Bad request
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Wait for the MongoDB client connection
    const client = await clientPromise;
    const db = client.db('CYBERARENA_DATABASE');  // Use the correct database

    // Define the collection where you want to update the data
    const collection = db.collection('TEAM_DETIAL');

    // Update or insert the document based on teamId and dynamic data
    const result = await collection.updateOne(
      { teamId },  // Filter by teamId
      { $set: rest },  // Use the rest of the dynamic fields in the body for updating
      { upsert: true }  // If no matching document, insert a new one
    );

    console.log('MongoDB Update Result:', result);

    // Return success response
    return new Response(JSON.stringify({ message: 'Team data added/updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error adding/updating team data:', error.message);
    
    // Return failure response with the error message
    return new Response(JSON.stringify({ message: 'Failed to add/update team data', error: error.message }), {

      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
