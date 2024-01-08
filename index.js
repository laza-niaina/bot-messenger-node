/*const {Messenger}=require("./bot-messenger-node")
const bot=Messenger.create("EAAMYPHPbCMkBOziPkgk1UatdKZARyq1GX752nVQ9cE5ZAB8t3ZCqucUPZCEmZAYshHTpDf8ZBgQUHY2yX81JynZAhNnP8EIXjcCgj8OTheZAbRLvvLHpw8ZA16PdFfSt76ZBRf5DSXDbK7RY1W033U8LkD0QohQyzGIFnyjZCWiSJ90MSSlZBQsR0OMpZAZCZAuvLfHplHI")
bot.sendMessage("5716682198414675","laza")*/
const userAgent= require("random-useragent")
const axios = require("axios")
 const https = require('https');
async function analyse(){
let headers={
"authority":"www.y2mate.com",
"method":"POST",
"path":"/mates/analyzeV2/ajax",
"scheme":"https",
"Accept":`*/*`,
"Accept-Encoding":"gzip, deflate, br",
"Accept-Language":"fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
"Content-Type":`application/x-www-form-urlencoded; charset=UTF-8`,
"Origin":"https://www.y2mate.com",
"Referer":"https://www.y2mate.com/youtube/ynMn7gmuTTk",
"Sec-Ch-Ua":`"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"`,
"Sec-Ch-Ua-Mobile":"?0",
"Sec-Ch-Ua-Platform":"Windows",
"Sec-Fetch-Dest":"empty",
"Sec-Fetch-Mode":"cors",
"Sec-Fetch-Site":"same-origin",
"User-Agent":userAgent.getRandom(),
"X-Requested-With":"XMLHttpRequest"
};
let data={
	k_query:"https://www.youtube.com/watch?v=ynMn7gmuTTk",
	k_page: "home",
	hl: "en",
	q_auto: "1"
}
let res = await axios("https://www.y2mate.com/mates/analyzeV2/ajax", {"method":"POST",data, headers});
	res = res.data;

	if (res.status == "ok") {
		let mp4 = res.links.mp4;
		let mp3 = res.links.mp3;

		let itagMp4 = Object.keys(mp4);
		let itagMp3 = Object.keys(mp3);

		let result = {
			video_id:'',
			title:"",
			mp4: [],
			mp3: []
		};
    result["video_id"]=res.vid;
		result["title"]=res.vid;
		for (let i = 0; i < itagMp4.length; i++) {
			result.mp4.push({
				"quality": mp4[itagMp4[i]].q,
				"size": mp4[itagMp4[i]].size || "...",
				"k": mp4[itagMp4[i]].k
			});
		}

		for (let i = 0; i < itagMp3.length; i++) {
			result.mp3.push({
				"quality": mp3[itagMp3[i]].q,
				"size": mp3[itagMp3[i]].size || "...",
				"k": mp3[itagMp3[i]].k
			});
		}

		return result;
	}

}

async function convert(id , k){
let headers={
	"httpsAgent": new https.Agent({ keepAlive: true }),
"Proxy":"100.128.44.11",
"authority":"www.y2mate.com",
"method":"POST",
"path":"/mates/convertV2/index",
"scheme":"https",
"Accept":`*/*`,
"Accept-Encoding":"gzip, deflate, br",
"Accept-Language":"fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
"Content-Length":"98",
"Content-Type":`application/x-www-form-urlencoded; charset=UTF-8`,
"Origin":"https://www.y2mate.com",
"Referer":"https://www.y2mate.com/youtube/"+id,
"Sec-Ch-Ua":`"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"`,
"Sec-Ch-Ua-Mobile":"?0",
"Sec-Ch-Ua-Platform":"Windows",
"Sec-Fetch-Dest":"empty",
"Sec-Fetch-Mode":"cors",
"Sec-Fetch-Site":"same-origin",
"port": "443",
"User-Agent":userAgent.getRandom(function (ua) {
			return ua.browserName === 'Chrome';
	}),
"X-Requested-With":"XMLHttpRequest",
};
let dataS={
	"vid":id,
	"k": k,
}
let res = await axios("https://www.y2mate.com/mates/convertV2/index", {"method":"POST",data:dataS, headers})
	if(!res.c_status=="CONVERTED"){
		throw new Error("ERROR : "+res.data)
	}
res=res.data;
let result=[]
result.push({
	video_id:res.vid,
	type:res.ftype,
	quality:res.fquality,
	link:res.dlink
})
	console.log(result)
	return result;
}
