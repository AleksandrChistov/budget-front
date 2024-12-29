import { Params } from '@angular/router';

export function buildQueryParams(params: Params): string {
  const queryParts: string[] = [];

  Object.entries(params).forEach(([ key, value ]) => {
    if (value != null && value !== '') {
      queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  });

  return queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
}
