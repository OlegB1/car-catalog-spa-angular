var index = 0;

var carusel = setInterval(function () {
    if (index==2) index=0;
    var images = new Array ('images/ban1.jpg', 'images/ban2.jpg');
    document.querySelector('#slide').style.display = 'none';
    document.querySelector('#slide').setAttribute('src', images[index]);
    document.querySelector('#slide').style.display = 'inline-block';
    index++;
},3000);
module.exports = carusel;
