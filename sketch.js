//synth stuff
var osc0, osc1, osc2, osc3, osc4, osc5;
var env0, env1, env2, env3, env4, env5;
var decay = 0.3;
var del;
var dTime = 0.15;
var dFdbk = 0.3;

//scale - f#m pentatonic
var notes = [740.0, 659.3, 554.4, 494.9, 440.0, 370.0];
//seq stuff
var tick, tempo, step;
var numTracks = 6;
var track0 = [];
var track1 = [];
var track2 = [];
var track3 = [];
var track4 = [];
var track5 = [];

//seq graphics
var buttonW = 40;

function setup() {
  createCanvas(640, 240);
  
  translate(buttonW, buttonW);
	fill(255);
  
  backgroundColor = color(230);


 //make osc0 source
	osc0 = new p5.SinOsc();
	//connect
	osc0.amp(0);
	osc0.freq(notes[0]);
	osc0.start();

	//make env0
	env0 = new p5.Env(.005, .9, decay, 0);
	  
	//make osc1 source
	osc1 = new p5.SinOsc();
	//connect
	osc1.amp(0);
	osc1.freq(notes[1]);
	osc1.start();

	//make env1
	env1 = new p5.Env(.005, .9, decay, 0);

	//make osc2 source
	osc2 = new p5.SinOsc();
	//connect
	osc2.amp(0);
	osc2.freq(notes[2]);
	osc2.start();

	//make env2
	env2 = new p5.Env(.005, .9, decay, 0);

	//make osc3 source
	osc3 = new p5.SinOsc();
	//connect
	osc3.amp(0);
	osc3.freq(notes[3]);
	osc3.start();

	//make env3
	env3 = new p5.Env(.005, .9, decay, 0);

	//make osc4 source
	osc4 = new p5.SinOsc();
	//connect
	osc4.amp(0);
	osc4.freq(notes[4]);
	osc4.start();

	//make env4
	env4 = new p5.Env(.005, .9, decay, 0);

	//make osc5 source
	osc5 = new p5.SinOsc();
	//connect
	osc5.amp(0);
	osc5.freq(notes[5]);
	osc5.start();

	//make env5
	env5 = new p5.Env(.005, .9, decay, 0);
	
	//make delay
	//del = new p5.Delay();
	//del.process(osc0, dTime, dFdbk, 4000);
	////del.process(osc1, dTime, dFdbk, 4000);
	//del.process(osc2, dTime, dFdbk, 4000);
	//del.process(osc3, dTime, dFdbk, 4000);
	//del.process(osc4, dTime, dFdbk, 4000);
	//del.process(osc5, dTime, dFdbk, 4000);

  //work out sequencer tick rate
	//bpm/60 = beats/second
	//1 second = 60fps, so 60 fps/(beatsPerSecond) = frames per beat
	//i.e. frames per quarter note
	//half this = frames per eigth note
	//for 120 bpm:
	//120/60 = 2, 60fps/2 = 30, 30 / 2 = 15 frames per eight note
	//so:
	tempo = 180;
	tick = int((60/(tempo/60))/4);
	step = 0;
	
		//make seq arrays
	//this code is terrible
	for(var x = 0; x < 16; x++){
		track0[x] = 0;
		track1[x] = 0;
		track2[x] = 0;
		track3[x] = 0;
		track4[x] = 0;
		track5[x] = 0;
  }
}


function draw() {
  background(backgroundColor)
  
  if(frameCount % tick == 0){
    step = (step + 1) % 16;
    if (track0[step] == 1){
      playTone(0);
    }
    if (track1[step] == 1){
      playTone(1);
    }
    if (track2[step] == 1){
      playTone(2);
    }
    if (track3[step] == 1){
      playTone(3);
    }
    if (track4[step] == 1){
      playTone(4);
    }
    if (track5[step] == 1){
      playTone(5);
    }
  }
  
  for(var x = 0; x < 16; x++){
		seqBtn(x * buttonW, 0 * buttonW, buttonW, track0[x]);
		seqBtn(x * buttonW, 1 * buttonW, buttonW, track1[x]);
		seqBtn(x * buttonW, 2 * buttonW, buttonW, track2[x]);
		seqBtn(x * buttonW, 3 * buttonW, buttonW, track3[x]);
		seqBtn(x * buttonW, 4 * buttonW, buttonW, track4[x]);
		seqBtn(x * buttonW, 5 * buttonW, buttonW, track5[x]);
	}
	
	
function upDateSeq(x, y){
	switch(y){
		case 0:
			if(track0[x] == 1){
				track0[x] = 0;
			} else {
				track0[x] = 1;
			}
			break;

		case 1:
			if(track1[x] == 1){
				track1[x] = 0;
			} else {
				track1[x] = 1;
			}
			break;

		case 2:
			if(track2[x] == 1){
				track2[x] = 0;
			} else {
				track2[x] = 1;
			}
			break;

		case 3:
			if(track3[x] == 1){
				track3[x] = 0;
			} else {
				track3[x] = 1;
			}
			break;

		case 4:
			if(track4[x] == 1){
				track4[x] = 0;
			} else {
				track4[x] = 1;
			}
			break;

		case 5:
			if(track5[x] == 1){
				track5[x] = 0;
			} else {
				track5[x] = 1;
			}
			break;
	}
}	
  
  	drawPlayhead(step);
  	strokeWeight(2);
  	stroke(100);
	text("tempo: " + tempo, 0, (buttonW * 7) - 5);
}

function playTone(t){
	switch(t){
		case 0:
			env0.play(osc0);
			break;
		
		case 1:
			env1.play(osc1);
			break;
		
		case 2:
			env2.play(osc2);
			break;
		
		case 3:
			env3.play(osc3);
			break;

		case 4:
			env4.play(osc4);
			break;

		case 5:
			env5.play(osc5);
			break;
	}
}

  

function seqBtn(x, y, w, s){
	push();
		stroke(200);
		if(s == 1){
			fill(120);
		} else {
			noFill();
		}
		translate(x, y);
		rect(0, 0, w, w);
	pop();
}

function drawPlayhead(s){
	push();
		noStroke();
		fill(160, 200, 220, 100);
		translate(s*buttonW, 0);
		rect(0, 0, buttonW, buttonW * numTracks);
	pop();
}
  
function mouseClicked(){
	//if(mouseX > buttonW && mouseX < (buttonW * 17)){
  //if(mouseY > buttonW && mouseY < buttonW * 7){

			var clickedBtnX = int((mouseX) / buttonW);
			var clickedBtnY = int((mouseY) / buttonW);
			console.log(mouseX + ' ' + mouseY + ' ' + clickedBtnX + ' ' + clickedBtnY);
			upDateSeq(clickedBtnX, clickedBtnY);
		//}
	//}
}  
  
function upDateSeq(x, y){
	switch(y){
		case 0:
			if(track0[x] == 1){
				track0[x] = 0;
			} else {
				track0[x] = 1;
			}
			break;

		case 1:
			if(track1[x] == 1){
				track1[x] = 0;
			} else {
				track1[x] = 1;
			}
			break;

		case 2:
			if(track2[x] == 1){
				track2[x] = 0;
			} else {
				track2[x] = 1;
			}
			break;

		case 3:
			if(track3[x] == 1){
				track3[x] = 0;
			} else {
				track3[x] = 1;
			}
			break;

		case 4:
			if(track4[x] == 1){
				track4[x] = 0;
			} else {
				track4[x] = 1;
			}
			break;

		case 5:
			if(track5[x] == 1){
				track5[x] = 0;
			} else {
				track5[x] = 1;
			}
			break;
	}
}	  