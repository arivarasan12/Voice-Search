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



if ("webkitSpeechRecognition" in window) {
  const speechRecognition = new webkitSpeechRecognition();

  let final_transcript = "";


  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;

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
  
    let interim_transcript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      
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
