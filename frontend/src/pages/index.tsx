import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./components/map'), { ssr: false });

const Home = () => {
    return (
        <div className='text-center'>
            <Map />
        </div>
    );
};

export default Home;
