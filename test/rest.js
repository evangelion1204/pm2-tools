'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

import RestServer from '../src/rest'

describe('REST-Server', function() {
    it('should be a class', function () {
        expect(RestServer).to.be.a('function');
    })
})