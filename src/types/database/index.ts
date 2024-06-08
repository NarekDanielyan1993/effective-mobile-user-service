import { ParsedUrlQuery } from 'querystring';

export type EnvVariableTypes = 'DATABASE_URL' | 'PORT' | 'RABBIT_MQ_URL';

export interface IParsedPaginatedQueryParams {
    pageSize: number;
    pageNumber: number;
    skip: number;
}

export type IPaginatedQueryParams = {
    list_size: string;
    page: string;
} & ParsedUrlQuery;
