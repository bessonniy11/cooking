import {Animation, AnimationController} from '@ionic/angular';

export const pageTransitionAnimation = (_: HTMLElement, opts: any): Animation => {

  // create root transition
  const rootTransition = new AnimationController()
    .create()
    .duration(opts.duration || 400)
    .easing('cubic-bezier(0.4, 0, 0.2, 1)');

  const enterTransition = new AnimationController().create().addElement(opts.enteringEl);
  const exitTransition = new AnimationController().create().addElement(opts.leavingEl);

  enterTransition.fromTo('opacity', '1', '1');
  exitTransition.fromTo('opacity', '1', '1');

  if (opts.direction === 'forward') {
    enterTransition.fromTo('opacity', '0', '1');
    exitTransition.fromTo('opacity', '1', '0');
  } else {
    enterTransition.fromTo('opacity', '0', '1');
    exitTransition.fromTo('opacity', '1', '0');
  }

  rootTransition.addAnimation([enterTransition, exitTransition]);
  return rootTransition;
};
