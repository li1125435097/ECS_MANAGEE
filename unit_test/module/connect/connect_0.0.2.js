const path = require('path')
const { readFileSync } = require('fs')
const Client = require(path.join(__dirname,'../../../src/module/connect/connect_0.0.2'))
const assert = require('assert')
const l = console.log


async function test(){
	let option = {
    host: '120.55.170.164',
    port: 22,
    username: 'root',
    privateKey: readFileSync(path.join(process.env.HOME,'/.ssh/id_rsa'))
	}
	
	let client = new Client(option)
	await client.exec('ls').catch(err=>{l('connect_0.0.2测试不通过  exec执行报错---------')})
	await client.destroy()
	l('connect_0.0.2测试通过++++++++++')
}

test()
