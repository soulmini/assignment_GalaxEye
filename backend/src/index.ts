import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 5000;
import aoi from './routes/aoi';
import tiles from './routes/tiles';


app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({message : "hello from server!"});
})


app.use('/api', aoi);

// this for testing purposes only
app.use('/api', tiles);


app.listen(PORT, ()=> {
    console.log(`Server running at http://localhost:${PORT}`);
});