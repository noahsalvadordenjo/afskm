import { style, trigger, animate, transition, state } from '@angular/animations';

export const transformFromAboveEnter = trigger('transformFromAboveEnterTrigger', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateY(-100%)'
        }), animate(500, style({
            opacity: 1,
            transform: 'translateY(0)'
        }))
    ])
]);
export const transformFromBelowEnter = trigger('transformFromBelowEnterTrigger', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateY(100%)'
        }), animate(500, style({
            opacity: 1,
            transform: 'translateY(0)'
        }))
    ])
]);
export const slide = trigger('slideTrigger', [
    state('in', style({
        transform: 'translateX(0)',
        opacity: 1,
    })),
    state('right', style({
        transform: 'translateX(100%)',
        opacity: 0
    })),
    state('left', style({
        transform: 'translateX(-100%)',
        opacity: 0
    })),
    transition('right <=> in', animate(500)),
    transition('left <=> in', animate(500))
]);
export const sizeEnter = trigger('sizeEnterTrigger', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'size(0.5)'
        }), animate(500, style({
            transform: 'size(1)',
            opacity: 1
        }))
    ])
]);
export const opacityLeave = trigger('opacityLeaveTrigger', [
    transition(':leave', [
        style({
            opacity: 1
        }), animate(500, style({
            opacity: 0
        }))
    ])
]);
export const transformToRightLeave = trigger('transformToRightLeaveTrigger', [
    transition(':leave', [
        style({
            opacity: 1,
            transform: 'translateX(0)'
        }), animate(500, style({
            opacity: 0,
            transform: 'translateX(100%)'
        }))
    ])
]);
export const transformToLeftLeave = trigger('transformToLeftLeaveTrigger', [
    transition(':leave', [
        style({
            opacity: 1,
            transform: 'translateX(0)'
        }), animate(500, style({
            opacity: 0,
            transform: 'translateX(-100%)'
        }))
    ])
]);
export const transformFromAboveState = trigger('transformFromAboveStateTrigger', [
    state('above', style({
        transform: 'translateY(-100%)'
    })),
    state('in', style({
        transform: 'translateY(0)'
    })),
    transition('above => in', animate(500))
])
export const opacityState = trigger('opacityStateTrigger', [
    state('in', style({
        opacity: 1
    })),
    state('out', style({
        opacity: 0
    })),
    transition('in => out', animate(500))
])