'use strict';

import build from './perms.js';
/*
var permutations = {
    build: build
};
console.log('loaded filter_perms');
*/
var perms = build(6, 4);

function check_exact(exact, perm, pattern) {
    var perm = perm.split('');
    var pattern = pattern.split('');
    var pattern_len = pattern.length;
    var count = 0;
    for (let i = 0; i < pattern_len; i++) {
        if (pattern[i] === perm[i]) {
            pattern[i] = '_';
            count += 1;
	}
    }
    if (count === exact) {
        return true;
    } else {
        return false;
    }
}
        

function check_inexact(inexact, perm, pattern) {
    var perm = perm.split('');
    var orig_pattern = pattern;
    var pattern = pattern.split('');
    var pattern_len = pattern.length;
    for (let i = 0; i < pattern_len; i++) {
        if (pattern[i] === perm[i]) {
            perm[i] = '_';
            pattern[i] = '_';
        }
    }
    var count = 0;
    for (let i = 0; i < pattern_len; i++) {
        if (pattern[i] !== '_') {
            if (pattern[i] !== perm[i] && perm.indexOf(pattern[i]) !== -1) {
                let ndx = perm.indexOf(pattern[i]);
                perm[ndx] = '_';
                count++;
            }
        }
    }

    if (count === inexact) {
        return true;
    } else {
        return false;
    }
}

function is_match(exact, inexact, perm, pattern) {
    var exact_match = check_exact(exact, perm, pattern);
    if (exact_match) {
        var inexact_match = check_inexact(inexact, perm, pattern);
    }

    return exact_match && inexact_match;
}

function filter_perms(exact, inexact, pattern) {
    var filtered = [];
    perms.forEach((p) => {
        if (is_match(exact, inexact, p, pattern)) {
            filtered.push(p);
        }
    });

    return filtered;
}

function update_perms(reduced_set) {
  perms = reduced_set;
}

function random_perm() {
  let ndx = Math.floor(Math.random() * perms.length);
  return perms[ndx];
}

function refresh_perms() {
  perms = build(6, 4);
}

/*
To test:
*/

//var results = filter_perms(2, 2, 'ABCD');
//console.log('results from 2, 2, ABCD', results, results.length);
export { refresh_perms, random_perm, update_perms, filter_perms };
