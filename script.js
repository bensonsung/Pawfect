function analyzeCar() {
  const fileInput = document.getElementById("formFile");
  const outputElement = document.getElementById("output");

  if (fileInput.files.length > 0) {
    const selectedFile = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    fetch(
      "https://cardiffrentiater-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/904e2c69-dc63-4fce-8be5-31590ec90398/classify/iterations/Iteration2/image",
      {
        method: "POST",
        body: formData,
        headers: {
          "Prediction-key": "e2ab89aeebe94f95be127caa527185be",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const predictions = data.predictions;

        if (predictions && predictions.length > 0) {
          const highestProbabilityTag = predictions.reduce((prev, current) => {
            return prev.probability > current.probability ? prev : current;
          });

          outputElement.textContent = `Predicted car type: ${highestProbabilityTag.tagName}`;
        } else {
          outputElement.textContent = "No predictions available";
        }
      })
      .catch((error) => {
        console.error("Error making API request:", error);
        outputElement.textContent = "Error making API request";
      });
  } else {
    alert("Please choose a file before submitting.");
  }
}
