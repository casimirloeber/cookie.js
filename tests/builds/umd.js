const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { JSDOM } = require('jsdom');
const cookie = require('../../dist/cookie.umd.js');

const shared = require('../shared');

describe('UMD Build', () => {
  it('imports properly', () => {
    const cookieUmdFile = fs.readFileSync(path.join(__dirname, '../../dist/cookie.umd.js'));
    const window = (new JSDOM(``, { runScripts: "dangerously" })).window;
    const scriptEl = window.document.createElement("script");
    scriptEl.textContent = cookieUmdFile;
    window.document.body.appendChild(scriptEl);
    assert(window.cookie);
    assert(typeof window.cookie, 'function');
    assert(typeof window.cookie.get, 'function');
  });

  shared.test({ cookie });
})
