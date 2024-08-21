const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    const filePath = path.resolve('./src/data.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const geoJsonData = JSON.parse(fileData);

    const tiles = geoJsonData.features.map((feature, index) => {
        return {
            geom: JSON.stringify(feature.geometry),
            metadata: {
                id: index + 1,
                name: `Tile ${index + 1}`,
                description: `Tile covering the area defined by coordinates ${JSON.stringify(feature.geometry.coordinates)}`,
                resolution: "high"
            }
        };
    });

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
