import { useEffect, useState } from 'react'
import { ImageInterface } from '../types'

const Image = ({ src, alt, lazyLoad, draggable, className, maxRetries, fallbackSrc }: ImageInterface) => {

    // Set default values for 
    const max_retries = (maxRetries) ? maxRetries : 3;
    const fallback_src = (fallbackSrc) ? fallbackSrc : '';

    const [attempt, setAttempt] = useState(0);
    const [imgSrc, setImgSrc] = useState(src);
    
    useEffect(() => {
        setImgSrc(src);
        setAttempt(0);
    }, [])

    const handleError = () => {
        if (attempt < max_retries) {
            setAttempt(prev => prev + 1);
            const newSrc = `${src}?retry=${attempt}`;
            setImgSrc(newSrc);
            console.log(src, attempt, newSrc);
        } else setImgSrc(fallback_src);
    }

    return (
        <img src={imgSrc} alt={alt} className={(className) ? className : ''} onError={handleError} loading={(lazyLoad) ? 'lazy' : 'eager'} draggable={draggable} />
    )
}

export default Image