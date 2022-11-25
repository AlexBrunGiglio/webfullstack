import * as path from 'path';
import * as child_process from 'child_process';

const exec = child_process.exec;
const libPath = path.join('my-lib-ui');
const vitrinePath = path.join('..', 'vitrine');

await exec(`cd ${libPath} && npm run rollup && yalc publish && cd ${vitrinePath} && yalc update && npm i`, function (error) {
    if (error)
        console.log(error);
    else console.log('Le script a été correctement initialisé');
});