let userAgent = navigator.userAgent;


function allowBrowser() {
    if (/line/i.test(navigator.userAgent.toLowerCase())) {
        return false;
    } else {
        return true;
    }
}
let redirect = !allowBrowser();

if (/iPhone|iPad/i.test(userAgent) && redirect) {
    location.href = "googlechromes://www.pts.org.tw/";
}
if (/Android/i.test(userAgent) && redirect) {
    location.href = "intent:https://www.pts.org.tw#Intent;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;component=com.android.browser/com.android.browser.BrowserActivity;end";                             
}

(function($){
  $(function(){

    $('.sidenav').sidenav();


    $("#slide-list").owlCarousel({
      loop: true,
      items: 1,
      margin: 0,
      autoplay: true,
      dots:true,
      nav:true,
      autoplayTimeout: 8500,
      smartSpeed: 450,     
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 2;stroke: #FF0086;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 2;stroke: #FF0086;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
      navElement: 'div',

    });
    $("#topnews-list").owlCarousel({
      loop: true,
      items: 1,
      margin: 0,
      autoplay: false,
      dots:false,
      nav:true,
      autoplayTimeout: 9500,
      smartSpeed: 450,
      animateOut: 'bounceOutRight',
      animateIn: 'bounceInLeft',
      navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 2;stroke: #FF0086;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 2;stroke: #FF0086;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
      navElement: 'div',

    });
    
    $("#ptsplus-list").owlCarousel({
      loop:true,
      stagePadding: 50,
		  // slideBy:'page',
		  rewind:false,
      autoplayTimeout: 3000,
      smartSpeed:1000,
      // autoplay: true,
      dots:false,
      nav:true,
      autoplayHoverPause:true,
      navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 2;stroke: #FF0086;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 2;stroke: #FF0086;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
      navElement: 'div',
      responsive:{
        0:{
            items:2,
        },
        600:{
            items:3,
        },
        992:{
            items:4,
        }
      }
    });

    
    var getPlaying = function(channel){  
      
      $.ajax({
        url: 'https://about.pts.org.tw/utility/get_playing.php',
        type:"POST", 
        dataType: 'json',  
        cache: false,
        data:{ channel:channel},  
        success: function(response){  
            // // console.log(response);  
            $('.live').find('.'+channel).find('.now').find('.time').text('').slideUp( 300 ).delay( 800 );
            $('.live').find('.'+channel).find('.now').find('.show').text('').slideUp( 300 ).delay( 800 ); 
            $('.live').find('.'+channel).find('.next').find('.time').text('').slideUp( 300 ).delay( 800 ); 
            $('.live').find('.'+channel).find('.next').find('.show').text('').slideUp( 300 ).delay( 800 );   

            $('.live').find('.'+channel).find('.now').find('.time').text(response[0].time).slideDown( 400 );
            $('.live').find('.'+channel).find('.now').find('.show').text(response[0].show).slideDown( 400 ); 
            $('.live').find('.'+channel).find('.next').find('.time').text(response[1].time).slideDown( 400 ); 
            $('.live').find('.'+channel).find('.next').find('.show').text(response[1].show).slideDown( 400 );   

  

        },
        error: function (xhr) {
          console.log('Ooop!');
        }
      });   
    };

    var getAllPlaying = function(){    
      getPlaying('pts');
      getPlaying('pts2');
      getPlaying('pts3');
    };

    getAllPlaying();
    var playing = window.setInterval(getAllPlaying,600000);

    $('.clickevent').on('click touch', function (e) {
      e.preventDefault();

      let id = $(this).data("id");
      let category = $(this).data("cate");
      $.ajax({
        url: 'https://about.pts.org.tw/utility/set_banner_counter.php',
        type:"POST", 
        dataType: 'json',  
        cache: false,
        data:{ id:id,category:category},
      });
      window.open($(this).data("link"));


    });



  }); // end of document ready
})(jQuery); // end of jQuery name space
