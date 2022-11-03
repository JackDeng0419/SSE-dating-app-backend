const Buffer = require('Buffer');
const crypto = require('crypto');
const { generateKeyPairSync } = require('crypto');
const RSA_decrypt = function(ciphertext, privatekey) {
  const key = Buffer.from(privatekey, 'utf8');
  const text = Buffer.from(ciphertext, 'base64');
  return crypto.privateDecrypt({ key, padding: crypto.constants.RSA_PKCS1_PADDING }, text);
};
const AES_decrypt = function(key, iv, ciphertext) {
  try {
    const new_ciphertext = Buffer.from(ciphertext, 'base64');
    if (ciphertext === new_ciphertext) alert(1);
    const cipher = crypto.createDecipheriv('aes-128-gcm', key, iv);
    const msg = cipher.update(
      new_ciphertext.slice(12, new_ciphertext.length - 16)
    );
    return msg.toString('utf8');
  } catch (e) {
    console.log('Decrypt is error', e);
    return null;
  }
};
const AES_encrypt = function(key, iv, plaintext) {
  try {
    const cipher = crypto.createCipheriv('aes-128-gcm', key, iv);
    let enc = cipher.update(plaintext, 'utf8', 'hex');
    enc += cipher.final('hex');
    const tags = cipher.getAuthTag();
    enc = Buffer.from(enc, 'hex');
    const totalLength = iv.length + enc.length + tags.length;
    return Buffer.concat([ iv, enc, tags ], totalLength).toString('base64');
  } catch (e) {
    console.log('Encrypt is error', e);
    return null;
  }
};
module.exports = option => {
  return async function(ctx, next) {
    //ctx.session.user_info = undefined
    if (ctx.request.url === '/login/RSA') {
      const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 512,
        publicKeyEncoding: {
          type: 'pkcs1',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
      });
      ctx.session.private_key = privateKey;
      ctx.status = 200;
      ctx.body = {
        code: 200,
        message: 'return RSA public key',
        data: {
          public_key: publicKey,
        },
      };
    } else if (ctx.request.url === '/login/AES') {
      const private_key = ctx.session.private_key;
      ctx.status = 200;
      ctx.session.private_key = null;
      ctx.session.AES_key = RSA_decrypt(ctx.request.body.key, private_key).toString('base64');
      ctx.session.AES_iv = RSA_decrypt(ctx.request.body.iv, private_key).toString('base64');
      ctx.body = {
        code: 200,
        message: "get AES key",
        data:{
          _csrf: ctx.csrf
        }
      }
      const key = Buffer.from(ctx.session.AES_key, 'base64');
      const iv = Buffer.from(ctx.session.AES_iv, 'base64');
      ctx.body.data = AES_encrypt(key, iv, JSON.stringify(ctx.body.data));
    }
    else{
      if(ctx.session.AES_key===undefined){
        ctx.status = 400;
        ctx.body = {
          code: 400,
          message: "server have not AES key"
        }
      }
      else{
        if(ctx.request.body.hasOwnProperty("data")){
          const key = Buffer.from(ctx.session.AES_key, 'base64');
          const iv = Buffer.from(ctx.session.AES_iv, 'base64');
          try{
            const plaintext = AES_decrypt(key, iv, ctx.request.body.data);
            const result = JSON.parse(plaintext);
            const reg = /^[A-Za-z]_/;
            for(const dic_key in result){
              if(!reg.test(dic_key))continue
              result[key] = ctx.helper.escape(result[key])
              result[key] = ctx.helper.sjs(result[key])
              result[key] = ctx.helper.sjson(result[key])
              result[key] = ctx.helper.shtml(result[key])
            }
            ctx.request.body = result;
          }catch (e){
            ctx.throw(403, "AESkey")
          }
        }
        if (ctx.request.url === '/login/login'
            || ctx.request.url === '/login/verify'
            || ctx.request.url === '/login/code'
            || ctx.request.url === '/login/signup'
            || ctx.request.url === '/login/signup/code') {
          await next();
          if(ctx.body !== undefined){
            if (ctx.body.hasOwnProperty('data')) {
              const key = Buffer.from(ctx.session.AES_key, 'base64');
              const iv = Buffer.from(ctx.session.AES_iv, 'base64');
              ctx.body.data = AES_encrypt(key, iv, JSON.stringify(ctx.body.data));
            }
          }
        }
        else if (ctx.request.url === '/login/status') {
          if (ctx.session.user_info === undefined) {
            ctx.status = 200;
            ctx.body = {
              code: 400,
              message: 'locked down or logged out, please re-login',
            };
          }
          else {
            if (ctx.session.user_info.login_status === '0') {
              ctx.status = 200;
              ctx.body = {
                code: 400,
                message: 'locked down or logged out, please re-login',
              };
            } else {
              ctx.status = 200;
              ctx.msg = 'have already logged in';
              const key = Buffer.from(ctx.session.AES_key, 'base64');
              const iv = Buffer.from(ctx.session.AES_iv, 'base64');
              const return_data = {_uid:ctx.session.user_info._uid, username:ctx.session.user_info.username}
              ctx.body = {
                code: 200,
                message: 'have already logged in',
                data: AES_encrypt(key, iv, JSON.stringify(return_data)),
              };
            }
          }
        }
        else {
          if (ctx.session.user_info === undefined) {
            ctx.status = 200;
            ctx.body = {
              code: 400,
              message: 'locked down or logged out, please re-login',
            };
          } else {
            if (ctx.session.user_info.login_status === '0') {
              ctx.status = 200;
              ctx.body = {
                code: 400,
                message: 'locked down or logged out, please re-login',
              };
            } else {
              await next();
              if(ctx.body !== undefined){
                if (ctx.body.hasOwnProperty('data')) {
                  const key = Buffer.from(ctx.session.AES_key, 'base64');
                  const iv = Buffer.from(ctx.session.AES_iv, 'base64');
                  ctx.body.data = AES_encrypt(key, iv, JSON.stringify(ctx.body.data));
                }
              }
            }
          }
        }
      }
    }
  }
};
