import app from '../app'
import * as path from 'path'
import { promises as fs } from 'fs';

import supertest from 'supertest';

const fixturePath = path.join(__dirname, "./fixtures/test_file");



it('should test for word frequencies', async () => {

  const dts = await fs.readFile(path.join(__dirname, "./fixtures/test_file"),'utf8')

  
  const query = /* GraphQL */ ` mutation (
    $file: Upload!
    $min: Int = 0
    $max: Int = 0
  ) {
    uploadFile(
      file: $file
      min: $min
      max: $max
    ) {
      frequencies {
        count
        word
      }
    }
  }`


  const requestResponse = await supertest(app)
      .post("/graphql")
      //.set({ Authorization: `Bearer ${token}` })  add tokens for a secure request!!
      .set('Content-Type', 'multipart/form-data;')
      .field(
        "operations",
        JSON.stringify({
          query,
          variables: {
            file: null,
            min: 7,
            max: 8
          },
        })
      )
      .field(
        "map",
        JSON.stringify({
          file: ["variables.file"]
        })
      )
      .attach("file", fixturePath, { contentType: 'application/octet-stream' })
      .expect(({ body }) => {
        console.log(body);
        //expect(body.data.uploadFile).toBeDefined();
      })
      .expect(200); 



     const {
          body: {
               data: {
                    uploadFile
               }
          }
     } = requestResponse

     const result = JSON.stringify({"frequencies": [{"count": 8, "word": "amet"}, {"count": 8, "word": "sit"}, {"count": 8, "word": "ut"}, {"count": 7, "word": "ac"}, {"count": 7, "word": "at"}, {"count": 7, "word": "in"}, {"count": 7, "word": "lorem"}, {"count": 7, "word": "magna"}, {"count": 7, "word": "quis"}]});

     expect(JSON.stringify(uploadFile)).toBe(result)
})