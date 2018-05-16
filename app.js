var con = require('manakin').local;
var cf = require('./index');
var os = require('os');
var config = require('./config.json');

con.warn.bright = true; // use bright yellow for `console.warn`
con.error.bright = true; // use bright red for `console.error`
con.success.bright = true; // use bright green for `console.success`
con.info.bright = true; // use bright cyan for `console.info`
con.log.bright = true; // use bright cyan for `console.info`

con.warn('Starting...');
var cfDNS = new cf(config.account.email, config.account.key);
var mins = config.minuteInterval;
var counter = 1;

cf.PrintProgress(`[Minute(s) until next update] 0\\${mins}`);

setInterval(() => {
	cf.GetExternalIp().then(ip => {
		con.log();
		Promise.all(
			config.records.map(record=> {
				return cfDNS.UpdateDomainDNS(record.type, record.key, ip, record.domainKey, record.recordKey)
					.then(res => {
						con.log(`[Updated ${res.data.result.name} -> ${res.data.result.content}] ${new Date().toLocaleString()}`);
					})
			})
		).then(() => {
			cf.PrintProgress(`[Minute(s) until next update] 0\\${mins}`);
		})
	})
}, mins * 60000);

setInterval(() => {
	cf.PrintProgress(`[Minute(s) until next update] ${counter}\\${mins}`);
	if(counter >= mins)
		counter = 1;
	else
		counter += 1;
}, 60000);
