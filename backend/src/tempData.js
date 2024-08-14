const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const tiles = [
        {
            geom: JSON.stringify({
                type: "Polygon",
                coordinates: [[
                    [77.4, 12.8], // bottom-left
                    [77.5, 12.8], // bottom-right
                    [77.5, 12.9], // top-right
                    [77.4, 12.9], // top-left
                    [77.4, 12.8]  // closing the polygon
                ]]
            }),
            metadata: {
                id: 1,
                name: "Tile 1",
                description: "Tile covering area from [77.4, 12.8] to [77.5, 12.9]",
                resolution: "high"
            }
        },
        {
            geom: JSON.stringify({
                type: "Polygon",
                coordinates: [[
                    [77.5, 12.8], // bottom-left
                    [77.6, 12.8], // bottom-right
                    [77.6, 12.9], // top-right
                    [77.5, 12.9], // top-left
                    [77.5, 12.8]  // closing the polygon
                ]]
            }),
            metadata: {
                id: 2,
                name: "Tile 2",
                description: "Tile covering area from [77.5, 12.8] to [77.6, 12.9]",
                resolution: "high"
            }
        },
        {
            geom: JSON.stringify({
                type: "Polygon",
                coordinates: [[
                    [77.4, 12.9], // bottom-left
                    [77.5, 12.9], // bottom-right
                    [77.5, 13.0], // top-right
                    [77.4, 13.0], // top-left
                    [77.4, 12.9]  // closing the polygon
                ]]
            }),
            metadata: {
                id: 3,
                name: "Tile 3",
                description: "Tile covering area from [77.4, 12.9] to [77.5, 13.0]",
                resolution: "high"
            }
        },
        {
            geom: JSON.stringify({
                type: "Polygon",
                coordinates: [[
                    [77.5, 12.9], // bottom-left
                    [77.6, 12.9], // bottom-right
                    [77.6, 13.0], // top-right
                    [77.5, 13.0], // top-left
                    [77.5, 12.9]  // closing the polygon
                ]]
            }),
            metadata: {
                id: 4,
                name: "Tile 4",
                description: "Tile covering area from [77.5, 12.9] to [77.6, 13.0]",
                resolution: "high"
            }
        },
        {
            geom: JSON.stringify({
                type: "Polygon",
                coordinates: [[
                    [77.6, 12.8], // bottom-left
                    [77.7, 12.8], // bottom-right
                    [77.7, 12.9], // top-right
                    [77.6, 12.9], // top-left
                    [77.6, 12.8]  // closing the polygon
                ]]
            }),
            metadata: {
                id: 5,
                name: "Tile 5",
                description: "Tile covering area from [77.6, 12.8] to [77.7, 12.9]",
                resolution: "high"
            }
        },
    ];

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
