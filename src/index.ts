import { Placeholder, Row } from './models/core.models';
import { formatUrl } from './utils/helpers';
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

class Tidy {
  construstor() {}
  private inputs: boolean = false;
  private placeHolders: Placeholder[] = [];

  request(): Tidy {
    return this;
  }

  input(key: string, type: any, value: any): Tidy {
    this.inputs = true;

    this.placeHolders.push({
      key,
      type,
      value,
    });

    return this;
  }

  query(sqlQuery: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const rows: Row[] = [];
      let total: number = 0;
      let sql = sqlQuery;

      //TODO: add config
      let connection = new Connection({});

      if (this.inputs) {
        sql = formatUrl(sqlQuery, this.placeHolders);
      }

      connection.on('connect', (err: Error) => {
        if (err) {
          reject(err);
        }

        let request: any = new Request(sql, (err: Error, rowCount: number) => {
          if (err) {
            reject(err);
          } else {
            total = rowCount;
          }

          connection.close();

          if (total === 0) {
            reject({
              recordset: [],
            });
          }
        });

        request.on('row', (columns: any[]) => {
          let row: Row = {};
          // TODO: need to check this logic
          columns.forEach((col: any) => {
            const colName = col['metadata.colName'];
            row[colName] = col.value;
          });
          rows.push(row);
          if (total === rows.length - 1) {
            resolve({
              recordset: rows,
            });
          }
        });

        connection.execSql(request);
      });
    });
  }
}
