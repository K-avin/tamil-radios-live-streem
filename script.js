// Mythium Archive: https://archive.org/details/mythium/

jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'download'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = 'https://stream.zeno.fm/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Sooriyan FM",
                "duration": "Live",
                "file": "7r87rbybwp8uv"
            }, {
                "track": 2,
                "name": "Karthigai FM",
                "duration": "Live",
                "file": "musszttd6zhvv"
            }, {
                "track": 2,
                "name": "Mellisai FM",
                "duration": "Live",
                "file": "e9hsbbbey4zuv"
            },{
                "track": 3,
                "name": "Yazh News 24/7",
                "duration": "Live",
                "file": "zek2rcdrua0uv"
            }, {
                "track": 4,
                "name": "Appuchi Radio",
                "duration": "Live",
                "file": "rs12w2pdt7zuv"
            },{
                "track": 5,
                "name": "East FM 102.7 Toronto",
                "duration": "Live",
                "file": "bshhtz6hanruv"
            },{
                "track": 5,
                "name": "Canadian Tamil Radio 3",
                "duration": "Live",
                "file": "xt4dhdwndq8uv"
            },{
                "track": 6,
                "name": "Raja FM",
                "duration": "Live",
                "file": "476bw00re5zuv"
            },{
                "track": 7,
                "name": "Yuvanism",
                "duration": "Live",
                "file": "kf9vspv80rhvv"
            },{
                "track": 8,
                "name": "Rajavin Thaalattu",
                "duration": "Live",
                "file": "ggauwkk4f78uv"
            },{
                "track": 9,
                "name": "Rahmania",
                "duration": "Live",
                "file": "s2g0qru80rhvv"
            },],
            buildPlaylist = $.each(tracks, function (key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});