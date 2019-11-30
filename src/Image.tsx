import * as React from 'react';
import classnames from 'classnames';

interface IImage extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const Image: React.FC<IImage> = ({ src, alt, ...rest }) => {
    const [hasLoaded, setHasLoaded] = React.useState(false);
    const imgRef: React.RefObject<HTMLImageElement> = React.useRef(null);

    React.useEffect(() => {
        const img = imgRef.current;

        if (img) {
            img.onload = () => {
                setHasLoaded(true);
            };

            img.onerror = () => {
                setHasLoaded(false);
            };

            img.src = src as string;
        }
    }, [src]);

    return (
        <div className={classnames('cover', hasLoaded && 'cover--ready')}>
            <img {...rest} src={src} alt={alt} ref={imgRef} className="thumbnail" />
            <div className="cover__placeholder" />
        </div>
    );
};
