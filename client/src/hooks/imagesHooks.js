import { useState, useEffect } from 'react';

const GET_IMAGES_URL = 'http://localhost:3000/images';

const useImages = () => {
    const [images, setImages] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const response = await fetch(GET_IMAGES_URL);
                const data = await response.json();
                setImages(data);
            } catch (error) {
                setError(error);
                console.error('Error fetching images:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    return { images, error, loading };
};

export default useImages;