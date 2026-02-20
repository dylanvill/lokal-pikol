export interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface PaginationMetaLinks {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationMetaLinks[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

interface PaginatedData<T> {
    data: T[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

export default PaginatedData;
