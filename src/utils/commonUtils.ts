import {
  StringifiableRecord,
  StringifyOptions,
  stringifyUrl,
} from 'query-string';

export const customStringify = (
  url: string,
  query: StringifiableRecord,
  config?: StringifyOptions,
) => {
  const t = { ...query };
  Object.keys(t).forEach((key) => {
    t[key] = (t[key] ?? '').toString().trim();
  });
  return stringifyUrl(
    { url, query: t },
    { skipEmptyString: true, skipNull: true, ...config },
  );
};
