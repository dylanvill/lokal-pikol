interface Court {
    id: string;
    name: string;
    address: string;
    numberOfCourts: number;
    courtTypes: string[]; // ['covered'], ['open'], or ['covered', 'open']
    profilePhoto: string;
    coverPhoto: string;
}

export default Court;
