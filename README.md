# &lt;x-play&gt;

:musical_score: :notes: :musical_note: :musical_keyboard: :violin: :saxophone: :trumpet: :guitar:

## DEMO

[x-play](https://hikarock.github.io/x-play/)

## Get Started

```
% npm start
```

```
% open http://127.0.0.1:8080/
```

## Examples

Piano 1

```html
<x-play sound="piano" tempo="80" repeat="1" melody="d2 e2 c2 c1 g1"></x-play>
```

Piano 2

```html
<x-play sound="piano" tempo="200" repeat="2"
  melody="| g3 e3 e3  - | f3 d3 d3  - | c3 d3 e3 f3 | g3 g3 g3  - |
          | g3 e3 e3 e3 | f3 d3 d3 d3 | c3 e3 g3 g3 | e3 e3 e3  - |
          | d3 d3 d3 d3 | d3 e3 f3  - | e3 e3 e3 e3 | e3 f3 g3  - |
          | g3 e3 e3 e3 | f3 d3 d3 d3 | c3 e3 g3 g3 | e3 e3 e3  - |"></x-play>
```

Drum

```html
<x-play sound="snare" tempo="100" repeat="2" melody="-  c4  - c4  - c4  - c4"></x-play>
<x-play sound="kick"  tempo="100" repeat="2" melody="c4 c4 c4 c4 c4 c4 c4 c4"></x-play>
```

## Props

- melody (require)
  - `scale[octave]`
- sound (default: "piano")
  - "cymbal"
  - "hihat"
  - "kick"
  - "piano"
  - "snare"
  - "tom"
- tempo (default: "100")
- repeat (default: "1")

## Thanks!

[全曲無料・フリー音楽素材/魔王魂](http://maoudamashii.jokersounds.com/)

## Licence

MIT

## Author

[hikarock](https://hika69.com)
