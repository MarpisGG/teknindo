import { ImgHTMLAttributes } from 'react';
import images from '../../assets/image/Teknindo Awal.png';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return <img src={images} alt="App Logo" className="h-100 w-100 fill-current text-white" {...props} />;
}
