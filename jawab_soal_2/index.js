const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getInput(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (input) => { //callback digunakan secara implisit
            resolve(input);
        });
    });
}

function createPromise(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Waktu habis.');
        }, 15000);
    });
}

function displayList(items){
    console.log('List fakultas: ');
    items.forEach((item,index) => {
        console.log(`- ${index+1}.${item}`);
    });
}

async function inputRecursive(prompt, items, count){
    if (count === 3){
        displayList(items);
        rl.close();
        return;
    }
    const newItem = await getInput(`${prompt}${count+1}: `);
    items.push(newItem);
    await inputRecursive(prompt, items, count + 1);
}

async function main() {
    const items = [];
    const nama = await getInput('Masukkan nama Anda: ');
    console.log(`Selamat datang, ${nama}!`);
    console.log ('Silahkan masukkan fakultas yang diincar.')
    await inputRecursive('Masukkan fakultas ', items, 0);
    console.log(await createPromise());
}

main();
