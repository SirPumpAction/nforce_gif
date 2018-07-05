// ==UserScript==
// @name         NFOrce GIF
// @namespace    http://www.nfohump.com/
// @connect      gfycat.com
// @version      1.0.9
// @description  Show Gfycat and imgur videos inline
// @author       https://github.com/SirPumpAction
// @match        http://*.nfohump.com/forum/viewtopic.php*
// @match        https://*.nfohump.com/forum/viewtopic.php*
// @downloadURL  https://github.com/SirPumpAction/nforce_gif/raw/master/nforce_gif.user.js
// @updateURL    https://github.com/SirPumpAction/nforce_gif/raw/master/nforce_gif.user.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
@keyframes rotating {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(-360deg) }
}

.ducky > span {
    display: inline-block;
    animation: rotating 2s linear infinite;
    color: transparent;
    text-shadow: 0 0 0 rgba(255,255,255,.5);
}`);

var templates = {
    'gfycat':'<video poster="https://thumbs.gfycat.com/XXX-poster.jpg" tabindex="-1"><source src="https://giant.gfycat.com/XXX.webm" type="video/webm"><source src="https://giant.gfycat.com/XXX.mp4" type="video/mp4"><source src="https://thumbs.gfycat.com/XXX-mobile.mp4" type="video/mp4"></video>',
    'imgur': '<video><source type="video/mp4" src="XXX"></video>'
};

var videoctrl = function(e){
    var target = e.target;
    if (!e.ctrlKey) {
        if (!target.playing) {
            target.playing = true;
            target.play();
            $(target).animate({
                "width": target.videoWidth
            }, 1000);
        } else {
            target.playing = false;
            $(target).animate({
                "width": "256px"
            }, 1000, function(){
                target.pause();
            });
        }
    } else {
        target.controls = !target.controls;
    }
};

var vidoptions = {"loop":"", "muted":"", "playsinline":"", "preload":"", "width":"256", "style":"display: block;", "title":"CLICK: Play/Pause\nCTRL+CLICK: Enable/Disable controls"};

$('a[href*="gfycat.com"]').each(function(i, link){
    if (!!link.href.match(/\/gifs\//)) {
        var $replacement = $("<div class='ducky'><span>🦆</span></div>");
        $(link).after($replacement);
        GM_xmlhttpRequest({
            method: "GET",
            url: link.href,
            onload: function(response) {
                var $video = $(response.responseText).find('video');
                $video.removeAttr('height').attr(vidoptions).on('click', videoctrl);
                $replacement.html($video);
            }
        });
    } else {
        var $video = $(templates.gfycat.replace(/XXX/gi, link.href.match(/gfycat.com\/(.*)/)[1]));
        $video.attr(vidoptions).on('click', videoctrl);
        $(link).after($video);
    }
});

$('a[href*="imgur.com"]').each(function(i, link){
    if (!!link.href.match(/\.gifv$/)) {
        var $video = $(templates.imgur.replace(/XXX/gi, link.href.match(/(.*)\.gifv$/)[1]+".mp4"));
        $video.attr(vidoptions).on('click', videoctrl);
        $(link).after($video);
    }
});
