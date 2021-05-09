"use strict";

function caesar(string, shift) {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let arr = string.split('');
    let newstring = arr.map((item) => {
        let symbol = item.toLowerCase();
        let newindex = 0;
        newindex = alphabet.findIndex(item => item === symbol);
        if (newindex !== -1) {
            newindex +=shift; 
            if (Math.abs(newindex) >= alphabet.length) newindex %= alphabet.length;
            if (newindex < 0) newindex += alphabet.length;
            item = item === item.toUpperCase() ? alphabet[newindex].toLocaleUpperCase() : alphabet[newindex];
        } 
        return item;
    });
    return newstring.join('');
}

module.exports = caesar;