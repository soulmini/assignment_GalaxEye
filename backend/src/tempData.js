const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const tiles = [
        // Bengaluru Nearby Areas
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
                name: "Tile 1 - Bengaluru",
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
                name: "Tile 2 - Bengaluru",
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
                name: "Tile 3 - Bengaluru",
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
                name: "Tile 4 - Bengaluru",
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
                name: "Tile 5 - Bengaluru",
                description: "Tile covering area from [77.6, 12.8] to [77.7, 12.9]",
                resolution: "high"
            }
        },
        {
            geom: JSON.stringify({
                type: "Polygon",
                coordinates: [[
                    [77.7, 12.9], // bottom-left
                    [77.8, 12.9], // bottom-right
                    [77.8, 13.0], // top-right
                    [77.7, 13.0], // top-left
                    [77.7, 12.9]  // closing the polygon
                ]]
            }),
            metadata: {
                id: 6,
                name: "Tile 6 - Bengaluru",
                description: "Tile covering area from [77.7, 12.9] to [77.8, 13.0]",
                resolution: "high"
            }
        },
        // Lucknow Nearby Areas
        {
            geom: JSON.stringify({
                type: "Polygon",
                coordinates: [[
                    [80.9, 26.8], // bottom-left
                    [81.0, 26.8], // bottom-right
                    [81.0, 26.9], // top-right
                    [80.9, 26.9], // top-left
                    [80.9, 26.8]  // closing the polygon
                ]]
            }),
            metadata: {
                id: 7,
                name: "Tile 1 - Lucknow",
                description: "Tile covering area from [80.9, 26.8] to [81.0, 26.9]",
                resolution: "high"
            }
        },
        {
            geom: JSON.stringify({
                type: "Polygon",
                coordinates: [[
                    [81.0, 26.8], // bottom-left
                    [81.1, 26.8], // bottom-right
                    [81.1, 26.9], // top-right
                    [81.0, 26.9], // top-left
                    [81.0, 26.8]  // closing the polygon
                ]]
            }),
            metadata: {
                id: 8,
                name: "Tile 2 - Lucknow",
                description: "Tile covering area from [81.0, 26.8] to [81.1, 26.9]",
                resolution: "high"
            }
        },
        {
            geom: JSON.stringify({
                type: "Polygon",
                coordinates: [[
                    [80.9, 26.9], // bottom-left
                    [81.0, 26.9], // bottom-right
                    [81.0, 27.0], // top-right
                    [80.9, 27.0], // top-left
                    [80.9, 26.9]  // closing the polygon
                ]]
            }),
            metadata: {
                id: 9,
                name: "Tile 3 - Lucknow",
                description: "Tile covering area from [80.9, 26.9] to [81.0, 27.0]",
                resolution: "high"
            }
        },
        {
            geom: JSON.stringify({
                type: "Polygon",
                coordinates: [[
                    [81.0, 26.9], // bottom-left
                    [81.1, 26.9], // bottom-right
                    [81.1, 27.0], // top-right
                    [81.0, 27.0], // top-left
                    [81.0, 26.9]  // closing the polygon
                ]]
            }),
            metadata: {
                id: 10,
                name: "Tile 4 - Lucknow",
                description: "Tile covering area from [81.0, 26.9] to [81.1, 27.0]",
                resolution: "high"
            }
        },
        {
            geom: JSON.stringify({
                type: "Polygon",
                coordinates: [[
                    [81.1, 26.8], // bottom-left
                    [81.2, 26.8], // bottom-right
                    [81.2, 26.9], // top-right
                    [81.1, 26.9], // top-left
                    [81.1, 26.8]  // closing the polygon
                ]]
            }),
            metadata: {
                id: 11,
                name: "Tile 5 - Lucknow",
                description: "Tile covering area from [81.1, 26.8] to [81.2, 26.9]",
                resolution: "high"
            }
        },
        {
            geom: JSON.stringify({
                type: "Polygon",
                coordinates: [[
                    [81.2, 26.9], // bottom-left
                    [81.3, 26.9], // bottom-right
                    [81.3, 27.0], // top-right
                    [81.2, 27.0], // top-left
                    [81.2, 26.9]  // closing the polygon
                ]]
            }),
            metadata: {
                id: 12,
                name: "Tile 6 - Lucknow",
                description: "Tile covering area from [81.2, 26.9] to [81.3, 27.0]",
                resolution: "high"
            }
        }
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
    }).finally(async () => {
        await prisma.$disconnect();
    });
