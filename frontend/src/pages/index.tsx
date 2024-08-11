
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../pages/components/map'), { ssr: false });

export default function Home() {
  return (
    <div>
      <Map />
    </div>
  );
}
