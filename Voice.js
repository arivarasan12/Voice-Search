// Functions in this js file and element references are done using Pega 8.6
// Modify the references according to the Pega version.

function showStatus() {
  const speechStatusDiv = document.querySelector('[data-tour-id="speechStatus"]');
  const speechStatus = speechStatusDiv.querySelector('.field-item');
  speechStatus.innerHTML = "Listening..";
}

function hideStatus() {
  const speechStatusDiv = document.querySelector('[data-tour-id="speechStatus"]');
  const speechStatus = speechStatusDiv.querySelector('.field-item');
  speechStatus.innerHTML = "";
}

function setInterim(val) {
  const speechInterimDiv = document.querySelector('[data-tour-id="speechInterim"]');
  const speechStatus = speechInterimDiv.querySelector('.field-item');
  speechStatus.innerHTML = val;
}

function setFinal(val) {
  const pulseNote = document.querySelector('[data-tour-id="searchnode"]');
  const pulseNoteTA = document.querySelector('[data-test-id="2015070806333408619136"]');
  pulseNoteTA.value = val;
}


// Speech Recognition API
if ("webkitSpeechRecognition" in window) {
  const speechRecognition = new webkitSpeechRecognition();

  let final_transcript = "";

  // Speech Recognition properties
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;

  // Events
  speechRecognition.onstart = () => {
    //showStatus();
  };

  speechRecognition.onend = () => {
   // hideStatus();
  };

  speechRecognition.onError = (event) => {
    hideStatus();
    console.error(`Error - ${event.error}`);
  };

  speechRecognition.onresult = (event) => {
    // Create the interim transcript string locally because we don't want it to persist like final transcript
    let interim_transcript = "";

    // Loop through the results from the speech recognition object.
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      // If the result item is Final, add it to Final Transcript,
      // Else add it to Interim transcript
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }

    setFinal(final_transcript);
    setInterim(interim_transcript);
  };
  
  function startSpeech() {
    speechRecognition.start();
  }
  
  function stopSpeech() {
    speechRecognition.stop();
  }
  
  window.addEventListener("load", (e) => {
    document.querySelector('[data-tour-id="startSpeech"] button').onclick = () => {
    speechRecognition.start();
  };
  document.querySelector('[data-tour-id="stopSpeech"] button').onclick = () => {
    speechRecognition.stop();
  };
  });

}
//static-content-hash-trigger-GCC
