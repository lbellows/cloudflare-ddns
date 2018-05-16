# CloudFlare DDNS example
This will check your external ip every X minutes and update your account.  You can use the info.js to get your account information to use the config example below after filling in your account section.  You can also add multiple updates in the interval by duplicating the line below and updating your config
```
cfDNS.UpdateDomainDNS(...)
```

## Config outline.
You can get the keys from your cloudflare account or using the script.
```
{
	"account":{
		"email": "",
		"key": ""
	},
	"records":[
		{
			"type": "A",
			"key": "subdomain",
			"domainKey": "",
			"recordKey": ""
		},
		{ ... }
	],
	"minuteInterval": 60
}
```

## Running the program
After updating the config:
```
node app.js
```
