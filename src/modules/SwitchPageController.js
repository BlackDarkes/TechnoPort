import { gsap } from "gsap";

class SwitchPageController {
  constructor(animationType = 'gentleFade') {
    this.animationType = animationType;
    this.init();
  }

  init() {
    // Изначальная анимация появления (ваш код без изменений)
    gsap.from('main', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "expo.out",
      onStart: () => {
        // Временное решение для плавности
        document.body.style.overflow = 'hidden';
      },
      onComplete: () => {
        document.body.style.overflow = '';
      }
    });
    
    // Ваш оригинальный обработчик кликов
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
    // Ваши оригинальные анимации БЕЗ ИЗМЕНЕНИЙ
    const animations = {
      gentleFade: () => {
        gsap.to('main', {
          y: -30,
          opacity: 0,
          duration: 0.7,
          ease: "expo.inOut",
          onComplete: () => location.href = url
        });
      },
      
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
      
      gentlePerspective: () => {
        gsap.to('main', {
          rotationX: 15,
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => location.href = url
        });
      },
      
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
    
    // Запуск анимации БЕЗ изменений
    if (animations[this.animationType]) {
      // Временное отключение скролла для плавности
      document.body.style.overflow = 'hidden';
      animations[this.animationType]();
    } else {
      location.href = url;
    }
  }
}

export default SwitchPageController;