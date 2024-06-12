#!/usr/bin/env node
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

(function (readline) {
    const message = "hello world";
    let output;

    const rl = readline.createInterface({
        input,
        output,
    });

    rl.question("Who are you?", (name) => {
        output = `${message} \n ${name}`;
        console.log(output);
        rl.close();
    });

    return void 0;
})(readline);
