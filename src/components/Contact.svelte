<script lang="ts">
  import emailjs from "@emailjs/browser";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { onMount } from "svelte";
  import { contact } from "../constanta/contact";
  import GooeyHeading from "./GooeyHeading.svelte";

  gsap.registerPlugin(ScrollTrigger);

  let sectionEl: HTMLElement;
  let bodyMaskedEl: HTMLElement;

  let name = "";
  let email = "";
  let message = "";

  let isSubmitting = false;
  let formStatus: { type: "idle" | "success" | "error"; message: string } = {
    type: "idle",
    message: "",
  };

  const serviceId = import.meta.env.EMAILJS_SERVICE_ID || "service_x4kz1m4";
  const templateId = import.meta.env.EMAILJS_TEMPLATE_ID || "template_g2obbxe";
  const publicKey = import.meta.env.EMAILJS_PUBLIC_KEY || "U6sNlbkXPRpNND6Jm";

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      formStatus = {
        type: "error",
        message: "ATTENTION: All fields are required for transmission.",
      };
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      formStatus = {
        type: "error",
        message: "ATTENTION: Invalid email address format.",
      };
      return;
    }

    isSubmitting = true;
    formStatus = { type: "idle", message: "" };

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: name.trim(),
          from_email: email.trim(),
          message: message.trim(),
          to_name: "Al Ghaza",
        },
        publicKey,
      );

      formStatus = {
        type: "success",
        message: "SIGNAL TRANSMITTED: Message delivered directly to Al Ghaza.",
      };
      name = "";
      email = "";
      message = "";
    } catch (err) {
      console.error("EmailJS error:", err);
      formStatus = {
        type: "error",
        message:
          "TRANSMISSION ANOMALY: Failed to send via gateway. Please reach out directly to fadhilaswadira72564@gmail.com",
      };
    } finally {
      isSubmitting = false;
    }
  }

  onMount(() => {
    const ctx = gsap.context(() => {
      // Reversible masked body text entrance and exit (R-19, R-31, strictly NO opacity)
      if (bodyMaskedEl) {
        gsap.fromTo(
          bodyMaskedEl,
          { y: "105%" },
          {
            y: "0%",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 75%",
              end: "bottom 15%",
              toggleActions: "restart reverse restart reverse",
            },
          },
        );
      }
    }, sectionEl);

    return () => ctx.revert();
  });
</script>

<section
  id="contact"
  bind:this={sectionEl}
  class="relative min-h-screen w-full bg-black py-24 px-4 sm:px-6 md:px-16 border-b border-[#FF0000]/30"
