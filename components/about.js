export function initAboutView() {
  const viewport = document.getElementById('app-viewport');

  viewport.innerHTML = `
    <div class="main-container" style="padding: 3rem 0 5rem 0;">
      <!-- Hero Section -->
      <section style="text-align: center; margin-bottom: 4rem;">
        <h1 id="about-heading" style="font-family: var(--font-family-serif); font-size: 3.2rem; margin-bottom: 1.5rem;">About WanderLoom</h1>
        <p class="text-muted" style="font-size: 1.25rem; max-width: 700px; margin: 0 auto; line-height: 1.6;">
          We are a team of passionate travelers, designers, and developers dedicated to turning your travel dreams into custom-woven realities.
        </p>
      </section>

      <!-- Mission & Story Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 5rem;">
        <div class="details-card-box">
          <h2 style="font-family: var(--font-family-serif); font-size: 1.8rem; margin-bottom: 1rem; color: var(--secondary);">Our Mission</h2>
          <p class="text-muted" style="line-height: 1.7; font-size: 1.05rem;">
            WanderLoom's mission is to empower travelers by providing a personalized, visually immersive discovery platform. We believe travel should be bespoke, accessible, and stress-free. By mapping preferences directly to curated experiences, we help you make informed travel decisions and build itineraries that create lifelong memories.
          </p>
        </div>
        
        <div class="details-card-box">
          <h2 style="font-family: var(--font-family-serif); font-size: 1.8rem; margin-bottom: 1rem; color: var(--primary);">Our Approach</h2>
          <p class="text-muted" style="line-height: 1.7; font-size: 1.05rem;">
            We combine dynamic technology with high-quality media to deliver a comprehensive overview of each destination. From detailed climate-based checklists to real-time budget calculators and interactive daily schedules, we equip explorers with tools that replace spreadsheets and travel stress with excitement and clarity.
          </p>
        </div>
      </div>

      <!-- Core Values -->
      <section style="margin-bottom: 5rem;">
        <h2 style="font-family: var(--font-family-serif); font-size: 2.2rem; text-align: center; margin-bottom: 3rem;">Our Core Values</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem;">
          <div class="details-card-box" style="text-align: center; padding: 2rem 1.5rem;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🎯</div>
            <h3 style="font-size: 1.2rem; margin-bottom: 8px;">Personalization First</h3>
            <p class="text-muted" style="font-size: 0.9rem; line-height: 1.5;">Every traveler is unique. We build tools that prioritize your taste, pace, and budget.</p>
          </div>
          <div class="details-card-box" style="text-align: center; padding: 2rem 1.5rem;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🎨</div>
            <h3 style="font-size: 1.2rem; margin-bottom: 8px;">Visual Curation</h3>
            <p class="text-muted" style="font-size: 0.9rem; line-height: 1.5;">We bring destinations to life through high-quality photography and detailed descriptions.</p>
          </div>
          <div class="details-card-box" style="text-align: center; padding: 2rem 1.5rem;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🌿</div>
            <h3 style="font-size: 1.2rem; margin-bottom: 8px;">Responsible Tourism</h3>
            <p class="text-muted" style="font-size: 0.9rem; line-height: 1.5;">We encourage eco-friendly destinations and cultural preservation across the globe.</p>
          </div>
          <div class="details-card-box" style="text-align: center; padding: 2rem 1.5rem;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🤝</div>
            <h3 style="font-size: 1.2rem; margin-bottom: 8px;">Seamless Support</h3>
            <p class="text-muted" style="font-size: 0.9rem; line-height: 1.5;">Providing reliable budget calculators and checklists to ensure smooth journeys.</p>
          </div>
        </div>
      </section>

      <!-- Meet the Team -->
      <section>
        <h2 style="font-family: var(--font-family-serif); font-size: 2.2rem; text-align: center; margin-bottom: 3rem;">Meet Our Team</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
          
          <!-- Team Member 1 -->
          <div class="details-card-box" style="text-align: center;">
            <div style="width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); margin: 0 auto 1.5rem auto; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: bold; border: 2px solid var(--border-color-active);">
              NK
            </div>
            <h3 style="font-size: 1.3rem; margin-bottom: 4px;">Nikhil Kumar</h3>
            <p style="font-size: 0.85rem; color: var(--secondary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 1rem;">
              Founder & Chief Architect
            </p>
            <p class="text-muted" style="font-size: 0.9rem; line-height: 1.5;">
              Nikhil designs the core algorithms and systems behind WanderLoom, turning abstract travel ideas into smooth personalized platforms.
            </p>
          </div>

          <!-- Team Member 2 -->
          <div class="details-card-box" style="text-align: center;">
            <div style="width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%); margin: 0 auto 1.5rem auto; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: bold; border: 2px solid var(--border-color-active);">
              AW
            </div>
            <h3 style="font-size: 1.3rem; margin-bottom: 4px;">Aria Wilder</h3>
            <p style="font-size: 0.85rem; color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 1rem;">
              Lead Travel Curator
            </p>
            <p class="text-muted" style="font-size: 0.9rem; line-height: 1.5;">
              Aria manages our destinations database, selecting attractions, building itinerary templates, and validating guides for accuracy.
            </p>
          </div>

          <!-- Team Member 3 -->
          <div class="details-card-box" style="text-align: center;">
            <div style="width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, var(--primary) 0%, var(--accent-red) 100%); margin: 0 auto 1.5rem auto; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: bold; border: 2px solid var(--border-color-active);">
              JT
            </div>
            <h3 style="font-size: 1.3rem; margin-bottom: 4px;">Jonas Thorne</h3>
            <p style="font-size: 0.85rem; color: var(--accent-red); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 1rem;">
              Technical Director
            </p>
            <p class="text-muted" style="font-size: 0.9rem; line-height: 1.5;">
              Jonas ensures smooth client performance, fine-tunes CSS animations, and maintains accessibility routing compliance.
            </p>
          </div>

        </div>
      </section>
    </div>
  `;
}
