// select all image elements on the page
const images = document.querySelectorAll('img');
// const dwIcon = document.querySelector('.download-icon')

// attach a click event listener to each image element
images.forEach(image => {
  image.addEventListener("dblclick", () => {
    const link = document.createElement('a'); // created a link element with the image source as the href
    link.href = image.src;

    // set the link attributes for downloading
    link.setAttribute('download', '');
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');

    link.click();
  });
});


// This JavaScript code adds a double-click event listener to each image in an array 
// of images (`images`). When an image is double-clicked, the code creates a new `<a>` 
// element and sets its `href` attribute to the source (`src`) of the double-clicked 
// image. This creates a hyperlink to the image.

// The code then sets several attributes on the `<a>` element to enable downloading of 
// the image. The `download` attribute is set to an empty string to indicate that the 
// file should be downloaded instead of opened in the browser. The `target` attribute 
// is set to `_blank` to open the download link in a new tab. The `rel` attribute is 
// set to `noopener noreferrer` for security reasons.

// Finally, the code programmatically clicks the `<a>` element using the `click()` 
// method, which triggers the download of the image. This allows the user to download 
// the image when they double-click on it.

// Overall, this code adds a useful feature to a webpage that allows users to easily 
// download images by double-clicking on them.
