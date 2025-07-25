import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import LocationMap from '@/components/location-map';
import Navbar from '@/components/navbar';

function Location() {
    return (
        <div>
            <Navbar />
            <div className="pt-16">
                <div className="text-center">
                    <h1 className="p-4 text-3xl font-bold">Location</h1>
                    <p className="p-4">
                        This page displays the location of our office on a map. You can zoom in and out to see the surrounding area.
                    </p>
                </div>
                <div className="w-full">
                    <LocationMap />
                </div>
            </div>
            <FloatingQuickActions />
            <Footer7 />
        </div>
    );
}

export default Location;
