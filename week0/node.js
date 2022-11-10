const axios = require('axios');
const fs = require('fs');
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';

/**
 * 1. call https://jsonplaceholder.typicode.com/users and write it to file users.json
 * todo: install module to call this API, and use node FS module
 */

axios.get('/users')
    .then(({data}) => {
        fs.writeFile('users.json', JSON.stringify(data), (error) => {
            if(error){
                console.log(error)
            }
        })
    })
    .catch(error => {
        console.log(error);
    });


/**
 * 2. Let's work with running node script with some environment variables
 * todo: Pass parameter ENV when you run this script.
 * If param is PRODUCTION  get data from https://jsonplaceholder.typicode.com/todos and write it to file todos.json
 * If param is DEV get data from https://jsonplaceholder.typicode.com/albums and write if to file albums.json
 */

const config = {
    'PRODUCTION' : {
        url: '/todos',
        fileName: 'todos'
    },
    'DEV': {
        url: '/albums',
        fileName: 'albums'
    }
}

if(!config[process.env.ENV]){
    console.log('Error! Specify the ENV parameter PRODUCTION or DEV.')
    return;
}

const {url, fileName} = (() => (config[process.env.ENV]))();
axios.get(url)
        .then(({data}) => {
            fs.writeFile(`${fileName}.json`, JSON.stringify(data), (error) => {
                if(error){
                    console.log(error)
                }
            })
        })
        .catch(error => {
            console.log(error);
        });
