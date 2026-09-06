import { BASE_PATH } from '../consts';

// `answer` is rendered as trusted HTML by Accordion.astro (via set:html),
// so it can use markup like <p>, <ul>, and <strong> — not just plain text.
export const faqs = [
  {
    question: 'How do I book a session?',
    answer: `<p>Use the <a href="${BASE_PATH}#contact">contact form</a> on the homepage — pick a preferred date and session type, and I'll follow up within a day or two to confirm.</p>`,
  },
  {
    question: 'What should we wear?',
    answer: `
      <p>A few simple tips to help everyone look and feel their best in front of the camera.</p>
      <p><strong>Coordinate, Don't Match.</strong> Choose a color palette of 2-3 complementary tones rather than everyone wearing identical outfits. Think "same family," not "uniform."</p>
      <p><strong>Keep Patterns Simple.</strong> Skip busy prints, loud stripes, and clothing with large logos or text — they pull focus from faces. Solids and subtle textures photograph best.</p>
      <p><strong>Layer for Variety.</strong> A light jacket, cardigan, or scarf gives you a couple of different looks without needing a full outfit change.</p>
      <p><strong>Dress for the Setting</strong></p>
      <ul>
        <li><strong>Outdoor/nature:</strong> earthy, neutral tones blend beautifully</li>
        <li><strong>Urban:</strong> slightly bolder colors can work well</li>
      </ul>
      <p><strong>Comfort First.</strong> Stiff new shoes, itchy fabrics, or anything kids will resist = stressed faces in photos. Comfortable and put-together beats trendy and miserable.</p>
      <p><strong>Avoid All-White or All-Black.</strong> Both are tricky to expose correctly, especially in group shots — white can wash out, black can lose detail.</p>
      <p><strong>Kids Don't Need to Match Adults.</strong> A complementary color is plenty. Save yourself the toddler meltdown over a matching outfit they hate.</p>
      <p><em>Questions about what to wear for your specific session? Just ask — happy to help you plan the perfect look.</em></p>
    `,
  },
  {
    question: 'What if it rains?',
    answer:
      "<p>We'll reschedule for the next available date at no extra cost — no need to worry about it in advance.</p>",
  },
  {
    question: 'How long until we get our photos?',
    answer: '<p>Your private online gallery is delivered within 5 days of the session.</p>',
  },
  {
    question: "What's the difference between a Mini and a Standard session?",
    answer:
      '<p>A Mini Session is 30 minutes at a single location with 15+ edited images. A Standard Session is 60 minutes with 25+ edited images — better suited to larger families, multiple locations, or more time to relax into it.</p>',
  },
  {
    question: 'Where do you shoot?',
    answer:
      '<p>The New York tri-state area — your neighborhood, a park you love, or your home. If you have a spot in mind, that usually makes for the best session.</p>',
  },
];