>
  <div class="mb-12 max-w-3xl">
    <div class="flex items-center gap-2 mb-2">
      <span class="h-2 w-2 bg-[#FF0000]" aria-hidden="true"></span>
      <span class="font-caption text-[#FF0000] tracking-widest text-xs"
        >// CHANNEL 05 // TRANSMISSION</span
      >
    </div>

    <!-- Mandatory phrase: "Touch Me" / "Get In Touch" with Gooey Heading -->
    <GooeyHeading level="h2" text="TOUCH ME // GET IN TOUCH" />

    <!-- Masked Body Description (Strictly NO opacity fade-in, reversible) -->
    <div class="masked-body-wrapper mt-4">
      <div bind:this={bodyMaskedEl} class="masked-body-content">
        <p
          class="font-body text-[#FF0000] text-sm md:text-base max-w-xl leading-relaxed"
        >
          Available for senior frontend opportunities, high-impact web
          contracts, and challenging technical architectures. Initiate contact
          using the terminal below.
        </p>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
    <!-- Left Column: Industrial Contact Form (Bottom border only, no rounded corners) -->
    <div
      class="lg:col-span-7 bg-black border-2 border-[#FF0000] p-6 md:p-10 shadow-[8px_8px_0px_#FF0000]"
    >
      <div
        class="border-b border-[#FF0000] pb-3 mb-8 flex justify-between items-center text-xs font-mono text-[#FF0000]"
      >
        <span>ENCRYPTED_DIRECT_DISPATCH</span>
        <span>PROTOCOL: EMAILJS_API</span>
      </div>

      <form on:submit={handleSubmit} class="space-y-8" novalidate>
        <!-- Field: Name -->
        <div class="flex flex-col gap-2">
          <label
            for="contact-name"
            class="font-caption text-[#FF0000] font-bold tracking-wider"
          >
            [01] YOUR NAME / IDENTITY *
          </label>
          <input
            id="contact-name"
            type="text"
            bind:value={name}
            required
            placeholder="e.g. Bruce Wayne or HR Specialist"
            class="w-full bg-black border-0 border-b-2 border-[#FF0000] py-3 text-base text-[#FF0000] placeholder-[#FF0000]/40 rounded-none focus:border-[#FF0000] focus:ring-0 focus:outline-none transition-colors"
          />
        </div>

        <!-- Field: Email -->
        <div class="flex flex-col gap-2">
          <label
            for="contact-email"
            class="font-caption text-[#FF0000] font-bold tracking-wider"
          >
            [02] YOUR EMAIL ADDRESS *
          </label>
          <input
            id="contact-email"
            type="email"
            bind:value={email}
            required
            placeholder="name@organization.com"
            class="w-full bg-black border-0 border-b-2 border-[#FF0000] py-3 text-base text-[#FF0000] placeholder-[#FF0000]/40 rounded-none focus:border-[#FF0000] focus:ring-0 focus:outline-none transition-colors"
          />
        </div>

        <!-- Field: Message -->
        <div class="flex flex-col gap-2">
          <label
            for="contact-message"
            class="font-caption text-[#FF0000] font-bold tracking-wider"
          >
            [03] TRANSMISSION PAYLOAD / MESSAGE *
          </label>
          <textarea
            id="contact-message"
            bind:value={message}
            required
            rows="4"
            placeholder="State project scope, timeline, role details, or inquiry..."
            class="w-full bg-black border-0 border-b-2 border-[#FF0000] py-3 text-base text-[#FF0000] placeholder-[#FF0000]/40 rounded-none focus:border-[#FF0000] focus:ring-0 focus:outline-none transition-colors resize-y min-h-[100px]"
          ></textarea>
        </div>

        <!-- Feedback UI States: Empty / Loading / Success / Error -->
        {#if formStatus.message}
          <div
            role="status"
            aria-live="polite"
            class="p-4 border {formStatus.type === 'success'
              ? 'border-[#FF0000] bg-[#FF0000]/10 text-[#FF0000]'
              : 'border-[#FF0000] bg-black text-[#FF0000]'}"
          >
            <span class="font-mono text-xs uppercase font-bold tracking-wider">
              {formStatus.message}
            </span>
          </div>
        {/if}

        <!-- Submit Button -->
        <button
          type="submit"
          disabled={isSubmitting}
          class="btn-brutalist w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send direct message"
        >
          {#if isSubmitting}
            <span class="font-mono animate-pulse">TRANSMITTING SIGNAL...</span>
          {:else}
            <span>DISPATCH TRANSMISSION</span>
            <span class="ml-2 font-mono" aria-hidden="true">[→]</span>
          {/if}
        </button>
      </form>
    </div>

    <!-- Right Column: Direct Contact & Social Links (Strictly duotone red/black) -->
    <div class="lg:col-span-5 flex flex-col gap-8">
      <!-- Direct Email Box -->
      <div class="border-2 border-[#FF0000] p-6 bg-black dither-grid-fine">
        <span class="font-caption text-[#FF0000] tracking-widest block mb-2"
          >// DIRECT MAIL</span
        >
        <a
          href="mailto:{contact.email}"
          class="font-h4 text-[#FF0000] hover:underline break-all block"
          aria-label="Send email directly to {contact.email}"
        >
          {contact.email}
        </a>
        <p class="font-body text-xs text-[#FF0000]/80 mt-2">
          Responses typically dispatched within 24 hours.
        </p>
      </div>

      <!-- Social Media Direct Links -->
      <div class="border-2 border-[#FF0000] p-6 bg-black">
        <span class="font-caption text-[#FF0000] tracking-widest block mb-4"
          >// SOCIAL NETWORKS</span
        >

        <ul class="flex flex-col gap-4 list-none p-0 m-0">
          <!-- GitHub -->
          <li>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between border border-[#FF0000] p-3 text-xs font-mono font-bold text-[#FF0000] hover:bg-[#FF0000] hover:text-black transition-colors"
              aria-label="Visit Al Ghaza on GitHub (opens in new tab)"
            >
              <div class="flex items-center gap-3">
                <svg
                  class="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>GITHUB // @algazza</span>
              </div>
              <span aria-hidden="true">↗</span>
            </a>
          </li>

          <!-- LinkedIn -->
          <li>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between border border-[#FF0000] p-3 text-xs font-mono font-bold text-[#FF0000] hover:bg-[#FF0000] hover:text-black transition-colors"
              aria-label="Visit Al Ghaza on LinkedIn (opens in new tab)"
            >
              <div class="flex items-center gap-3">
                <svg
                  class="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74V9.96H5.06v8.54h2.8z"
                  />
                </svg>
                <span>LINKEDIN // @algazza</span>
              </div>
              <span aria-hidden="true">↗</span>
            </a>
          </li>

          <!-- Instagram -->
          <li>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between border border-[#FF0000] p-3 text-xs font-mono font-bold text-[#FF0000] hover:bg-[#FF0000] hover:text-black transition-colors"
              aria-label="Visit Al Ghaza on Instagram (opens in new tab)"
            >
              <div class="flex items-center gap-3">
                <svg
                  class="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
                <span>INSTAGRAM // @fadhilghaza</span>
              </div>
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
