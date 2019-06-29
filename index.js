// Register here https://unsplash.com/developers and create an app, and you will be able to get a key
// Once you have done that, you should be able to run it.
// the issue I am having is that the images aren't getting a height applied. If you see the console and see what im
// logging. You will notice that the height is 0 and the top and bottom are the same. 
//


const key = 'PLACE YOUR KEY IN HERE'; 
var form = document.getElementById('my-form');
var imageList = document.querySelector('#image-list');
const highlight = document.createElement('span');
imageList.append(highlight)
highlight.classList.add('highlight')

form.onsubmit = function(e) {
  e.preventDefault();
  let query = form.search.value;
  form.reset();
  call(query)
}

function call(query){     
  fetch(`https://api.unsplash.com/search/photos?client_id=${key}&query=${query}`)
    .then(res => res.json())
  .then(data => {
    data.results.forEach(images => {
        const img = document.createElement('img');
        imageList.append(img)
        img.src = images.urls.small;
        img.classList.add('image')
			function onLoad() {
				       const spans = Math.ceil(img.height / 10);
        img.style.gridRowEnd = `span ${spans}`
				spanFunc(img, spans)
			}
		    img.addEventListener('load', onLoad)
    })
  })
}
function spanFunc(img, coords, spans) {
	function highlightImg() {
		highlight.style.gridRowEnd = `span ${spans}`;
		highlight.style.height = `${coords.height}px`;
		highlight.style.transform  = `translate(${coords.left + window.scrollX}px, ${coords.left + window.scrollY}px)`
	}
  img.addEventListener('mouseenter', highlightImg)
}


