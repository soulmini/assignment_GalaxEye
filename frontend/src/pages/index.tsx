// pages/index.tsx
'use strict';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./components/map'), { ssr: false });

const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold mb-8'>Map</h1>
            <MapComponent />
        </div>
    );
};

export default Home;
