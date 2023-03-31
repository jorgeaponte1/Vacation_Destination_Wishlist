const form = document.querySelector(".wishlist-form");
const detailTitle = document.querySelector("#details-title");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let destination = document.querySelector("#name").value;
  let location = document.querySelector("#location").value;
  let photo = document.querySelector("#photo").value;
  let description = document.querySelector("#description").value;

  await addCard(destination, location, photo, description);

  detailTitle.textContent = "My WishList";

  form.reset();
});

let getAPICall = async () => {
  let apiKey = "2Fc17Cyoax-nMrPFLNCK_8g889D143mcpT2K2fVCeGI";
  let query =
    document.querySelector("#name").value +
    " " +
    document.querySelector("#location").value;
  console.log(query);
  let apiUrl = `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&client_id=${apiKey}`;

  try {
    let randomNumber = Math.floor(Math.random() * 10);
    return await fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let allImages = data.results[randomNumber];
        return allImages.urls.small;
      });
  } catch (error) {
    console.log("Image not found", error);
  }
};

let addCard = async (
  destinationName,
  locationName,
  photoURL,
  descriptionName
) => {
  let photoAPI;
  if (photoURL) {
    photoAPI = photoURL;
  } else {
    photoAPI = await getAPICall();
  }

  let card = {
    destination: destinationName,
    location: locationName,
    photo: photoAPI,
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
  cardImage.src = card.photo;
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

  const toggleEditMode = (edit) => {
    if (edit) {
      cardDestination.style.display = "none";
      cardLocation.style.display = "none";
      cardDescription.style.display = "none";

      const cardDestinationInput = document.createElement("input");
      cardDestinationInput.type = "text";
      cardDestinationInput.value = card.destination;
      cardDestinationInput.className = "card-destination-input";
      cardContent.appendChild(cardDestinationInput);

      const cardLocationInput = document.createElement("input");
      cardLocationInput.type = "text";
      cardLocationInput.value = card.location;
      cardLocationInput.className = "card-location-input";
      cardContent.appendChild(cardLocationInput);

      const cardDescriptionInput = document.createElement("textarea");
      cardDescriptionInput.maxLength = "250";
      cardDescriptionInput.value = card.description;
      cardDescriptionInput.style.resize = "vertical";
      cardDescriptionInput.style.maxHeight = "150px";
      cardDescriptionInput.style.width = "150px";
      cardDescriptionInput.className = "card-description-input";
      cardContent.appendChild(cardDescriptionInput);

      cardDestinationInput.addEventListener("change", () => {
        card.destination = cardDestinationInput.value;
      });

      cardLocationInput.addEventListener("change", () => {
        card.location = cardLocationInput.value;
      });

      cardDescriptionInput.addEventListener("change", () => {
        card.description = cardDescriptionInput.value;
      });
    } else {
      cardDestination.style.display = "block";
      cardLocation.style.display = "block";
      cardDescription.style.display = "block";

      cardDestination.innerText = card.destination;
      cardLocation.innerText = card.location;
      cardDescription.innerText = card.description;

      const cardDestinationInput = cardContent.querySelector(
        ".card-destination-input"
      );
      const cardLocationInput = cardContent.querySelector(
        ".card-location-input"
      );
      const cardDescriptionInput = cardContent.querySelector(
        ".card-description-input"
      );

      cardDestinationInput.remove();
      cardLocationInput.remove();
      cardDescriptionInput.remove();
    }
  };

  cardEdit.addEventListener("click", () => {
    const isInEditMode =
      cardContent.querySelector(".card-destination-input") !== null;
    toggleEditMode(!isInEditMode);
  });

  return cardElement;
};