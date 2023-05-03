const downloadButton = document.getElementById('dwButton')
downloadButton.addEventListener('click', downloadImages)

function downloadImages() {
    var images = document.querySelectorAll('.image-container img')
    for (var i=0; i<images.length;i++) {
        var link = document.createElement('a')
        link.href=images[i].src;
        link.download=`image(${i+1})`; // Added a name to the downloaded image using the variable i, so each image will have a unique name.
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link) //Below line can also be used.
        // link.remove()
    }
}
