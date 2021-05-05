 
 $(window).on("load",function(){
 	/*------------ preloader------------*/
 	$(".preloader").fadeOut("slow");
 });

$(document).ready(function(){
	/*------------- navbar shrink ----------------*/
	$(window).on("scroll", function(){
		if($(this).scrollTop() > 90){
			$(".navbar").addClass("navbar-shrink");
		}
		else{
			$(".navbar").removeClass("navbar-shrink");
		}
	});
	/*------------- Video Popup ------------------*/
	const videoSrc = $('#player-1').attr("src");
	$(".video-play-btn, .video-popup").on("click", function(){
		if($(".video-popup").hasClass("open")){
			$(".video-popup").removeClass("open");
			$("#player-1").attr("src","");
		}
		else{
			$(".video-popup").addClass("open");
			if($("#player-1").attr("src") == ''){
				$("#player-1").attr("src",videoSrc);
			}
		}
	});

	/*-----------------Feature cauousel---------------*/
	$('.feature-carousel').owlCarousel({
	    loop:true,
	    margin:0,
	    autoplay:true,
	    responsiveClass:true,
	    responsive:{
	        0:{
	            items:1,

	        },
	        600:{
	            items:2,
	        },
	        1000:{
	            items:3,
	        }
	    }
	});

	/*-----------------Testimonial cauousel---------------*/
	$('.testimonials-carousel').owlCarousel({
	    loop:true,
	    margin:0,
	    autoplay:true,
	    responsiveClass:true,
	    responsive:{
	        0:{
	            items:1,

	        },
	        600:{
	            items:2,
	        },
	        1000:{
	            items:3,
	        }
	    }
	});

	/*----------------- Team cauousel---------------*/
	$('.team-carousel').owlCarousel({
	    loop:true,
	    margin:0,
	    autoplay:true,
	    responsiveClass:true,
	    responsive:{
	        0:{
	            items:1,

	        },
	        600:{
	            items:2,
	        },
	        1000:{
	            items:3,
	        }
	    }
	});
	/*------------------------ page Scrolling---------------*/
	$.scrollIt({
		topOffset: -50
	});

	/*----------------------- Navbar collage ---------------*/
	$(".nav-link").on("click", function(){
		$(".navbar-collapse").collapse("hide");
	});

	/*---------- Toggle Theme - Light & Dark Mode------------*/
	function toggleTheme(){
		if(localStorage.getItem("Dome-theme") !== null){
			if(localStorage.getItem("Dome-theme") === "dark"){
				$("body").addClass("dark");
			}
			else{
				$("body").removeClass("dark");
			}
		}
		updateIcon();
	}
	toggleTheme();
	$(".toggle-theme i").on("click", function(){
		$("body").toggleClass("dark");
		if($("body").hasClass("dark")){
			localStorage.setItem("Dome-theme","dark");
		}
		else{
			localStorage.setItem("Dome-theme","light");
		}
		updateIcon();
	});
	function updateIcon(){
		if($("body").hasClass("dark")){
			$(".toggle-theme i").removeClass("fa-moon");
			$(".toggle-theme i").addClass("fa-sun");
		}
		else{
			$(".toggle-theme i").removeClass("fa-sun");
			$(".toggle-theme i").addClass("fa-moon");
		}
	}
});






/* Open when someone clicks on the span element */
function open_l_Nav() {
    document.getElementById("myNav").style.width = "100%";
    // document.getElementsByClassName("login").style.width = "100%";
  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function close_l_Nav() {
    document.getElementById("myNav").style.width = "0%";
  }

/* Open when someone clicks on the span element */
function open_s_Nav() {
    document.getElementById("my_s_Nav").style.width = "100%";
  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function close_s_Nav() {
    document.getElementById("my_s_Nav").style.width = "0%";
  }


















