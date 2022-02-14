/* eslint-disable prettier/prettier */
import {model,Schema} from 'mongoose'

 const codeSchema = new Schema(
        {
          email: {
              type: String
          },
          resetcode: {
              type: String
          },
          expireAt: {
              type: Date,
              default: Date.now,
              index: {expireAfterSeconds:1800}
          }
        }
    )

export default model('code', codeSchema);
