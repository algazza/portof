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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingEl,
          start: "top 88%",
          end: "bottom 10%",
          toggleActions: "play reverse play reverse",
        },
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      tl.fromTo(
        headingEl,
        {
          letterSpacing: "0.12em",
          filter: "blur(10px)",
          opacity: 0,
          y: 24,
        },
        {
          letterSpacing:
            level === "h1" ? "-0.04em" : level === "h2" ? "-0.03em" : "-0.01em",
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
        },
      );
    }, headingEl);

    return () => ctx.revert();
  });
</script>

<div class="relative inline-block select-none max-w-full {className}">
  {#if level === "h1"}
    <h1
      bind:this={headingEl}
      class="font-h1 text-[#FF0000] uppercase tracking-tight break-words"
    >
      FRONTEND DEVELOPER
      <slot />
    </h1>
  {:else if level === "h2"}
    <h2
      bind:this={headingEl}
      class="font-h2 text-[#FF0000] uppercase tracking-tight break-words"
    >
      {text}
      <slot />
    </h2>
  {:else if level === "h3"}
    <h3
      bind:this={headingEl}
      class="font-h3 text-[#FF0000] uppercase break-words"
    >
      {text}
      <slot />
    </h3>
  {:else}
    <h4
      bind:this={headingEl}
      class="font-h4 text-[#FF0000] uppercase break-words"
    >
      {text}
      <slot />
    </h4>
  {/if}
</div>
