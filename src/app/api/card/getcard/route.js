import clientPromise from '../../../../lib/mongo.js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("CYBERARENA_DATABASE");
    const data = await db.collection("CARD_EVENT").find({}).toArray();
    
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to fetch data' }, { status: 500 });
  }
}

// You can add other HTTP methods (POST, PUT, DELETE) as separate exported functions

