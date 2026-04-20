import type Photo from "../../shared/models/Photo";

interface Ad {
    id: string;
    title: string;
    description: string;
    redirectUrl: string;
    ctaLabel: string;
    photo: Photo;
    createdAt: string;
    updatedAt: string;
}

export default Ad;
