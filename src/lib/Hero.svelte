<script lang="ts">
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { onMount } from "svelte";
  import { heroSection } from "../constanta/hero";
  import { Foto1, Foto1Transparent } from "../constanta/image";
  import GooeyHeading from "./GooeyHeading.svelte";

  gsap.registerPlugin(ScrollTrigger);

  let heroContainer: HTMLElement;
  let bodyMaskedEl: HTMLElement;
  let heroImageEl: HTMLElement;
  let scannerLineEl: HTMLElement;
  let badgesEl: HTMLElement;
  let actionButtonsEl: HTMLElement;

  function scrollToSection(id: string) {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  onMount(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroContainer,
          start: "top 80%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.fromTo(
        badgesEl,
        { scaleX: 0, opacity: 0, transformOrigin: "left" },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: "power3.inOut" },
      );

      if (heroImageEl) {
        tl.fromTo(
          heroImageEl,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            opacity: 0,
            y: 48,
            scale: 0.94,
            rotate: -2,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 1.05,
            ease: "expo.out",
          },
          "-=0.3",
        );
      }

      if (scannerLineEl) {
        tl.fromTo(
          scannerLineEl,
          { top: "0%", opacity: 0 },
          {
            top: "100%",
            opacity: 1,
            duration: 0.75,
            ease: "power2.inOut",
            repeat: 1,
            yoyo: true,
          },
          "-=0.4",
        );
      }

      if (bodyMaskedEl) {
        tl.fromTo(
          bodyMaskedEl,
          { y: "105%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=1.4",
        );
      }

      if (actionButtonsEl) {
        tl.fromTo(
          actionButtonsEl.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=1.3",
        );
      }
    }, heroContainer);

    return () => ctx.revert();
  });
</script>

<section
  id="hero"
  bind:this={heroContainer}
  class="relative min-h-screen w-full flex flex-col justify-center px-4 sm:px-8 md:px-16 pt-24 pb-16 overflow-hidden border-b border-[#FF0000]/30 dither-grid-fine"
>
  <div
    bind:this={badgesEl}
    class="flex flex-wrap items-center justify-between gap-4 border-b border-[#FF0000] pb-3 mb-8 w-full"
  >
    <div class="flex items-center gap-3">
      <span class="inline-block h-3 w-3 bg-[#FF0000]"></span>
      <span
        class="font-caption text-[#FF0000] tracking-widest text-[11px] sm:text-xs"
      >
        SYSTEM.SYS // THE_BATMAN.2022 // ROBERT_PATTINSON
      </span>
    </div>
    <div
      class="font-caption text-[#FF0000]/70 font-mono text-[10px] sm:text-xs"
    >
      LOC: 6°58'57.2"S 110°24'32.6"E // SEMARANG_ID
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
    <div class="lg:col-span-8 flex flex-col z-10 w-full min-w-0">
      <div class="mb-3 sm:mb-4">
        <span
          class="font-caption text-[#FF0000] bg-black px-2 py-1 border border-[#FF0000] tracking-widest inline-block text-xs"
        >
          // {heroSection.name}
        </span>
      </div>

      <div class="mb-3 sm:mb-4 w-full overflow-hidden">
        <GooeyHeading
          level="h1"
          text={heroSection.role.toUpperCase()}
          className="w-full"
        />
      </div>

      <div
        class="masked-body-wrapper my-4 sm:my-6 max-w-2xl border-l-2 border-[#FF0000] pl-4"
      >
        <div bind:this={bodyMaskedEl} class="masked-body-content">
          <p
            class="font-body text-[#FF0000] font-medium text-sm sm:text-base md:text-lg leading-relaxed"
          >
            {heroSection.slogan}
          </p>
        </div>
      </div>

      <div
        bind:this={actionButtonsEl}
        class="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 sm:mt-4"
      >
        <button
          type="button"
          on:click={() => scrollToSection("#projects")}
          class="btn-brutalist text-xs sm:text-sm"
          aria-label="View Project Case Studies"
        >
          VIEW PROJECTS
          <span class="ml-2 font-mono" aria-hidden="true">[03]</span>
        </button>

        <button
          type="button"
          on:click={() => scrollToSection("#experience")}
          class="btn-brutalist-outline text-xs sm:text-sm"
          aria-label="View Career Experience"
        >
          EXPLORE CAREER
          <span class="ml-2 font-mono" aria-hidden="true">[02]</span>
        </button>
      </div>
    </div>

    <div
      class="lg:col-span-4 relative flex justify-center items-center mt-6 lg:mt-0"
    >
      <div
        bind:this={heroImageEl}
        class="photo-reveal relative w-full max-w-70 sm:max-w-85 aspect-4/5 border-2 border-[#FF0000] bg-black overflow-hidden shadow-[6px_6px_0px_#FF0000] sm:shadow-[8px_8px_0px_#FF0000]"
      >
        <div
          bind:this={scannerLineEl}
          class="scanner-beam-line"
          aria-hidden="true"
        >
          <div class="scanner-beam-glow"></div>
        </div>

        <img
          src={Foto1Transparent || Foto1}
          alt="Portrait of Fadhil Al Ghaza"
          class="w-full h-full object-cover object-top grayscale contrast-200 brightness-95 mix-blend-luminosity filter transition-transform duration-500"
        />

        <div
          class="pointer-events-none absolute inset-0 bg-[#FF0000]/25 mix-blend-color"
        ></div>
        <div
          class="halftone-overlay pointer-events-none absolute inset-0 opacity-35 mix-blend-screen"
        ></div>

        <div
          class="absolute top-2 left-2 bg-black border border-[#FF0000] px-2 py-0.5 text-[10px] font-mono text-[#FF0000]"
        >
          ID: BW-2027
        </div>
        <div
          class="absolute bottom-2 right-2 bg-black border border-[#FF0000] px-2 py-0.5 text-[10px] font-mono text-[#FF0000]"
        >
          FRONTEND_SPECIALIST
        </div>
      </div>
    </div>
  </div>
</section>
