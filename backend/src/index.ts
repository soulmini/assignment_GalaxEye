import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 5000;
import aoi from './routes/aoi';


app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({message : "hello from server!"});
})


app.use('/api', aoi);


app.listen(PORT, ()=> {
    console.log(`Server running at http://localhost:${PORT}`);
});