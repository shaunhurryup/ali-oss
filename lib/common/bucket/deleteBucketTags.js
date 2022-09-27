const { checkBucketName: _checkBucketName } = require('../utils/checkBucketName');
const { isArray } = require('../utils/isArray');
const { isObject } = require('../utils/isObject');

const proto = exports;
/**
 * deleteBucketTags
 * @param {String} name - bucket name
 * @param {Array} tags - tags
 * @param {Object} options
 */

proto.deleteBucketTags = async function deleteBucketTags() {
  const name = arguments[0];
  _checkBucketName(name);

  let options = {};
  let subres = 'tagging';

  if (arguments.length === 2) {
    if (isArray(arguments[1])) {
      subres = { tagging: arguments[1].toString() };
    }
    if (isObject(arguments[1])) {
      options = arguments[1];
    }
  }

  if (arguments.length === 3) {
    if (!isArray(arguments[1])) {
      throw new Error('tags must be Array');
    }
    subres = { tagging: arguments[1].toString() };
    options = arguments[2];
  }

  const params = this._bucketRequestParams('DELETE', name, subres, options);
  params.successStatuses = [204];
  const result = await this.request(params);

  return {
    status: result.status,
    res: result.res
  };
};
