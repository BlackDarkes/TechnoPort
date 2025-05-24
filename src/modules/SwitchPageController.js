import { gsap } from "gsap";

class SwitchPageController {
  constructor(animationType = 'gentleFade') {
    this.animationType = animationType;
    this.init();
  }

  init() {
    // Плавное появление страницы
    gsap.from('main', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "expo.out"
    });
    
    document.addEventListener('click', (e) => this.handleClick(e));
  }

  handleClick(e) {
    const link = e.target.closest('a');
    if (!link || link.target === '_blank' || !this.isInternalLink(link.href)) return;
    
    e.preventDefault();
    this.playAnimation(link.href);
  }

  isInternalLink(url) {
    try {
      return new URL(url).origin === location.origin;
    } catch {
      return false;
    }
  }

  playAnimation(url) {
    const animations = {
      // 1. Мягкое затухание с легким подъемом
      gentleFade: () => {
        gsap.to('main', {
          y: -30,
          opacity: 0,
          duration: 0.7,
          ease: "expo.inOut",
          onComplete: () => location.href = url
        });
      },
      
      // 2. Плавное "утекание" вправо
      fluidSlide: () => {
        gsap.to('main', {
          x: '10%',
          opacity: 0,
          filter: 'blur(5px)',
          duration: 0.9,
          ease: "power3.inOut",
          onComplete: () => location.href = url
        });
      },
      
      // 3. Эффект мягкого закрытия (как жалюзи)
      softBlinds: () => {
        gsap.to('main', {
          scaleY: 0,
          transformOrigin: "top",
          opacity: 0,
          duration: 0.8,
          ease: "back.in",
          onComplete: () => location.href = url
        });
      },
      
      // 4. Легкое 3D-проваливание
      gentlePerspective: () => {
        document.documentElement.style.perspective = '1000px';
        gsap.to('main', {
          rotationX: 15,
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => location.href = url
        });
      },
      
      // 5. Эффект расфокусировки
      smoothBlur: () => {
        gsap.to('main', {
          filter: 'blur(10px)',
          opacity: 0,
          duration: 0.8,
          ease: "sine.inOut",
          onComplete: () => location.href = url
        });
      }
    };
    
    animations[this.animationType]?.();
  }
}

export default SwitchPageController;