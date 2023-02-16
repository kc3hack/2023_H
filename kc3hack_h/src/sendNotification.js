const fetch = require('node-fetch');

const url = 'https://fcm.googleapis.com/fcm/send';

const payload = {
  to: "eunm7ZtJ_6mYEmi3dmh34F:APA91bHLhhBldfQp-oj0Zr2TrPBIQlVtOqcpjJ7JZQgR2CbC5MRaAT7V42dTmBMXQBGhAFnEGu6lo5oCIvgilw5EnRmP4ycSYsmM8WaTBZi_dapOZS2v5ym_52V-B298onuGa186_CnN",
  notification: {
    title: '通知テスト',
    body: 'これはテストです',
  }
};

const opts = {
  method: 'post',
  headers: {
    Authorization: `key="AAAA79lGAsQ:APA91bElK8xh-Smd5uXNJ-QFiaQgWj-MnOFr6jubVJ3pKYYO9uqbU4i7LiAMSt9GkWEI1OIFP3FX7oyi9CSLN2XFmM6ecVxkEih6RYQgBLXus_m60c1JOGDLvkc2w35MBIFEuU9Q91eW"`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
};

fetch(url, opts)
  .then(res => console.log(res));