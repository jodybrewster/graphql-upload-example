import { IResolvers } from 'graphql-tools';
import * as path from 'path';
import * as fs from 'fs';
import { Upload } from 'graphql-upload';
import {words, countBy, entries, orderBy, filter} from 'lodash';

const streamToString = (stream: any): Promise<string> => {
  const chunks: any = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err: any) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  })
}

const wordFreq = (string: string) => {
  return string.replace(/[.,]/g, '')
    .split(/\s/)
    .reduce((map: any, word: any) =>
      Object.assign(map, {
        [word]: (map[word])
          ? map[word] + 1
          : 1,
      }),
      {}
    );
}

const resolverMap: IResolvers = {
  Query: {
    uploads: (parent, args) => {},
  },
    Mutation: {
      uploadFile: async (_, args) => {
        console.log(args);
        const { file } = args;
        const { filename, mimetype, createReadStream } = await file.file;

        let stream = createReadStream();
        const pathName = path.join(__dirname, `/uploads/${filename}`);

        const freq = await streamToString(stream);
       
        const rawResults = 
          orderBy(
            entries(
              countBy(
                words(
                  freq.toLowerCase()
                ))).map(([word, count]) => ({ word, count })
            ), 
          ['count', 'word'], ['desc', 'asc']);

        const results = filter(rawResults, (x: any) => {
          return (x.count >= args.min && x.count <= args.max);
        });


        return { frequencies: results }
      },
    },
  };
export default resolverMap;