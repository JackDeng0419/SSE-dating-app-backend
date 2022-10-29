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
    // ctx.session.user_info = undefined
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
    } else if (ctx.request.url === '/login/login' || ctx.request.url === '/login/verify') {
      const key = Buffer.from(ctx.session.AES_key, 'base64');
      const iv = Buffer.from(ctx.session.AES_iv, 'base64');
      const plaintext = AES_decrypt(key, iv, ctx.request.body.data);
      console.log(JSON.parse(plaintext));
      ctx.request.body = JSON.parse(plaintext);
      await next();
      if (ctx.body.hasOwnProperty('data')) {
        ctx.body.data = AES_encrypt(key, iv, JSON.stringify(ctx.body.data));
      }
    } else if (ctx.request.url === '/login/status') {
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
          ctx.status = 200;
          ctx.msg = 'have already logged in';
          const key = Buffer.from(ctx.session.AES_key, 'base64');
          const iv = Buffer.from(ctx.session.AES_iv, 'base64');
          ctx.body = {
            code: 200,
            message: 'have already logged in',
            data: AES_encrypt(key, iv, JSON.stringify(ctx.session.user_info)),
          };
        }
      }
    } else {
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
          const key = Buffer.from(ctx.session.AES_key, 'base64');
          const iv = Buffer.from(ctx.session.AES_iv, 'base64');
          if (ctx.request.body && ctx.request.body.hasOwnProperty('data')) {
            const plaintext = AES_decrypt(key, iv, ctx.request.body.data);
            ctx.request.body = JSON.parse(plaintext);
          }
          await next();
          if (ctx.body && ctx.body.hasOwnProperty('data')) {
            ctx.body.data = AES_encrypt(key, iv, JSON.stringify(ctx.body.data));
          }
        }
      }
    }
    /* if(ctx.session.AES_key === undefined){
            ctx.status = 601
            ctx.message = "AES not exist"
            ctx.body = null
        }*/
    ctx.response.set('Access-Control-Allow-Origin', ctx.get('origin'));
    ctx.response.set('Access-Control-Allow-Credentials', 'true');
  };
};
