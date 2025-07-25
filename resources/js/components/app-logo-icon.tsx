import { ImgHTMLAttributes } from 'react';
import images from '../../assets/image/Teknindo Awal.png';


export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src={images}
            alt="App Logo"
            className="w-100 h-100 fill-current text-white dark:text-black"
            {...props}
        />
    );
}
