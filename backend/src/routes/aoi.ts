import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();
const router = express.Router();


// Route to handle AOI data and find intersecting tiles
router.post('/aoi', async (req: Request, res: Response) => {
    const { id, latlngs } = req.body;

    try {
        const aoiWKT = latlngsToWKT(latlngs);
        console.log('AOI WKT:', aoiWKT);

        // Ensure to cast geom to the right SRID (4326)
        const intersectingTiles = await prisma.$queryRawUnsafe(`
            SELECT * FROM "Tile"
            WHERE ST_Intersects(
                ST_SetSRID(geom::geometry, 4326), 
                ST_GeomFromText($1, 4326)::geometry
            );
        `, aoiWKT);
        // @ts-ignore
        if (intersectingTiles.length > 0) {
            const response = {
                message: "AOI data processed successfully",
                // @ts-ignore
                intersectingTiles: intersectingTiles.map(tile => ({
                    id: tile.id,
                    coordinates: JSON.parse(tile.geom).coordinates[0], 
                    name: tile.metadata.name,
                    resolution: tile.metadata.resolution,
                    description: tile.metadata.description
                }))
            };
            res.json(response);
        } else {
            const response = {
                message: "No intersecting tiles found",
                intersectingTiles: [{
                    id: 0,
                    coordinates: [],
                    name: "No Data",
                    resolution: "N/A",
                    description: "No intersecting tiles found in the given area."
                }]
            };
            res.json(response);
        }

    } catch (error) {
        console.error('Error processing AOI data:', error);
        res.status(500).json({ message: 'Failed to process AOI data' });
    }
});

// New route to get all GeoJSON data
router.get('/tiles', async (req: Request, res: Response) => {
    try {
        const tiles = await prisma.$queryRawUnsafe(`
            SELECT id, ST_AsGeoJSON(geom::geometry) as geom FROM "Tile";
        `);

        const geoJsonData = {
            type: 'FeatureCollection',
            // @ts-ignore
            features: tiles.map(tile => ({
                type: 'Feature',
                geometry: JSON.parse(tile.geom),
                properties: {
                    id: tile.id,
                }
            }))
        };

        res.status(200).json(geoJsonData);
    } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
        res.status(500).json({ message: 'Failed to fetch GeoJSON data' });
    }
});

// Helper function to convert latlngs to WKT (Well-Known Text) format
const latlngsToWKT = (latlngs: { lat: number; lng: number }[]) => {
    const coordinates = latlngs.map(point => `${point.lng} ${point.lat}`).join(', ');
    return `POLYGON((${coordinates}, ${latlngs[0].lng} ${latlngs[0].lat}))`; // Closing the polygon
};





export default router;
