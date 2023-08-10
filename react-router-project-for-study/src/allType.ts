import { Params } from "react-router-dom";

export type ContactProps = {
    contact: ContactType
}

export type ContactType = {
    id: string;
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
    [key: string]: any,
    params: Params,
    request: Request
}