// 🎬 Composable para manejo de animaciones reutilizables
import { ref, onMounted, nextTick, type Ref } from "vue";

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  stagger?: number;
}

export interface UseAnimationsReturn {
  isAnimating: Ref<boolean>;
  animateIn: (
    element: HTMLElement | HTMLElement[],
    config?: AnimationConfig
  ) => Promise<void>;
  animateOut: (
    element: HTMLElement | HTMLElement[],
    config?: AnimationConfig
  ) => Promise<void>;
  staggerIn: (
    elements: HTMLElement[],
    config?: AnimationConfig
  ) => Promise<void>;
  fadeIn: (element: HTMLElement, config?: AnimationConfig) => Promise<void>;
  slideInUp: (element: HTMLElement, config?: AnimationConfig) => Promise<void>;
  slideInLeft: (
    element: HTMLElement,
    config?: AnimationConfig
  ) => Promise<void>;
  bounceIn: (element: HTMLElement, config?: AnimationConfig) => Promise<void>;
  scaleIn: (element: HTMLElement, config?: AnimationConfig) => Promise<void>;
}

export function useAnimations(): UseAnimationsReturn {
  const isAnimating = ref<boolean>(false);

  // 🎯 Configuración por defecto
  const defaultConfig: Required<AnimationConfig> = {
    duration: 300,
    delay: 0,
    easing: "ease-out",
    stagger: 100,
  };

  // 🎬 Función base para animar un elemento
  const animateElement = (
    element: HTMLElement,
    keyframes: Keyframe[],
    config: AnimationConfig = {}
  ): Promise<void> => {
    return new Promise((resolve) => {
      const finalConfig = { ...defaultConfig, ...config };

      const animation = element.animate(keyframes, {
        duration: finalConfig.duration,
        delay: finalConfig.delay,
        easing: finalConfig.easing,
        fill: "forwards",
      });

      animation.onfinish = () => resolve();
    });
  };

  // 🔄 Animación de entrada genérica
  const animateIn = async (
    element: HTMLElement | HTMLElement[],
    config: AnimationConfig = {}
  ): Promise<void> => {
    isAnimating.value = true;

    const elements = Array.isArray(element) ? element : [element];

    try {
      const promises = elements.map((el, index) =>
        fadeIn(el, {
          ...config,
          delay:
            (config.delay || 0) +
            index * (config.stagger || defaultConfig.stagger),
        })
      );

      await Promise.all(promises);
    } finally {
      isAnimating.value = false;
    }
  };

  // 🔄 Animación de salida genérica
  const animateOut = async (
    element: HTMLElement | HTMLElement[],
    config: AnimationConfig = {}
  ): Promise<void> => {
    isAnimating.value = true;

    const elements = Array.isArray(element) ? element : [element];

    try {
      const promises = elements.map((el) =>
        animateElement(
          el,
          [
            { opacity: 1, transform: "scale(1)" },
            { opacity: 0, transform: "scale(0.8)" },
          ],
          config
        )
      );

      await Promise.all(promises);
    } finally {
      isAnimating.value = false;
    }
  };

  // 🎭 Animación escalonada (stagger)
  const staggerIn = async (
    elements: HTMLElement[],
    config: AnimationConfig = {}
  ): Promise<void> => {
    isAnimating.value = true;

    try {
      for (let i = 0; i < elements.length; i++) {
        const delay =
          (config.delay || 0) + i * (config.stagger || defaultConfig.stagger);
        fadeIn(elements[i], { ...config, delay });
      }

      // Esperar a que termine la última animación
      const totalDuration =
        (config.duration || defaultConfig.duration) +
        (config.delay || 0) +
        (elements.length - 1) * (config.stagger || defaultConfig.stagger);

      await new Promise((resolve) => setTimeout(resolve, totalDuration));
    } finally {
      isAnimating.value = false;
    }
  };

  // ✨ Fade in
  const fadeIn = (
    element: HTMLElement,
    config: AnimationConfig = {}
  ): Promise<void> => {
    return animateElement(element, [{ opacity: 0 }, { opacity: 1 }], config);
  };

  // ⬆️ Slide in up
  const slideInUp = (
    element: HTMLElement,
    config: AnimationConfig = {}
  ): Promise<void> => {
    return animateElement(
      element,
      [
        { opacity: 0, transform: "translateY(30px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      config
    );
  };

  // ⬅️ Slide in left
  const slideInLeft = (
    element: HTMLElement,
    config: AnimationConfig = {}
  ): Promise<void> => {
    return animateElement(
      element,
      [
        { opacity: 0, transform: "translateX(-30px)" },
        { opacity: 1, transform: "translateX(0)" },
      ],
      config
    );
  };

  // 🎾 Bounce in
  const bounceIn = (
    element: HTMLElement,
    config: AnimationConfig = {}
  ): Promise<void> => {
    return animateElement(
      element,
      [
        { opacity: 0, transform: "scale(0.3)" },
        { opacity: 1, transform: "scale(1.05)", offset: 0.6 },
        { transform: "scale(0.9)", offset: 0.8 },
        { opacity: 1, transform: "scale(1)" },
      ],
      { duration: 600, ...config }
    );
  };

  // 📏 Scale in
  const scaleIn = (
    element: HTMLElement,
    config: AnimationConfig = {}
  ): Promise<void> => {
    return animateElement(
      element,
      [
        { opacity: 0, transform: "scale(0)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      config
    );
  };

  return {
    isAnimating,
    animateIn,
    animateOut,
    staggerIn,
    fadeIn,
    slideInUp,
    slideInLeft,
    bounceIn,
    scaleIn,
  };
}
