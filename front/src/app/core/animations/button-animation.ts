import {animate, style, state, transition} from "@angular/animations";


const opacityOptions = {
  timing: `150ms`,
  forward: style({opacity: 1}),
  backward: style({opacity: 0.6}),
};

const buttonOptions = {
  timing: `150ms`,
  brown_button: {
    forward: style({background: '#C09957'}),
    backward: style({background: '#B68A41'}),

  },
  white_button: {
    forward: style({background: '#FFF', color: "#C09957"}),
    backward: style({background: '#C09957', color: "#FFF"})
  },
  big_button: {
    forward: style({background: '#FFF'}),
    backward: style({background: '#F4F4F4'})
  }
};

export const opacityDefinition = [
  state('untapped', opacityOptions.forward),
  state('tapped', opacityOptions.backward),
  transition('untapped => tapped', [
    opacityOptions.forward,
    animate(opacityOptions.timing)
  ]),
  transition('tapped => untapped', [
    opacityOptions.backward,
    animate(opacityOptions.timing)
  ]),
]

export const brownButtonDefinition = [
  state('untapped', buttonOptions.brown_button.forward),
  state('tapped', buttonOptions.brown_button.backward),
  transition('untapped => tapped', [
    buttonOptions.brown_button.forward,
    animate(buttonOptions.timing)
  ]),
  transition('tapped => untapped', [
    buttonOptions.brown_button.backward,
    animate(buttonOptions.timing)
  ]),
]


export const whiteButtonDefinition = [
  state('untapped', buttonOptions.white_button.forward),
  state('tapped', buttonOptions.white_button.backward),
  transition('untapped => tapped', [
    buttonOptions.white_button.forward,
    animate(buttonOptions.timing)
  ]),
  transition('tapped => untapped', [
    buttonOptions.white_button.backward,
    animate(buttonOptions.timing)
  ]),
]


export const bigButtonDefinition = [
  state('untapped', buttonOptions.big_button.forward),
    state('tapped', buttonOptions.big_button.backward),
    transition('untapped => tapped', [
      buttonOptions.big_button.forward,
      animate(buttonOptions.timing)
    ]),
    transition('tapped => untapped', [
      buttonOptions.big_button.backward,
      animate(buttonOptions.timing)
    ]),
  ]
