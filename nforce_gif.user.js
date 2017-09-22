// ==UserScript==
// @name         NFOrce GIF
// @namespace    http://www.nfohump.com/
// @version      1.0.5
// @description  Show webms inline
// @author       https://github.com/SirPumpAction
// @match        http://*.nfohump.com/forum/viewtopic.php*
// @match        https://*.nfohump.com/forum/viewtopic.php*
// @downloadURL  https://github.com/SirPumpAction/nforce_gif/raw/master/nforce_gif.user.js
// @updateURL    https://github.com/SirPumpAction/nforce_gif/raw/master/nforce_gif.user.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==


(function() {
    'use strict';

    $('span.postbody a').each(function(i, link){
        try {
            var shorty;
            shorty = link.href.match(/gfycat\.com\/gifs\/detail\/(.*)/);
            if (!shorty)
                shorty = link.href.match(/fat\.gfycat\.com\/(.*)\./);
            if (!shorty)
                shorty = link.href.match(/gfycat\.com\/(.*)$/);
            shorty = shorty[1];
            var $video = $("<video>").attr({"loop":"", "muted":"", "playsinline":"", "preload":"", "poster":"https://thumbs.gfycat.com/" + shorty + "-small.gif", "width":"256", "style":"display: block;", "title":"CLICK: Play/Pause\nCTRL+CLICK: Enable/Disable controls"}).on('click', function(e){
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
            $video.append($("<source>").attr({"src":"https://giant.gfycat.com/" + shorty + ".mp4", "type":"video/mp4"}));
            $video.append($("<source>").attr({"src": "https://fat.gfycat.com/" + shorty + ".webm", "type": "video/webm"}));
            $video.append($("<source>").attr({"src":"https://thumbs.gfycat.com/" + shorty + "-mobile.mp4", "type":"video/mp4"}));
            $video.append($("<img>").attr({"src":"https://thumbs.gfycat.com/" + shorty + "-small.gif", "type":"video/webm"}));
            $(link).before($video,"Src: ");
        } catch(e){}
    });
})();
