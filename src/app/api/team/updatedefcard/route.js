// import clientPromise from '../../../../lib/mongo.js';
// export async function POST(req) {
//   try {
//     const { team, technology } = await req.json(); // ดึงข้อมูลจาก body ของ request
//     console.log(team);
//     console.log(technology)
//     const client = await clientPromise;
//     const db = client.db("CTFBOARD_DATABASE");
//     // const db = client.db('CTFBOARD_DATABASE');
//     // const collection = db.collection('TEAM');

    
//     // เพิ่มข้อมูลลง MongoDB
//     // await  db.collection("TEAM").updateOne(
//     //   { team },
//     //   { $push: { technologies: technology } },
//     //   { upsert: true } // ถ้าไม่มี team จะสร้างใหม่
//     // );

//     return new Response(JSON.stringify({ message: 'Technology added successfully' }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   } catch (error) {
//     console.error('Error adding technology:', error);
//     return new Response(JSON.stringify({ message: 'Failed to add technology' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }
