import { readFile, writeFile } from "fs/promises";
import * as path from "path";
import { parse } from "csv-parse";
import {CsvData, DATA_COLUMN_HEADERS} from "../data/common";

export class IoService {
    private readonly path: string;
    constructor() {
        this.path = path.resolve(__dirname, '../data');
    }
    async readData(): Promise<CsvData[]> {
        const fileContent = await readFile(`${this.path}/data.csv`, { encoding: 'utf-8' });
        return new Promise((resolve, reject) => {
            parse(fileContent, {
                delimiter: ',',
                columns: DATA_COLUMN_HEADERS,
            }, (err, rows: CsvData[]) => {
                if(err) {
                    reject(err)
                }
                return resolve(rows)
            })
        })
    }

    writeData(data: string): Promise<void> {
        return writeFile(`${this.path}/output.txt`, data)
    }
}

