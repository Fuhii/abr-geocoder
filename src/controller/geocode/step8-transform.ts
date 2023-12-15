/*!
 * MIT License
 *
 * Copyright (c) 2023 デジタル庁
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { Query } from '@domain/query';
import { RegExpEx } from '@domain/reg-exp-ex';
import { DASH, SPACE } from '@settings/constant-values';
import { Transform, TransformCallback } from 'node:stream';
import { setFlagsFromString } from 'v8';
import { runInNewContext } from 'vm';
setFlagsFromString('--expose_gc');
const gc = runInNewContext('gc');

export class GeocodingStep8 extends Transform {
  private cnt: number = 0;

  constructor() {
    super({
      objectMode: true,
    });
  }

  _transform(
    query: Query,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    //
    // {SPACE}, {DASH} をもとに戻す
    //
    query = query.copy({
      tempAddress: this.restore(query.tempAddress),
    });

    // 100件ごとに GCを行う
    this.cnt++;
    if (this.cnt === 100) {
      gc();
      this.cnt = 0;
    }

    callback(null, query);
  }

  private restore(address: string): string {
    return address
      .replace(RegExpEx.create(DASH, 'g'), '-')
      .replace(RegExpEx.create(SPACE, 'g'), ' ')
      .trim();
  }
}
