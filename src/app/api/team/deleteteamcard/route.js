import clientPromise from '../../../../lib/mongo.js';

export async function POST(req) {
    try {
        // Parse the JSON body of the request to get dynamic data
        const { teamId, delcard } = await req.json();
        const cardId = delcard?.Id;

        console.log(`TEAM: ${teamId}`);
        console.log(`Card to delete: ${cardId}`);

        // Ensure teamId and cardId are provided and are numbers
        // if (!teamId || !cardId) {
        //     return new Response(JSON.stringify({ message: 'teamId and cardId are required' }), {
        //         status: 400,  // Bad request
        //         headers: { 'Content-Type': 'application/json' }
        //     });
        // }

        // Connect to the MongoDB database
        const client = await clientPromise;
        const db = client.db('CYBERARENA_DATABASE');  // Use the correct database
        const collection = db.collection('TEAM_DETIAL');

        // Perform the update operation using $pull to remove the card from teamEventCards array
        const result = await collection.updateOne(
            { teamId: Number(teamId) },  // Ensure teamId is a number
            { $pull: { teamEventCards: { Id: Number(cardId) } } }  // Ensure cardId is a number
        );

        // Debugging: Check if the query matched any documents
        console.log('Matched Documents:', result.matchedCount);
        console.log('Modified Documents:', result.modifiedCount);

        if (result.modifiedCount === 0) {
            return new Response(JSON.stringify({ message: 'No card found to delete or team not found' }), {
                status: 404,  // Not found
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const updatedTeam = await collection.findOne({ teamId: Number(teamId) });

        // Return success response with updated teamEventCards
        return new Response(JSON.stringify({
            message: 'Card deleted successfully',
            teamEventCards: updatedTeam.teamEventCards  // Include updated event cards in response
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error deleting team data:', error.message);
        // Return failure response with the error message
        return new Response(JSON.stringify({ message: 'Failed to delete team data', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
