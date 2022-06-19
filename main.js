function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  c = ml5.imageClassifier('MobileNet', modelLoaded);
}
function modelLoaded() {
  console.log('model has been initialized');
}
function draw() {
  image(video, 0, 0, canvas.width, canvas.height);
  c.classify(video, gotResult)
}
pr = ''
function gotResult(error, results) {
    if(error){
      console.error(error);
    }else{
      if((results[0].confidence > 0.5) && (pr != results[0].label)){
        console.log(results);
        pr = results[0].label;
        var synth = window.speechSynthesis;
        sd = 'Object detected is - '+results[0].label;
        var ut = new SpeechSynthesisUtterance(sd);
        synth.speak(ut);
        document.getElementById('result_object_name').innerHTML = results[0].label;
        per = results[0].confidence * 100;
        document.getElementById('result_object_accuracy').innerHTML = per.toFixed(2) + '%';
      }
    }
}