// Задание 1
function pickPropArray(array, prop) {
    let result = [];
    for (let index = 0; index < array.length; index++) {
        let el = array[index];
        if (el.hasOwnProperty(prop)) {
            result.push(el[prop]);
        }
    }
    return result;
}

const students = [
    { name: 'Павел', age: 20 },
    { name: 'Иван', age: 20 },
    { name: 'Эдем', age: 20 },
    { name: 'Денис', age: 20 },
    { name: 'Виктория', age: 20 },
    { age: 40 },
];

const result = pickPropArray(students, 'name');
console.log('Задание 1', result);

// Задание 2
function createCounter() {
    let count = 0;
    return function () {
        count++;
        console.log(count);
    }
}

console.log('Задание 2');
const counter1 = createCounter();
counter1(); // 1
counter1(); // 2
const counter2 = createCounter();
counter2(); // 1
counter2(); // 2


// Задание 3

function spinWords(str) {
    const words = str.split(' ');
    for (let index = 0; index < words.length; index++) {
        if (words[index].length >= 5) {
            words[index] = words[index].split('').reverse().join('');
        }
    }
    return words.join(' ');
}

console.log('Задание 3');
const result1 = spinWords("Привет от Legacy");
console.log(result1); // тевирП от ycageL
const result2 = spinWords("This is a test");
console.log(result2); // This is a test

// Задание 4

function searchSumTarget(nums, target) {
    let result = [];
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                result.push(i, j);
                return result;
            }
        }
    }
    return result;
}

console.log('Задание 4')
const nums = [2, 7, 11, 15];
const target = 9;
const result4 = searchSumTarget(nums, target);
console.log(result4);

// Задание 5
function findPrefix(array) {
    if (array.length === 0) {
        return "";
    }

    if (array.length === 1) {
        return array[0];
    }

    let short_str = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i].length < short_str.length) {
            short_str = array[i];
        }
    }

    const short_str_len = short_str.length;
    for (let i = short_str_len; i >= 2; i--) {
        for (let j = 0; j <= short_str_len - i; j++) {
            let prefix = short_str.substring(j, j + i);
            let check = true;
            for (let k = 0; k < array.length; k++) {
                if (array[k].indexOf(prefix) === -1) {
                    check = false;
                    break;
                }
            }
            if (check) {
                return prefix;
            }
        }
    }
    return "";
}

console.log('Задание 5');
const strs1 = ["цветок", "поток", "хлопок"];
const result51 = findPrefix(strs1);
console.log(result51); // "ок"
const strs2 = ["собака", "гоночная машина", "машина"];
const result52 = findPrefix(strs2);
console.log(result52); // ""