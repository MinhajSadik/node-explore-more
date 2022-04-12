/**
 * Title: Math Library
 * Description: Simple Math Library
 * Author: Minhaj Sadik
 * Date: 12-04-22
 */

// math object - module scaffolding
const math = {};

math.getRandomNumber = function getRandomNumber(min, max) {
  let minimum = min;
  let maxValue = max;
  minimum = typeof minimum === "number" ? minimum : 0;
  maximum = typeof maximum === "number" ? maximum : 0;
  return Math.floor(Math.random() * (maximum - minimum + 1) + min);
};

module.exports = math;
