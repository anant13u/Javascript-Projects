const uploadButton = document.getElementById('upload-button')
const buttonContainer = document.getElementById('button-container')
const imagesContainer = document.getElementById('images-container');

imagesContainer.style.visibility='hidden'

buttonContainer.addEventListener('click', () => {
    uploadButton.click()
})

uploadButton.addEventListener('change', function(event) {
    const files = event.target.files; // Get the selected files
    
    // Create a new container for the uploaded images
    // const container = document.getElementById('image-container');
    imagesContainer.innerHTML=''
    // container.classList.add('image-container');
    
    // Loop through each selected file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Create a new container for the image and download link
      const container = document.createElement('div');
      container.classList.add('image-download-container');
      // container.style.display='flex'
      
      // Create a new image element
      const image = document.createElement('img');
      image.classList.add('downloadImage')
      // Set the image source to the uploaded file
      image.src = URL.createObjectURL(file);
      // Add the image to the container
      container.appendChild(image);

      // Create a download link for the image
      const downloadLink = document.createElement('a');
      downloadLink.classList.add('download-link')
      downloadLink.href = URL.createObjectURL(file);
      downloadLink.download=file.name
      // downloadLink.textContent = 'Download';
      
      const downloadIcon = document.createElement('i')
      downloadIcon.classList.add('fa')
      downloadIcon.classList.add('fa-download')
      console.log(downloadIcon)
      
      downloadLink.appendChild(downloadIcon)
      console.log(downloadLink)
      container.appendChild(downloadLink);
      console.log(container)

      imagesContainer.appendChild(container);
      imagesContainer.style.visibility='visible'
    }

    
    // Append the container to the document body or another desired location
    // document.body.appendChild(imageContainer);
  });



// const uploadButton = document.getElementById('upload-button');

// uploadButton.addEventListener('click', () => {
//   // Create a new file input element.
//   const fileInput = document.createElement('input');
//   fileInput.type = 'file';

//   // Add the file input element to the DOM.
//   document.body.appendChild(fileInput);

//   // When the file input element is changed, call the handleFileChange function.
//   fileInput.addEventListener('change', handleFileChange);
// });

// function handleFileChange(event) {
//   // Get the selected file.
//   const file = event.target.files[0];

//   // Create a new image element.
//   const image = document.createElement('img');

//   // Set the image's src to the selected file's path.
//   image.src = file.path;

//   // Add the image element to the new container.
//   const newContainer = document.getElementById('new-container');
//   newContainer.appendChild(image);
// }