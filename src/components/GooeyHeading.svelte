<script lang="ts">
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { onMount } from "svelte";

  gsap.registerPlugin(ScrollTrigger);

  export let level: "h1" | "h2" | "h3" | "h4" = "h2";
  export let text: string = "";
  export let className: string = "";
  export let onComplete: (() => void) | undefined = undefined;

  let headingEl: HTMLElement;

  onMount(() => {
    const ctx = gsap.context(() => {
      // Reversible text reveal: initial opacity 0 guarantees no blurry ghost text hangs before trigger (R-19, R-31)
      const targetLetterSpacing =
        level === "h1" ? "-0.04em" : level === "h2" ? "-0.03em" : "-0.01em";

      gsap.fromTo(
        headingEl,
        {
          opacity: 0,
          letterSpacing: "0.12em",
          filter: "blur(10px)",
          y: 25,
        },
        {
          opacity: 1,
          letterSpacing: targetLetterSpacing,
          filter: "blur(0px)",
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingEl,
            start: "top 88%",
            end: "bottom 10%",
            toggleActions: "restart reverse restart reverse",
            onEnter: () => {
              if (onComplete) onComplete();
            },
            onEnterBack: () => {
              if (onComplete) onComplete();
            },
          },
        },
      );
    }, headingEl);

    return () => ctx.revert();
  });
</script>

<div class="relative block select-none max-w-full overflow-hidden {className}">
  {#if level === "h1"}
    <h1
      bind:this={headingEl}
      style="opacity: 0;"
      class="font-h1 text-[#FF0000] uppercase tracking-tight break-words max-w-full"
    >
      {text}
      <slot />
    </h1>
  {:else if level === "h2"}
    <h2
      bind:this={headingEl}
      style="opacity: 0;"
      class="font-h2 text-[#FF0000] uppercase tracking-tight break-words max-w-full"
    >
      {text}
      <slot />
    </h2>
  {:else if level === "h3"}
    <h3
      bind:this={headingEl}
      style="opacity: 0;"
      class="font-h3 text-[#FF0000] uppercase break-words max-w-full"
    >
      {text}
      <slot />
    </h3>
  {:else}
    <h4
      bind:this={headingEl}
      style="opacity: 0;"
      class="font-h4 text-[#FF0000] uppercase break-words max-w-full"
    >
      {text}
      <slot />
    </h4>
  {/if}
</div>
