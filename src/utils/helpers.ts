import { Placeholder } from '../models/core.models';
const TYPES = require('tedious').TYPES;

export function formatUrl(url: string, placeHolders: Placeholder[]): string {
  let formattedUrl: string = url;
  placeHolders.forEach((el: Placeholder) => {
    //TODO handle the Type

    formattedUrl = formattedUrl.replace(`@${el.key}`, `'${el.value}'`);
  });

  return formattedUrl;
}
