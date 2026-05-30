import { showToast } from '../app.js';

export function initContactView() {
  const viewport = document.getElementById('app-viewport');

  viewport.innerHTML = `
    <div class="main-container" style="padding: 3rem 0 5rem 0;">
      <!-- Page Header -->
      <section style="text-align: center; margin-bottom: 4rem;">
        <h1 id="contact-heading" style="font-family: var(--font-family-serif); font-size: 3.2rem; margin-bottom: 1.5rem;">Contact Us</h1>
        <p class="text-muted" style="font-size: 1.25rem; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          Have questions about our travel matching or want to submit feedback? Send us a message and we'll get back to you shortly.
        </p>
      </section>

      <!-- Grid Layout: Form and Sidebar Info -->
      <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 3rem; align-items: start;">
        
        <!-- Contact Email Form -->
        <div class="details-card-box">
          <h2 style="font-family: var(--font-family-serif); font-size: 1.8rem; margin-bottom: 1.5rem; color: var(--secondary);">Send a Message</h2>
          
          <form id="contact-email-form" style="display: flex; flex-direction: column; gap: 1.5rem;">
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="filter-group">
                <label for="contact-name">Full Name</label>
                <input type="text" id="contact-name" placeholder="John Doe" required>
              </div>
              
              <div class="filter-group">
                <label for="contact-email">Email Address</label>
                <input type="email" id="contact-email" placeholder="john@example.com" required>
              </div>
            </div>

            <div class="filter-group">
              <label for="contact-subject">Subject</label>
              <input type="text" id="contact-subject" placeholder="Trip Planner Inquiries / Suggestions" required>
            </div>

            <div class="filter-group">
              <label for="contact-message">Message</label>
              <textarea id="contact-message" placeholder="Type your message here..." required style="background: var(--bg-dark); border: 1px solid var(--border-color); color: var(--text-main); padding: 0.75rem; border-radius: var(--border-radius-sm); font-family: var(--font-family-sans); font-size: 0.9rem; outline: none; resize: vertical; min-height: 150px; transition: border-color 0.2s ease;"></textarea>
            </div>

            <button type="submit" class="primary-btn" style="align-self: flex-start; padding: 0.9rem 2.2rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Send Email
            </button>
            
          </form>
        </div>

        <!-- Sidebar Contact Info details -->
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <div class="details-card-box">
            <h3 style="font-family: var(--font-family-serif); font-size: 1.4rem; margin-bottom: 1.2rem; color: var(--primary);">Contact Information</h3>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              
              <div style="display: flex; gap: 15px; align-items: flex-start;">
                <div style="font-size: 1.5rem; background: var(--bg-dark); padding: 8px; border-radius: 50%; border: 1px solid var(--border-color); display: flex;">📍</div>
                <div>
                  <h4 style="font-size: 0.95rem; margin-bottom: 4px;">Headquarters Address</h4>
                  <p class="text-muted" style="font-size: 0.85rem; line-height: 1.4;">
                    100 WanderLoom Plaza, Suite 400<br>
                    San Francisco, CA 94105, USA
                  </p>
                </div>
              </div>

              <div style="display: flex; gap: 15px; align-items: flex-start;">
                <div style="font-size: 1.5rem; background: var(--bg-dark); padding: 8px; border-radius: 50%; border: 1px solid var(--border-color); display: flex;">📞</div>
                <div>
                  <h4 style="font-size: 0.95rem; margin-bottom: 4px;">Telephone</h4>
                  <p class="text-muted" style="font-size: 0.85rem; line-height: 1.4;">
                    +1 (555) 321-4567<br>
                    Mon - Fri, 9:00 AM - 5:00 PM PST
                  </p>
                </div>
              </div>

              <div style="display: flex; gap: 15px; align-items: flex-start;">
                <div style="font-size: 1.5rem; background: var(--bg-dark); padding: 8px; border-radius: 50%; border: 1px solid var(--border-color); display: flex;">✉️</div>
                <div>
                  <h4 style="font-size: 0.95rem; margin-bottom: 4px;">General Support</h4>
                  <p class="text-muted" style="font-size: 0.85rem; line-height: 1.4;">
                    support@wanderloom.example.com<br>
                    curators@wanderloom.example.com
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div class="details-card-box">
            <h3 style="font-family: var(--font-family-serif); font-size: 1.4rem; margin-bottom: 8px; color: var(--accent-gold);">Need Instant Help?</h3>
            <p class="text-muted" style="font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.2rem;">
              Try our Travel Dashboard checklists and calculators to solve packing and budgeting queries instantly.
            </p>
            <a href="#planner" class="secondary-btn btn-full">Open Travel Dashboard</a>
          </div>
        </div>

      </div>
    </div>
  `;

  // Attach submit listeners
  const form = document.getElementById('contact-email-form');
  const messageInput = document.getElementById('contact-message');
  
  // Apply focused state on textarea
  messageInput.addEventListener('focus', () => {
    messageInput.style.borderColor = 'var(--primary)';
    messageInput.style.boxShadow = '0 0 10px var(--primary-glow)';
  });
  messageInput.addEventListener('blur', () => {
    messageInput.style.borderColor = 'var(--border-color)';
    messageInput.style.boxShadow = 'none';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = messageInput.value;

    // Simulate sending email
    console.log(`Sending simulated email:\nTo: support@wanderloom.example.com\nFrom: ${name} (${email})\nSubject: ${subject}\nMessage: ${message}`);
    
    showToast("Email sent successfully! We will contact you soon.");
    
    // Clear inputs
    form.reset();
  });
}
