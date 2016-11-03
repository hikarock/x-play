
function Player(polymer, context) {

  this.context = context;

  this.props = {
    sounds: {
      cymbal: '/src/sounds/cymbal.wav',
      hihat:  '/src/sounds/hihat.wav',
      kick:   '/src/sounds/kick.wav',
      piano:  '/src/sounds/piano.wav',
      snare:  '/src/sounds/snare.wav',
      tom:    '/src/sounds/tom.wav'
    },
    durations: {
      w: 1,
      h: 2,
      q: 4,
      e: 8,
      s: 16,
      t: 32,
      x: 64,
      o: 128
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

  var melody = polymer.getAttribute('melody');
  melody = melody.replace(/\||\r|\n|\r\n/g, '').trim();
  this.props.melody = melody.split(/\s+/);

  this.props.sound = polymer.getAttribute('sound') || 'piano';

  var repeat = polymer.getAttribute('repeat') || 1;
  this.props.repeat = parseInt(repeat, 10);

  var tempo = polymer.getAttribute('tempo')  || 100;
  this.props.tempo = parseInt(tempo, 10);
}

Player.prototype.validate = function() {

  if (!this.props.melody) {
    throw new error('melody is required');
  }

  var code, scale, octave, duration, tmp, i, max;

  for (i = 0, max = this.props.melody.length; i < max; i++) {

    code = this.props.melody[i].toLowerCase();

    if (_.indexOf(this.props.rests, code) !== -1) {
      continue;
    }

    tmp = code.split(/([0-9]+)/);

    scale    = tmp[0] ? tmp[0] : false;
    octave   = tmp[1] ? tmp[1] : false;
    duration = tmp[2] ? tmp[2] : false;

    if (!_.has(this.props.scales, scale)) {
      throw new Error('scale error: ' + scale);
    }
    if (!octave.match(/[0-9+]/)) {
      throw new Error('octave error: ' + octave);
    }
    if (duration && !_.has(this.props.durations, duration)) {
      throw new Error('duration error: ' + duration);
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

  var octave, scale, duration, tmp, source;

  source = this.context.createBufferSource();
  source.buffer = buffer;
  source.connect(this.context.destination);

  tmp = code.toLowerCase().split(/([0-9]+)/);

  scale    = tmp[0];
  octave   = tmp[1];
  duration = tmp[2] ? this.props.durations[tmp[2]] : 1;

  source.playbackRate.value = this.props.scales[scale] * octave;
  source.start(time);
}
