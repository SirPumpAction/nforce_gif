// ==UserScript==
// @name         NFOrce GIF
// @namespace    http://www.nfohump.com/
// @connect      gfycat.com
// @version      1.0.6
// @description  Show webms inline
// @author       https://github.com/SirPumpAction
// @match        http://*.nfohump.com/forum/viewtopic.php*
// @match        https://*.nfohump.com/forum/viewtopic.php*
// @downloadURL  https://github.com/SirPumpAction/nforce_gif/raw/master/nforce_gif.user.js
// @updateURL    https://github.com/SirPumpAction/nforce_gif/raw/master/nforce_gif.user.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==


$('a[href*="gfycat.com"]').each(function(i, link){
    GM_xmlhttpRequest({
        method: "GET",
        url: link.href,
        onload: function(response) {
            var $video = $(response.responseText).find('video');
            $video.removeAttr('height').attr({"loop":"", "muted":"", "playsinline":"", "preload":"", "width":"256", "style":"display: block;", "title":"CLICK: Play/Pause\nCTRL+CLICK: Enable/Disable controls"}).on('click', function(e){
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
            });
            $(link).after($video);
        }
    });
    $.get(link.href).done(function(page){console.log(page)})
});
