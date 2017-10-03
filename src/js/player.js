
function Player(polymer, context) {

  this.context = context;
  this.source = null;

  this.props = {
    sounds: {
      cymbal: '../src/sounds/cymbal.wav',
      hihat:  '../src/sounds/hihat.wav',
      kick:   '../src/sounds/kick.wav',
      piano:  '../src/sounds/piano.wav',
      snare:  '../src/sounds/snare.wav',
      tom:    '../src/sounds/tom.wav'
    },
    scales: {
      'c':  0.262,
      'c#': 0.277,
      'd':  0.294,
      'd#': 0.311,
      'e':  0.330,
      'f':  0.349,
      'f#': 0.370,
      'g':  0.392,
      'g#': 0.415,
      'a':  0.440,
      'a#': 0.466,
      'b':  0.494
    },
    rests: ['r', '-']
  };

  this.props.melody = polymer.getAttribute('melody')
                             .replace(/\||\r|\n|\r\n/g, '')
                             .trim()
                             .split(/\s+/);

  this.props.sound = polymer.getAttribute('sound') || 'piano';

  const repeat = polymer.getAttribute('repeat') || 1;
  this.props.repeat = parseInt(repeat, 10);

  const tempo = polymer.getAttribute('tempo')  || 100;
  this.props.tempo = parseInt(tempo, 10);
}

Player.prototype.validate = function() {

  if (!this.props.melody) {
    throw new error('melody is required');
  }

  let code, scale, octave, tmp;

  for (let i = 0, max = this.props.melody.length; i < max; i++) {

    code = this.props.melody[i].toLowerCase();

    if (this.props.rests.indexOf(code) !== -1) {
      continue;
    }

    tmp = code.split(/([0-9]+)/);

    scale  = tmp[0] ? tmp[0] : false;
    octave = tmp[1] ? tmp[1] : false;

    if (!this.props.scales.hasOwnProperty(scale)) {
      throw new Error('scale error: ' + scale);
    }
    if (!octave.match(/[0-9+]/)) {
      throw new Error('octave error: ' + octave);
    }
  }
  if (!(this.props.sound in this.props.sounds)) {
    throw new Error('sound not found: ' + this.props.sound);
  }
  if (isNaN(this.props.repeat)) {
    throw new Error('repeat is not number: ' + this.props.repeat);
  }
  if (isNaN(this.props.tempo)) {
    throw new Error('tempo is not number: ' + this.props.tempo);
  }
};

Player.prototype.play = function(buffer, time, bpm, code) {

  this.source = this.context.createBufferSource();
  this.source.buffer = buffer;
  this.source.connect(this.context.destination);

  const tmp = code.toLowerCase().split(/([0-9]+)/);

  const scale  = tmp[0];
  const octave = tmp[1];

  this.source.playbackRate.value = this.props.scales[scale] * octave;
  this.source.start(time);
}

Player.prototype.stop = function() {
  this.context.close().then(function() {
    console.log('close')
  })
}
