(function() {
    function a() {
    if(navigator.platform.indexOf("Win32")!==-1||navigator.platform.indexOf("Win64")!==-1) {
    return"windows"}
if(/android/i.test(navigator.userAgent)) {
    return"android"}
if(/armv[6-7]l/.test(navigator.platform)) {
    return"android"}
if(navigator.platform.indexOf("Linux")!==-1) {
    return"linux"}
if(navigator.platform.indexOf("MacPPC")!==-1) {
    return"oldmac"}
if(/Mac OS X 10.[0-5]/.test(navigator.userAgent)) {
    return"oldmac"}
if(navigator.platform.indexOf("iPhone")!==-1||navigator.platform.indexOf("iPad")!==-1||navigator.platform.indexOf("iPod")!==-1) {
    return"ios"}
if(navigator.userAgent.indexOf("Mac OS X")!==-1) {
    return"osx"}
if(navigator.userAgent.indexOf("MSIE 5.2")!==-1) {
    return"oldmac"}
if(navigator.platform.indexOf("Mac")!==-1) {
    return"oldmac"}
return"other"}(function() {
    var b=document.documentElement;
    window.site= {
    platform: a();
}
;
    if(window.site.platform!=="windows") {
    b.className=b.className.replace("windows", window.site.platform);
}
b.className=b.className.replace(/\bno-js\b/, "js");
})();
})();
     
