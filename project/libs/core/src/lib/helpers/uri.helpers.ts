interface PathParams {
  [param: string]: string | number | undefined;
}

interface QueryParams {
  [param: string]:
    | string
    | number
    | Array<string | number>
    | boolean
    | Date
    | undefined;
}

interface FilterQueryParams {
  [param: string]:
    | string
    | number
    | Array<string | number>
    | boolean
    | Date
    | undefined;
}

const buildQueryParamUrlPart = (
  query: QueryParams,
  param: string | number,
  generateParamKey?: (p: string | number) => string
): string | null => {
  if (!Object.prototype.hasOwnProperty.call(query, param)) {
    return null;
  }

  const paramValue = query[param];

  if (typeof paramValue !== 'boolean' && !paramValue) {
    return null;
  }

  if (Array.isArray(paramValue)) {
    const arrayParam: Array<string> = [];
    paramValue.forEach((item) => {
      arrayParam.push(`${param}[]=${item}`);
    });

    return arrayParam.join('&');
  }

  const paramKey = generateParamKey ? generateParamKey(param) : param;

  return `${paramKey}=${paramValue}`;
};

export interface BuildURIParams {
  pathParams?: PathParams;
  query?: QueryParams;
  filterQuery?: FilterQueryParams;
}

export const buildURI = (path: string, params: BuildURIParams = {}): string => {
  const { pathParams, query, filterQuery } = params;

  const queryParams: Array<string> = [];

  if (pathParams) {
    Object.entries(pathParams).forEach(([name, value]) => {
      if (value === undefined) {
        path = path.replace(new RegExp(`/:${name}\\??`), '');
        return;
      }

      path = path.replace(new RegExp(`:${name}\\??`), String(value));
    });
  }

  if (query) {
    Object.keys(query).forEach((param) => {
      const queryParamUrlPart = buildQueryParamUrlPart(query, param);

      if (!queryParamUrlPart) {
        return;
      }

      queryParams.push(queryParamUrlPart);
    });
  }

  if (filterQuery) {
    Object.keys(filterQuery).forEach((param) => {
      const queryParamUrlPart = buildQueryParamUrlPart(
        filterQuery,
        param,
        (p) => `filter[${p}]`
      );

      if (!queryParamUrlPart) {
        return;
      }

      queryParams.push(queryParamUrlPart);
    });
  }

  if (queryParams.length) {
    path += `?${queryParams.join('&')}`;
  }

  return path;
};
