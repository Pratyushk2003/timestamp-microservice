const form = document.getElementById('timestamp-form');
const resultContainer = document.getElementById('result-container');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const dateInput = document.getElementById('date-input');
  const date = dateInput.value;

  axios.get(`/api/timestamp/${date}`)
    .then((response) => {
      const { unix, utc, error } = response.data;

      if (error) {
        resultContainer.innerHTML = `<p class="error">${error}</p>`;
      } else {
        resultContainer.innerHTML = `
          <p>Unix timestamp: ${unix}</p>
          <p>UTC: ${utc}</p>
        `;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
