var _; //globals

describe('About Applying What We Have Learnt', function () {
  var products;

  beforeEach(function () {
    products = [
      {
        name: 'Sonoma',
        ingredients: ['artichoke', 'sundried tomatoes', 'mushrooms'],
        containsNuts: false,
      },
      {
        name: 'Pizza Primavera',
        ingredients: ['roma', 'sundried tomatoes', 'goats cheese', 'rosemary'],
        containsNuts: false,
      },
      {
        name: 'South Of The Border',
        ingredients: ['black beans', 'jalapenos', 'mushrooms'],
        containsNuts: false,
      },
      {
        name: 'Blue Moon',
        ingredients: ['blue cheese', 'garlic', 'walnuts'],
        containsNuts: true,
      },
      {
        name: 'Taste Of Athens',
        ingredients: ['spinach', 'kalamata olives', 'sesame seeds'],
        containsNuts: true,
      },
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,
      j,
      hasMushrooms,
      productsICanEat = [];

    for (i = 0; i < products.length; i += 1) {
      if (products[i].containsNuts === false) {
        hasMushrooms = false;
        for (j = 0; j < products[i].ingredients.length; j += 1) {
          if (products[i].ingredients[j] === 'mushrooms') {
            hasMushrooms = true;
          }
        }
        if (!hasMushrooms) productsICanEat.push(products[i]);
      }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
    var productsICanEat = [];

    /* solve using filter() & all() / any() */
    productsICanEat = _(products).filter((product) => {
      const hasMushrooms = _(product.ingredients).any(
        (ingredient) => ingredient === 'mushrooms'
      );
      return !product.containsNuts && !hasMushrooms;
    });

    expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it('should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)', function () {
    var sum = 0;
    for (var i = 1; i < 1000; i += 1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it('should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)', function () {
    var sum = 0; /* try chaining range() and reduce() */

    sum = _(_.range(1, 1000)).reduce((result, current) => {
      if (current % 3 === 0 || current % 5 === 0) {
        return result + current;
      }
      return result;
    }, 0);

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
  it('should count the ingredient occurrence (imperative)', function () {
    var ingredientCount = { '{ingredient name}': 0 };

    for (i = 0; i < products.length; i += 1) {
      for (j = 0; j < products[i].ingredients.length; j += 1) {
        ingredientCount[products[i].ingredients[j]] =
          (ingredientCount[products[i].ingredients[j]] || 0) + 1;
      }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it('should count the ingredient occurrence (functional)', function () {
    var ingredientCount = { '{ingredient name}': 0 };

    /* chain() together map(), flatten() and reduce() */
    _(products)
      .chain()
      .map((product) => product.ingredients)
      .flatten()
      .reduce((result, current) => {
        result[current] = (result[current] || 0) + 1;
        return result;
      }, ingredientCount)
      .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  it('should find the largest prime factor of a composite number', function () {
    const number = 102;
    let list = [];

    for (i = 2; i <= number; i++) {
      if (number % i === 0) {
        list.push(i);
      }
    }

    for (let i = 0; i * i < list[list.length - 1]; i++) {
      const prime_num = list[i];
      list = _(list).filter((number) => {
        if (number === prime_num || number % prime_num !== 0) {
          return number;
        }
      });
    }

    expect(17).toBe(list[list.length - 1]);
  });

  it('should find the largest palindrome made from the product of two 3 digit numbers', function () {
    let hightest = 0;

    for (let i = 999; i > 99; i--) {
      for (let j = 999; j > 99; j--) {
        if (
          i * j > hightest &&
          String(i * j)
            .split('')
            .reverse()
            .join('') === String(i * j)
        ) {
          hightest = i * j;
        }
      }
    }

    expect(906609).toBe(hightest);
  });

  it('should find the smallest number divisible by each of the numbers 1 to 20', function () {
    function isDiv(number) {
      for (let j = 1; j <= 20; j++) {
        if (number % j !== 0) {
          return false;
        }
      }
      return true;
    }

    function found() {
      for (let i = 20; i < Infinity; i++) {
        if (isDiv(i)) {
          return i;
        }
      }
    }

    expect(232792560).toBe(found());
  });

  it('should find the difference between the sum of the squares and the square of the sums', function () {
    let sumOfSquares = 0;
    let squaresOfSum = 0;
    let nums = [];

    function getNums(n) {
      return _.range(n + 1);
    }

    nums = getNums(10);

    sumOfSquares = _(nums).reduce((accum, curr) => accum + curr);
    sumOfSquares *= sumOfSquares;
    squaresOfSum = _(nums).reduce((accum, curr) => accum + curr * curr);

    const result = sumOfSquares - squaresOfSum;

    expect(2640).toBe(result);
  });

  it('should find the 10001st prime', function () {
    function get_num(n) {
      let list = _.range(2, n);

      for (let i = 0; i * i < list[list.length - 1]; i++) {
        const prime_num = list[i];
        list = _(list).filter((number) => {
          if (number === prime_num || number % prime_num !== 0) {
            return number;
          }
        });
      }

      if (list.length >= 10001) {
        return list[10000];
      }
      return false;
    }

    function found() {
      for (let i = 10000; i < Infinity; i += 10000) {
        if (get_num(i)) {
          return get_num(i);
        }
      }
    }

    expect(104743).toBe(found());
  });
});
