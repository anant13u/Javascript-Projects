// Select all elements with the class 'image-container-child' and store them in downloadButtons array
const downloadButtons = document.querySelectorAll('.image-container-child')

// Iterate over each element in the downloadButtons array
downloadButtons.forEach (button => {
    // Add an event listener to each button in the downloadButtons array
    button.addEventListener('click', () => {
        // Find the <img> element within the clicked button and store it in ourImage
        const ourImage = button.querySelector('img')
        // Create an <a> element to act as a download link
        const link = document.createElement('a')
        // Set the href attribute of the link to the source URL of the <img> element
        link.href=ourImage.src;

        link.download=''; // Set the download attribute of the link to an empty string
        document.body.appendChild(link) // Append the link to the document body

        link.click() // Programmatically trigger a click event on the link to initiate the download
        
        // Remove the link element from the document body after the download completes
        document.body.removeChild(link) //Below line can also be used.
        // link.remove()
    })
})

// const zipDownloadButton = document.getElementById('zipdwButton')
