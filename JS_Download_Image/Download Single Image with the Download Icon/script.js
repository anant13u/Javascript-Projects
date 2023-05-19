const downloadButtons = document.querySelectorAll('.image-container-child')
// // downloadButton.addEventListener('click', downloadImage)

downloadButtons.forEach (button => {
    // button.addEventListener('click', () => {
    const ourImage = button.querySelector('img')
    const link = button.querySelector('a')
    link.addEventListener('click', ()=> {
        link.href=ourImage.src
        link.download=''
    })
})
    
//         link.href=ourImage.src;
//         link.download=''; // Added a name to the downloaded image using the variable i, so each image will have a unique name.
//         document.body.appendChild(link)
//         link.click()
//         document.body.removeChild(link) //Below line can also be used.
//         // link.remove()
//     })
// })

// // const zipDownloadButton = document.getElementById('zipdwButton')
