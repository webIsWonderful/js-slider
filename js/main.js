'use strick';
	
var comingUpFilms;
var slides;
var slidesWrapper = document.querySelector('#slides-wrapper');

var moviesUrl = "https://api.themoviedb.org/3/movie/upcoming";
var apiKey = "8cc0fa265b6cd094327ec95fb27f63f8";
var httpRequest = new XMLHttpRequest();

//create and send an XHR request.
httpRequest.onreadystatechange = function(){
	if((httpRequest.readyState === 4) && (httpRequest.status === 200)){
			
		comingUpFilms = JSON.parse(httpRequest.responseText);		
						
		displayData();	
		
		slideShow();			
			
	}else{
		console.log(statusText);
	}// End readyState.
};// End onreadystatechange.
		
httpRequest.open('GET', moviesUrl + '?api_key=' + apiKey);					
httpRequest.send();

// Define limited numbers of words in 'Drescription'.
function cutString(str){
	var numWords = 50; // Set Maximum words	to be displayed.		
	var words = str.split(' ');
	if(words.length > numWords){					
		var words = words.splice(0, numWords);	
		return words.join(' ') + '...';	
	}else{
		return str;
	}			
};

// Display incoming data.
function displayData(){		
	var output = '';
	var val = comingUpFilms.results;			
	for(var i = 0; i < comingUpFilms.results.length; i++){
		output += '<li><h2>' + comingUpFilms.results[i].title + '</h2>';
			
		// Replace missing image with a custom fixed one.
		if(comingUpFilms.results[i].backdrop_path === null){
			output += '<img src="../images/no-img.jpg" alt="Replaced image" />';
		}else{	
			output += '<img src="https://image.tmdb.org/t/p/w600' + comingUpFilms.results[i].backdrop_path + '"' +' alt="' + '" ' + comingUpFilms.results[i].title + '"' + ' />';
		}
				
		output +='<p class="description">' + cutString(comingUpFilms.results[i].overview) + '</p>'					  	
			+'<div class="star-rating-vote">'
			+'<div class="star-rating">'+'<p class="stars" style="width:' + (comingUpFilms.results[i].vote_average * 6.5) + '%;' +'"></p>'+'<span class="vote-note">'+ comingUpFilms.results[i].vote_average + ' / 10</span></div>' 
			+'</li>';		
	}								
	slidesWrapper.innerHTML = output;
}

// Slider.
function slideShow(){		
	var allSlideItem = document.querySelectorAll('#slides-wrapper li');	
	var currentSlide = 0; // Keeping track of the current slide.
	var next = document.querySelector('#next');
	var previous = document.querySelector('#previous');	
	var dots = document.getElementsByClassName("dot"); // Bottom circles pagination.
			
	for (var i = 0; i < allSlideItem.length; i++) {
		slides = allSlideItem[i].className += 'slide';
	}			
	
	slidesWrapper.firstChild.className += " showing";			
	slides = document.querySelectorAll('#slides-wrapper .slide'); //Getting all the slides from the #slides-container.	
				
	function goToSlide(n){
		slides[currentSlide].className = 'slide'; // Changing the current slide's class so it wouldn't show.
		currentSlide = (n+slides.length)%allSlideItem.length; // Getting the next slide by adding 1 to the current slide.
		slides[currentSlide].className = 'slide showing'; // Changing the next slide's class so that the slide is showing.	
				
		for ( var i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(" active", "");
		}				
		
		dots[currentSlide].className += " active";
	}	
		
	function nextSlide(){
		goToSlide(currentSlide+1);
	}
	
	function previousSlide(){
		goToSlide(currentSlide-1);
	}

	next.onclick = function(){
		nextSlide();
	};

	previous.onclick = function(){
		previousSlide();
	};
			
	// Bottom dot pagination.	
	var indicatorContainer = document.querySelector('#indicators');
	var indicators = '';
	
	for(var i=0; i < slides.length; i++){
		indicators +='<span class="dot"></span>';
	}			
	
	indicatorContainer.innerHTML = indicators;
	indicatorContainer.firstChild.className += " active";
	var indicator = indicatorContainer.querySelectorAll('span');
				
	for(var i = 0; i < indicator.length; i++){					
		indicator[i].onclick = (function(n){						
			return function(){
				goToSlide(n);							
			};
		})(i);
	}
}