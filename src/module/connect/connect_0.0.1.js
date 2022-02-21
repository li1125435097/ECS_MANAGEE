const { readFileSync } = require('fs')
const { Client } = require('ssh2')
const path = require('path')
const { resolve } = require('path')
const HOME = process.env.HOME
const conn = new Client()
const l = console.log
const option = {
    host: '120.55.170.164',
    port: 22,
    username: 'root',
    privateKey: readFileSync(path.join(HOME,'/.ssh/id_rsa'))
}

async function main(){
    let result = await exec('ls',option)
    l(result)
}
main()





function exec(order,option){
    return new Promise((resolve,reject) => {
        conn.connect(option)        
        conn.on('ready', () => {
            conn.exec(order, (err, stream) => {
                if (err) reject(err);
                stream.on('close', (code, signal) => {conn.end()})
                stream.on('data', (data) => {resolve(data,'std')})
                stream.stderr.on('data', (data) => {resolve(data,'stderr')})
            })
        })
    })
}  


