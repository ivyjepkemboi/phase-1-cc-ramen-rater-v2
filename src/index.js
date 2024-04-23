
const handleClick = (ramen) => {
  const ramenDetail = document.getElementById('ramen-detail');
  ramenDetail.innerHTML = `
    <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
    <h2 class="name">${ramen.name}</h2>
    <h3 class="restaurant">${ramen.restaurant}</h3>
  `;
  document.getElementById('rating-display').textContent = ramen.rating;
  document.getElementById('comment-display').textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('new-name').value;
    const restaurant = document.getElementById('new-restaurant').value;
    const image = document.getElementById('new-image').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;

    const newRamen = {
      name,
      restaurant,
      image,
      rating,
      comment
    };

    // Add new ramen to the menu
    const ramenMenu = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = image;
    img.addEventListener('click', () => handleClick(newRamen));
    ramenMenu.appendChild(img);

    // Reset form fields
    form.reset();
  });
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => {
      const ramenMenu = document.getElementById('ramen-menu');
      data.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(img);
      });
    });
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
