const form = document.querySelector(".wishlist-form");
const detailTitle = document.querySelector("#details-title");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let destination = document.querySelector("#name").value;
  let location = document.querySelector("#location").value;
  let photo = document.querySelector("#photo").value;
  let description = document.querySelector("#description").value;

  addCard(destination, location, photo, description);

  detailTitle.textContent = "My WishList";

  form.reset();
});

let addCard = (destinationName, locationName, photoURL, descriptionName) => {
  let card = {
    destination: destinationName,
    location: locationName,
    photo: {
      url:
        photoURL ||
        "https://me.ahasayen.com/wp-content/uploads/2017/06/Travel-safety-tips-21.jpg",
    },
    description: descriptionName,
  };

  const cardElement = createCardElement(card);
  const wishlistContainer = document.querySelector(".wishlist-container");
  wishlistContainer.appendChild(cardElement);
};

let createCardElement = (card) => {
  const cardElement = document.createElement("div");
  cardElement.className = "card";

  const cardImage = document.createElement("img");
  cardImage.src = card.photo.url;
  cardElement.appendChild(cardImage);

  const cardContent = document.createElement("div");
  cardContent.className = "card-content";

  const cardDestination = document.createElement("h4");
  cardDestination.innerText = card.destination;
  cardContent.appendChild(cardDestination);

  const cardLocation = document.createElement("p");
  cardLocation.innerText = card.location;
  cardContent.appendChild(cardLocation);

  const cardDescription = document.createElement("p");
  cardDescription.innerText = card.description;
  cardContent.appendChild(cardDescription);

  const cardEdit = document.createElement("button");
  cardEdit.innerText = "Edit";
  cardEdit.className = "edit-button";
  cardContent.appendChild(cardEdit);

  const cardRemoval = document.createElement("button");
  cardRemoval.innerText = "Remove";
  cardRemoval.className = "remove-button";
  cardContent.appendChild(cardRemoval);

  cardElement.appendChild(cardContent);

  cardRemoval.addEventListener("click", () => {
    cardElement.remove();
  });

  cardEdit.addEventListener("click", () => {
    const newDestination = window.prompt("Enter new name");
    const newLocation = window.prompt("Enter a new location");
    const newPhoto = window.prompt("Enter new photo URL");

    if (newDestination !== "" && newDestination !== null) {
      cardDestination.innerText = newDestination;
    }

    if (newLocation !== "" && newLocation !== null) {
      cardLocation.innerText = newLocation;
    }

    if (newPhoto !== "" && newPhoto !== null) {
      cardImage.src = newPhoto;
    } else {
      cardImage.src = card.photo.url;
    }
  });

  return cardElement;
}