import type Photo from '../../shared/Photo';

interface Court {
    id: string;
    name: string;
    covered: boolean;
    photos: Photo[];
}

export default Court;
