var base32={}; var charTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"; function quintetCount(buff) { var quintets = Math.floor(buff.length / 5); return buff.length % 5 == 0 ? quintets: quintets + 1; }; base32.encode = function(plain) { var i = 0; var j = 0; var shiftIndex = 0; var digit = 0; var encoded = new Buffer.from(quintetCount(plain) * 8); if(!Buffer.isBuffer(plain)){ plain = new Buffer.from(plain); } while(i < plain.length) { var current = plain[i]; if(shiftIndex > 3) { digit = current & (0xff >> shiftIndex); shiftIndex = (shiftIndex + 5) % 8; digit = (digit << shiftIndex) | ((i + 1 < plain.length) ? plain[i + 1] : 0) >> (8 - shiftIndex); i++; } else { digit = (current >> (8 - (shiftIndex + 5))) & 0x1f; shiftIndex = (shiftIndex + 5) % 8; if(shiftIndex == 0) i++; } encoded[j] = charTable.charCodeAt(digit); j++; } for(i = j; i < encoded.length; i++){ encoded[i] = 0x3d; } return encoded; };
var crypto = require('crypto');
var FA = {};
FA.generateCode = function(key, counter, opts) { opts = opts || {}; var length = opts.length || 6; var hmac = crypto.createHmac('sha1', key); var counterBytes = new Array(8); for (var i = counterBytes.length - 1; i >= 0; i--) { counterBytes[i] = counter & 0xff; counter = counter >> 8; }; var token = hmac.update(new Buffer.from(counterBytes)).digest('hex'); var tokenBytes = []; for (var i = 0; i < token.length; i += 2) { tokenBytes.push(parseInt(token.slice(i).slice(0, 2), 16)); }; var offset = tokenBytes[19] & 0xf; var ourCode = (tokenBytes[offset++] & 0x7f) << 24 | (tokenBytes[offset++] & 0xff) << 16 | (tokenBytes[offset++] & 0xff) << 8  | (tokenBytes[offset++] & 0xff); ourCode += ''; ourCode = ourCode.substr(ourCode.length - length); while (ourCode.length < length) {ourCode = '0' + ourCode;} return ourCode; };

FA.base32Encode = function (key) {return base32.encode(key).toString().replace(/=/g, '');};

FA.generateUrl = function (name, account, key) { return 'otpauth://totp/' + encodeURIComponent(account) + '?issuer=' + encodeURIComponent(name) + '&secret=' + FA.base32Encode(key); };
FA.parseUrl=function(str){
    var v=str.split("//")[1].split("/");
    var h={type:v[0],account:decodeURIComponent(v[1].split("?")[0])};
    v[1].split("?")[1].split("&").forEach(e=>{
        var d=e.split("=");
        if(d[0]=="secret"){
            h["secret"]=d[1]
        }else{
            h[d[0]]=decodeURIComponent(d[1])
        }
    })
    return h;
}
FA.parse=function(str,w={}){
    console.log(str);
    var f=FA.parseUrl(str);
    var t=Math.floor(Date.now() / 1000 /30);
    return {type:f.type,secret:f.secret,account:f.account,issuer:f.issuer,time:t,code:FA.generateCode(f.secret,t,w)}
}

console.log(FA.parse("otpauth://totp/GitHub:Sife-shuo?secret=LMBEH7[...]FT2G&issuer=GitHub",{length:8}))