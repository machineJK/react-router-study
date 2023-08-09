export type ContactProps = {
    contact: ContactType
}

export type ContactType = {
    first: string;
    last: string;
    avatar: string;
    twitter: string;
    notes: string;
    favorite: boolean;
}

export type URLParamsType = {
    [key: string]: string;
}

export type RequestType = {
    // context:
}