<script lang="ts">
  import { contact } from "../constanta/contact";

  const navLinks = [
    { label: "HOME", href: "#hero" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "PROJECTS", href: "#projects" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#contact" },
  ];

  function scrollToSection(href: string) {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
</script>

<footer
  class="w-full bg-black border-t-2 border-[#FF0000] py-16 px-6 md:px-16 text-[#FF0000]"
>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
    <div class="flex flex-col">
      <a
        href="#hero"
        on:click|preventDefault={() => scrollToSection("#hero")}
        class="font-h3 font-black tracking-tighter text-[#FF0000] uppercase block select-none hover:underline"
      >
        AL GHAZA
      </a>
      <span class="font-caption text-[#FF0000] mt-1 tracking-widest block">
        FRONTEND DEVELOPER
      </span>
      <p class="font-body text-xs text-[#FF0000]/70 mt-4 max-w-xs"></p>
    </div>

    <div class="flex flex-col">
      <span class="font-caption text-[#FF0000] font-bold tracking-widest mb-4">
        // NAVIGATION ARCHIVE
      </span>
      <ul class="flex flex-col gap-2.5 list-none p-0 m-0">
        {#each navLinks as link}
          <li>
            <a
              href={link.href}
              on:click|preventDefault={() => scrollToSection(link.href)}
              class="font-mono text-xs text-[#FF0000] hover:bg-[#FF0000] hover:text-black px-2 py-1 inline-block transition-colors"
              aria-label="Scroll to {link.label}"
            >
              → {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>

    <div class="flex flex-col">
      <span class="font-caption text-[#FF0000] font-bold tracking-widest mb-4">
        // CONNECT & REPOSITORIES
      </span>
      <div class="flex flex-col gap-2">
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-xs text-[#FF0000] hover:underline flex items-center justify-between border border-[#FF0000]/40 p-2"
        >
          <span>GITHUB</span>
          <span>↗</span>
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-xs text-[#FF0000] hover:underline flex items-center justify-between border border-[#FF0000]/40 p-2"
        >
          <span>LINKEDIN</span>
          <span>↗</span>
        </a>
        <a
          href={contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-xs text-[#FF0000] hover:underline flex items-center justify-between border border-[#FF0000]/40 p-2"
        >
          <span>INSTAGRAM</span>
          <span>↗</span>
        </a>
        <a
          href="mailto:{contact.email}"
          class="font-mono text-xs text-[#FF0000] hover:underline flex items-center justify-between border border-[#FF0000]/40 p-2"
        >
          <span>DIRECT EMAIL</span>
          <span>↗</span>
        </a>
      </div>
    </div>
  </div>

  <div
    class="mt-12 pt-6 border-t border-[#FF0000]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#FF0000]/60"
  >
    <div>© 2026 FADHIL AL GHAZA ASWADIRA. ALL RIGHTS RESERVED.</div>
    <div class="flex items-center gap-3">
      <span>LIVERPOOL</span>
      <span class="h-1.5 w-1.5 bg-[#FF0000]"></span>
      <span>Y_N_W_A</span>
    </div>
  </div>
</footer>
