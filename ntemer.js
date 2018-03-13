var active = true;

try {
    chrome.storage.sync.get({
        activate: true
    }, function (items) {
        active = items.activate;
        if (active) {
            main();
        }
        track(items.activate ? "true" : "false");
    });
} catch (e) {
    if (active) {
        main();
    }
    track("undefined");
}

function main() {
    (function ($) {

        var self = {
            nTemerImgs: [
				'https://c1.staticflickr.com/1/606/32928586800_81e87ed8a4_z.jpg',
			    'https://c1.staticflickr.com/1/625/32617463424_33174ac3e6_c.jpg',
			    'https://c1.staticflickr.com/3/2868/32928592690_3b35db0d7a_n.jpg',
			    'https://c1.staticflickr.com/3/2877/32617454974_d949d8de37_b.jpg',
			    'https://c1.staticflickr.com/1/604/33077589930_c180d10e3f_n.jpg',
			    'https://c1.staticflickr.com/4/3785/32646541803_321aa45e80.jpg',
			    'https://c1.staticflickr.com/4/3729/33077593010_96831f6818_n.jpg',
			    'https://c1.staticflickr.com/6/5690/30263984365_ce15c224f2_h.jpg',
			    'https://c1.staticflickr.com/6/5681/31082653871_42d6aa6459_h.jpg',
			    'https://c1.staticflickr.com/6/5516/31082659141_0f7764d34d_h.jpg',
			    'https://c1.staticflickr.com/9/8767/28318922044_dedaea2266_b.jpg',
			    'https://c1.staticflickr.com/9/8659/29194588326_26bf1b1707.jpg',
			    'https://c1.staticflickr.com/9/8527/29598235711_dc04f0cc44.jpg',
			    'https://media1.giphy.com/media/3o6nUP3bhEatNnsSac/giphy.gif',
			    'https://c1.staticflickr.com/9/8465/28607907613_c51e81c313_c.jpg',
			    'https://o.aolcdn.com/images/dims3/GLOB/crop/3000x1500+0+80/resize/630x315!/format/jpg/quality/85/http%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F395ddefe3ea42bcdde861a9f0483de37%2F206143097%2Ftemer%2Bvampiro.jpg',
			    'https://i.ytimg.com/vi/hQyCph9c9FA/maxresdefault.jpg',
    			'https://abrilveja.files.wordpress.com/2018/02/brasil-carnaval-rio-paraiso-do-tuiuti-vampiro-20180218-001.jpg',
			    'https://c1.staticflickr.com/6/5816/31082657541_5a8b313da3_h.jpg',
			    'https://media2.giphy.com/media/3o7bu0vggGPCQ2mZtm/giphy.gif',
            ],

			//obtem todas as imagens da pagina
            handleImages: function (lstImgs, time) {
                $.each($('img'), function (i, item) {
					//pula se imagem do temer ja foi carregada
                    if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                        var h = $(item).height();
                        var w = $(item).width();

                        //imagem realmente carregada
                        if (h > 0 && w > 0) {
                            self.handleImg(item, lstImgs);
                        }
                        else {
                            //modifica imagem depois de carregada
                            $(item).load(function () {
                                //prevencao de loop infinito
                                if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                                    self.handleImg(item, lstImgs);
                                }
                            });
                        }
                    }
                });

                //mantem o script trocando de imagem
                if (time > 0) {
                    setTimeout(function () { self.handleImages(lstImgs, time); }, time);
                }
            },
            //Substitui imagem
            handleImg: function (item, lstImgs) {
                $(item).error(function () {
                    //trata erro 
                    self.handleBrokenImg(item, lstImgs);
                });

                self.setRandomImg(item, lstImgs);
            },
			//seta imagem randomicamente
            setRandomImg: function (item, lstImgs) {
                var h = $(item).height();
                var w = $(item).width();
                $(item).css('width', w + 'px').css('height', h + 'px');
                $(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
			},
			
			//Removed broken image from lstImgs, run handleImg on item
            handleBrokenImg: function (item, lstImgs) {

                var brokenImg = $(item).attr('src');
                var index = lstImgs.indexOf(brokenImg);
                if (index > -1) {
                    lstImgs.splice(index, 1);
                }
                self.setRandomImg(item, lstImgs);
            },
        };

        //executa troca de imagens
        $(function () {

            self.handleImages(self.nTemerImgs, 3000);

        });
        $.nTemer = self;

    })(jQuery);
}