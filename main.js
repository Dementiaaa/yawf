window.onload = function () {
  var lang_select = document.getElementById('lang_select');
  lang_select.onchange = function () {
    var lang = { 'zh-cn': 'zh-cn', 'zh-tw': 'zh-tw', 'zh-hk': 'zh-hk', 'en': 'en', }[lang_select.value];
    if (!lang) return;
    location.href = 'https://tiansh.github.io/yawf/' + lang + '.html';
  };
  var oddBrowser = false, ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('trident') !== -1) oddBrowser = true;
  if (ua.indexOf('like gecko') !== -1) oddBrowser = true;
  if (ua.indexOf('mozilla/5.0') === -1) oddBrowser = true;
  if (oddBrowser) document.getElementById('checkFx').style.display = 'block';
};
