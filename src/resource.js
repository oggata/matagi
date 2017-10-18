/*
ラッパ
http://dova-s.jp/bgm/play1238.html
発射
http://on-jin.com/sound/sen.php?bunr=%E5%A4%A7%E7%A0%B2&kate=%E6%AD%A6%E5%99%A8%EF%BC%88%E9%8A%83%E7%81%AB%E5%99%A8%EF%BC%89
*/

var res = {
    HelloWorld_png : "res/HelloWorld.png",
    BGM_001_mp3 : "res/bgm_maoudamashii_cyber41.mp3",
    SE_Rotate_mp3 : "res/se_maoudamashii_system45.mp3",
    SE_Complete_mp3 : "res/se_maoudamashii_system29.mp3",
    SE_Launch_mp3 : "res/rocket.mp3",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
