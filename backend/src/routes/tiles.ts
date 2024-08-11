import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Function to convert latlngs to WKT (placeholder for your actual implementation)
const latlngsToWKT = (latlngs: { lat: number; lng: number }[]): string => {
  // Basic WKT polygon conversion, you might need to handle specific formats and validations
  const coordinates = latlngs.map(({ lat, lng }) => `${lng} ${lat}`).join(', ');
  return `POLYGON((${coordinates}))`;
};

// Route to store tile
router.post('/tilesStore', async (req, res) => {
  try {
    const { id, latlngs } = req.body;

    // Validate input
    if (!id || !latlngs || !Array.isArray(latlngs) || latlngs.length === 0) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Convert latlngs to WKT
    const wkt = latlngsToWKT(latlngs);

    // Store data in the Tile model
    await prisma.tile.create({
      data: {
        id,
        geom: wkt,
        metadata: { latlngs }
      }
    });

    res.status(201).json({ message: 'Tile created successfully' });
  } catch (error) {
    console.error('Error storing tile data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
