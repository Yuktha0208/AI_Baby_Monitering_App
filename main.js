status="";
object=[];

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380);

    Object_Detector= ml5.objectDetector("cocossd",ModelLoaded);

    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function draw(){
    image(video,0,0,380,380);

    if(status != ""){
        Object_Detector.detect(video, gotResults);
        r=random(255);
        g=random(255);
        b=random(255);

        for(i=0;i< object.length; i++){
          document.getElementById("number_of_objects").innerHTML="Number Of Objects Detected Are: " + object.length;
          document.getElementById("status").innerHTML="Status: Object Detected";
          fill(r,g,b);
          percent=floor(object[i].confidence * 100);
          text(object[i].label + " " + percent + "%",object[i].x,object[i].y);
          noFill();
          stroke(r,g,b);
          rect(object[i].x , object[i].y , object[i].width , object[i].height);
        }
    }
    
}

function ModelLoaded(){
    console.log("Model Loaded");
    status= true;
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object=results;
}