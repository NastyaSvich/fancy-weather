document.getElementById('mic').addEventListener('click', () => {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  document.getElementById('mic').style.opacity = '1';

  recognition.onend = function off() {
    document.getElementById('mic').style.opacity = '.3';
  };

  recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');

    if (e.results[0].isFinal) {
      document.getElementById('search').value = transcript;
      document.getElementById('mic').style.opacity = '.3';
      ShowSelection();
    }
  });

  recognition.start();
}, false);
