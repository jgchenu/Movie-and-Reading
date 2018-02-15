function tostarsArray(stars) {
  let num = parseInt(stars.toString().substring(0, 1));
  let array = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}
function http(url, callBack) {
  wx.request({
    url: url,
    method: 'get',
    header: {
      "Content-type": "json"
    },
    success: res => {
      console.log(res.data);
      callBack(res.data);
    },
    fail: err => {

    }
  })
}
function toCastString(casts) {
  let castsjoin = [];
  castsjoin = casts.map(el => {
    return el.name + "/"
  });
  return castsjoin.join("").substring(0, castsjoin.join("").length - 2);
}
function toCastInfo(casts) {
  let castsArray = [];
  castsArray=casts.map(el => {
    return {
      img: el.avatars ? el.avatars.large : "",
      name: el.name
    }
  });
  return castsArray;
}
module.exports = {
  tostarsArray: tostarsArray,
  http: http,
  toCastString: toCastString,
  toCastInfo: toCastInfo
}