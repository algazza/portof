<script lang="ts">
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { onMount } from "svelte";
  import About from "./lib/About.svelte";
  import Contact from "./lib/Contact.svelte";
  import Experience from "./lib/Experience.svelte";
  import Footer from "./lib/Footer.svelte";
  import Header from "./lib/Header.svelte";
  import Hero from "./lib/Hero.svelte";
  import Projects from "./lib/Projects.svelte";
  import SideNav from "./lib/SideNav.svelte";

  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });

    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  });
</script>

<svg
  class="pointer-events-none fixed top-[-9999px] left-[-9999px] h-0 w-0 opacity-0"
  aria-hidden="true"
>
  <defs>
    <filter id="gooey-mercury">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
      <feColorMatrix
        in="blur"
        mode="matrix"
        values="
          1 0 0 0 0
          0 0 0 0 0
          0 0 0 0 0
          0 0 0 22 -10"
        result="gooey"
      />
      <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
    </filter>
  </defs>
</svg>

<div
  class="relative min-h-screen bg-black text-[#FF0000] selection:bg-[#FF0000] selection:text-black"
>
  <Header />

  <SideNav />

  <main class="w-full">
    <Hero />
    <Experience />
    <Projects />
    <About />
    <Contact />
  </main>

  <Footer />
</div>
