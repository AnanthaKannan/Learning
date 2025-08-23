function isHappy(n: number): boolean {

  let result = 0
  let set = new Set()
  while (result != 1) {
    let numArr = `${n}`.split('')
    result = 0;
    for (let i = 0; i < numArr.length; i++) {
      result += Math.pow(parseInt(numArr[i]), 2)
    }

    if (set.has(result)) {
      return false
    } else {
      set.add(result)
    }

    n = result
  }

  return true
};

console.log(isHappy(2))