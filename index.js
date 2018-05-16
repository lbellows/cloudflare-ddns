var axios = require('axios');

module.exports = class CloudflareDDNS {

	constructor(authEmail, authKey) {
		this.authEmail = authEmail;
		this.authKey = authKey
	}

	static PrintProgress(progress) {
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		process.stdout.write(progress);
	}

	static GetExternalIp() {
		return axios.get('https://api.ipify.org').then(res => {
			return res.data;
		});
	}

	GetAccountInfo() {
		return axios.get(`https://api.cloudflare.com/client/v4/zones`,
			{
				headers: {
					'X-Auth-Email': this.authEmail,
					'X-Auth-Key': this.authKey
				}
			});
	}

	GetDomainDNS(domainKey) {
		return axios.get(`https://api.cloudflare.com/client/v4/zones/${domainKey}/dns_records`,
			{
				headers: {
					'X-Auth-Email': this.authEmail,
					'X-Auth-Key': this.authKey
				}
			});
	}

	UpdateDomainDNS(recordType, recordKey, recordValue, domainKey, dnsRecordKey) {
		return axios.put(`https://api.cloudflare.com/client/v4/zones/${domainKey}/dns_records/${dnsRecordKey}`,
			{
				'type': recordType,
				'name': recordKey,
				'content': recordValue
			},
			{
				headers: {
					'X-Auth-Email': this.authEmail,
					'X-Auth-Key': this.authKey
				}
			}); 
	}

	PrintAccountInfo() {
		return this.GetAccountInfo().then(res => {
			console.log(res.data);
			res.data.result.forEach(domain => {
				cfDNS.GetDomainDNS(domain.id).then(record => {
					console.log(record.data);
				})
			})
		})
	}

}