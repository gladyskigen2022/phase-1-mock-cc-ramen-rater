// Ramen Rater - Ramen rating platform
window.addEventListener('DOMContentLoaded', e => {
    console.log('DOM fully loaded')

    // fetch ramen data from server 
    const fetchRamen = () => {
    fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(ramenData => {
       ramenData.forEach(newRamen)
    })
    }
    fetchRamen()
// rem console.log
    const ramenMenu = document.querySelector("div#ramen-menu")
    const ramenForm = document.querySelector("form#new-ramen")
    const displayRamen = document.querySelector("img.detail-image")
    const ramenName = document.querySelector("h2.name")//h2 linked to html file
    const restaurantName = document.querySelector("h3.restaurant")//html
    const displayRating = document.querySelector("span#rating-display")
    const commentDisplay = document.querySelector("p#comment-display")
   
    ramenForm.addEventListener("submit", e => {
        e.preventDefault()
        const nameInput = document.querySelector("input#new-name").value
        const restaurantInput = document.querySelector("input#new-restaurant").value
        const imgInput = document.querySelector("input#new-image").value
        const ratingInput = document.querySelector("input#new-rating").value
        const commentInput = document.querySelector("textarea#new-comment").value
        
        const newRamenObject = {
            name: nameInput,
            restaurant: restaurantInput,
            image: imgInput,
            rating: ratingInput,
            comment: commentInput
        }

        fetch("http://localhost:3000/ramens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRamenObject)
        })
        .then(response => response.json())
        .then(data => {
            const image = document.createElement("img")
            image.src = imgInput
            //console.log(data)
            ramenMenu.append(image)
        })
    })
    // adding new ramen data
    const newRamen = (ramen) => {
        const ramenImage = document.createElement("img")
        ramenImage.src = ramen.image
        //this event listener is added to the image to allow display on click
        ramenImage.addEventListener('click', e => {
            console.log(e.target)
            displayRamen.src = e.target.src
            ramenName.textContent = ramen.name
            restaurantName.textContent = ramen.restaurant
            displayRating.textContent = ramen.rating
            commentDisplay.textContent = ramen.comment
        })
        ramenMenu.append(ramenImage)
    }

})