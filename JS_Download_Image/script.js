// const downloadLink = document.querySelector('.download-link');
// const imgSrc = document.querySelector('.dwImage').src;

// downloadLink.addEventListener('click', function() {
//   download(imgSrc);
// });

// function download(url) {
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = 'Your Image';
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

// select all image elements on the page
const images = document.querySelectorAll('img');

// attach a click event listener to each image element
images.forEach(image => {
  image.addEventListener('click', () => {
    // create a link element with the image source as the href
    const link = document.createElement('a');
    link.href = image.src;

    // set the link attributes for downloading
    link.setAttribute('download', '');
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');

    // create a download icon element and append it to the link element
    const icon = document.createElement('i');
    icon.classList.add('fa', 'fa-download', 'download-icon');
    link.appendChild(icon);

    // append the link element to the body and click it to start the download
    document.body.appendChild(link);
    link.click();

    // remove the link element from the body after the download is complete
    link.addEventListener('load', () => {
      document.body.removeChild(link);
    });
  });
});
