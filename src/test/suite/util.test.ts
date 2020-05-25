import * as assert from 'assert';

import { format2CamelCase } from "../../lib/util";

suite('util', () => {
    test('format2CamelCase', () => {
        const r1 = format2CamelCase('test-ass')
        assert.equal(r1, 'TestAss')
    })
})