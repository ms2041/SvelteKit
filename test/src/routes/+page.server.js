import { createPool } from '@vercel/postgres';
import { sql } from "@vercel/postgres";

const scenes = [
  'How Candide was raised in a noble mansion, and how he was driven away',
  'What happened to Candide among the Bulgars',
  'How Candide saved himself from the Bulgars, and what became of him',
];

async function seed() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS scenes (
      id SERIAL PRIMARY KEY,
      description VARCHAR(255) NOT NULL
    );
  `;

  console.log(`Created "scenes" table`);

  const insertScenes = scenes.map((description) => {
    return sql`
      INSERT INTO scenes (description)
      VALUES (${description})
      ON CONFLICT DO NOTHING;
    `;
  });

  const insertResults = await Promise.all(insertScenes);
  const insertedScenes = insertResults.filter((result) => result.rowCount > 0);
  console.log(`Seeded ${insertedScenes.length} scenes`);

  return {
    createTable,
    scenes: insertedScenes,
  };
}

export async function load() {
  const db = createPool();

  try {
    const { rows: existingScenes } = await db.query('SELECT * FROM scenes');
    return {
      scenes: existingScenes,
      duration: duration
    };
  } catch (error) {
    if (error?.message === `relation "scenes" does not exist`) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now..."
      );
      // Table is not created yet
      await seed();
      const { rows: seededScenes } = await db.query('SELECT * FROM scenes');
      return {
        scenes: seededScenes,
      };
    } else {
      throw error;
    }
  }
}
