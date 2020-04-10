import { Placeholder } from '../../src/models/core.models';
import { formatUrl } from '../../src/utils/helpers';

describe('Helpers', () => {
  test('formatUrl 2 strings', () => {
    let placeholders: Placeholder[] = [
      { key: 'name', type: String, value: 'John' },
      { key: 'surname', type: String, value: 'Doe' },
    ];

    const sql: string = 'insert into DbName (name, surname) values (@name, @surname)';
    const ans = formatUrl(sql, placeholders);
    const formattedSql: string = "insert into DbName (name, surname) values ('John', 'Doe')";

    expect(ans).toBe(formattedSql);
  });
});
