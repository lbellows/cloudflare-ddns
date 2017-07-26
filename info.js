var cf = require('./CloudFlareDDNS');
var config = require('./config.json');

var cfDNS = new cf(config.account.email, config.account.key);

cfDNS.GetAccountInfo().then(res => {
	console.log(res.data);
	res.data.result.forEach(domain => {
		cfDNS.GetDomainDNS(domain.id).then(record => {
			console.log(record.data);
		})
	})
	
});

