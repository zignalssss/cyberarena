import clientPromise from '../../../../lib/mongo.js';

export async function POST(req) {
  try {
    // Destructure the required fields from the request body
    const { teamId, teamEventCards, teamProtectCard } = await req.json();
    
    console.log("Team ID:", teamId);
    console.log("Team Event Cards:", teamEventCards);
    console.log("Team Protect Card:", teamProtectCard);

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("CYBERARENA_DATABASE");
    const collection = db.collection('TEAM_DETIAL');

    // Update or insert the team details
    await collection.updateOne(
      { teamId }, // Filter by teamId
      {
        $set: {
          teamEventCards,      // Set the teamEventCards field
          teamProtectCard,     // Set the teamProtectCard field
        }
      },
      { upsert: true } // If no document matches, create a new one
    );

    // Return a success response
    return new Response(JSON.stringify({ message: 'Team details added/updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error adding/updating team details:', error);
    return new Response(JSON.stringify({ message: 'Failed to add/update team details' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
