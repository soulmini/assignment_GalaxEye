const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const tiles = [];
    const startLat = 10.0;
    const startLng = 70.0;
    const tileSize = 1.0;
    const gridSize = 5; // Create a 5x5 grid of tiles

    let tileId = 51;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const bottomLeft = [startLng + j * tileSize, startLat + i * tileSize];
            const bottomRight = [startLng + (j + 1) * tileSize, startLat + i * tileSize];
            const topRight = [startLng + (j + 1) * tileSize, startLat + (i + 1) * tileSize];
            const topLeft = [startLng + j * tileSize, startLat + (i + 1) * tileSize];

            const newTile = {
                geom: JSON.stringify({
                    type: "Polygon",
                    coordinates: [[
                        bottomLeft,
                        bottomRight,
                        topRight,
                        topLeft,
                        bottomLeft
                    ]]
                }),
                metadata: {
                    id: tileId,
                    name: `Tile ${tileId}`,
                    description: `Tile covering area from [${bottomLeft}] to [${topRight}]`,
                    resolution: "high"
                }
            };

            tiles.push(newTile);
            tileId++;
        }
    }

    for (const tile of tiles) {
        await prisma.tile.create({
            data: tile
        });
    }

    console.log(`${tiles.length} tiles inserted successfully`);
}

main()
    .catch(e => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
