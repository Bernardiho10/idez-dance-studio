import { ServiceItem, CreativeDirectionOption, VideoShowcaseItem, PhotoGalleryItem } from '../types';

/**
 * iDez Entertainment Rate Cards — Derived directly from official rate cards & T&Cs.
 * Rates in Nigerian Naira (₦). Base location: Abuja, Nigeria.
 */

export const CORPORATE_SERVICES: ServiceItem[] = [
  {
    id: 'corp-perf-exp',
    category: 'corporate',
    title: 'Corporate Performance Experience',
    subtitle: 'Elevate your corporate event atmosphere',
    startingPrice: 1500000,
    priceFormatted: 'From ₦1,500,000',
    description: 'Professionally curated dance performances designed to entertain guests, elevate the event atmosphere, and create memorable audience experiences.',
    idealFor: [
      'Gala Dinners',
      'Award Ceremonies',
      'End-of-Year Parties',
      'Executive Celebrations',
      'Corporate Anniversaries'
    ],
    highlight: true,
  },
  {
    id: 'corp-brand-themed',
    category: 'corporate',
    title: 'Brand-Themed Performance Production',
    subtitle: 'Bespoke storytelling aligned to your brand',
    startingPrice: 2500000,
    priceFormatted: 'From ₦2,500,000',
    description: 'A bespoke performance designed around your organization\'s theme, campaign, values, or event objective.',
    includes: [
      'Concept Development',
      'Custom Choreography',
      'Music Editing & Sound Curation',
      'Performance Direction',
      'Rehearsal Management',
      'Brand Integration'
    ],
    idealFor: [
      'Product Launches',
      'Brand Activations',
      'Corporate Conferences',
      'Marketing Campaigns',
      'High-Profile Executive Events'
    ],
    highlight: true,
  },
  {
    id: 'corp-team-building',
    category: 'corporate',
    title: 'Team-Building Dance Workshop',
    subtitle: 'Interactive movement & staff connection',
    startingPrice: 500000,
    priceFormatted: 'From ₦500,000',
    description: 'Interactive movement and dance sessions designed to encourage teamwork, confidence, creativity, communication, and employee engagement.',
    idealFor: [
      'Corporate Retreats',
      'Team Building Events',
      'Leadership Programmes',
      'Staff Wellness Initiatives'
    ],
  },
];

export const WEDDING_SERVICES: ServiceItem[] = [
  {
    id: 'wed-signature-package',
    category: 'wedding',
    title: 'Signature Wedding Dance Experience Package',
    subtitle: 'All-inclusive grand wedding production',
    startingPrice: 1500000,
    priceFormatted: 'From ₦1,500,000',
    description: 'The ultimate wedding celebration package. Complete choreography and live dancers for your entrance, first dance, bridal party, and full event-day coordination.',
    includes: [
      'Couples\' Grand Entrance & Dance',
      'Bridal Train Choreography & Entrance',
      'Bespoke Dance Performance by iDez Troupe',
      'Event-Day Coordination & Supervision'
    ],
    highlight: true,
  },
  {
    id: 'wed-entrance-dancers',
    category: 'wedding',
    title: 'Bride / Groom Entrance with Dancers',
    subtitle: 'Electrifying entrance with professional dancers',
    startingPrice: 500000,
    priceFormatted: 'From ₦500,000',
    description: 'High-energy royal welcome or grand entrance performance flanking the bride, groom, or both with costume-clad dancers.',
    idealFor: ['Reception Entry', 'Traditional Wedding Grand Entry'],
  },
  {
    id: 'wed-first-dance',
    category: 'wedding',
    title: 'Couple’s First Dance',
    subtitle: 'Intimate, effortless, & memorable',
    startingPrice: 300000,
    priceFormatted: 'From ₦300,000',
    description: 'Tailored private training and bespoke choreography for the couple to shine effortlessly on the dance floor.',
    idealFor: ['Romantic Slow Dance', 'Surprise Mashup / Transition Dance'],
  },
  {
    id: 'wed-bridal-train',
    category: 'wedding',
    title: 'Bridal Train Entrance',
    subtitle: 'Synchronized squad choreography',
    startingPrice: 300000,
    priceFormatted: 'From ₦300,000',
    description: 'Fun, coordinated, and photogenic dance routines for bridesmaids and groomsmen.',
    idealFor: ['Bridal Party Entrance', 'Reception Opening Hype'],
  },
];

export const DANCE_TRAINING_SERVICES: ServiceItem[] = [
  {
    id: 'train-private-1hr',
    category: 'training',
    title: 'Private Session (1 Hour)',
    subtitle: 'One-on-one personal coaching',
    startingPrice: 50000,
    priceFormatted: 'From ₦50,000',
    durationMinutes: 60,
    description: 'Intensive 1-hour personalized instruction with our senior choreographers at the studio or your chosen private space.',
  },
  {
    id: 'train-package-4',
    category: 'training',
    title: '4-Session Package',
    subtitle: 'Foundation & skill development',
    startingPrice: 180000,
    priceFormatted: '₦180,000 – ₦350,000',
    priceNote: 'Starting at ₦180k (varies based on level & instructor)',
    description: 'A 4-session structured program designed to build confidence, rhythm, and stage presence.',
  },
  {
    id: 'train-package-8',
    category: 'training',
    title: '8-Session Package',
    subtitle: 'Complete dance mastery & routine polish',
    startingPrice: 350000,
    priceFormatted: '₦350,000 – ₦700,000',
    priceNote: 'Starting at ₦350k (comprehensive training)',
    description: 'In-depth 8-session training module covering advanced choreography, stamina, performance styling, and video recording.',
    highlight: true,
  },
  {
    id: 'train-group',
    category: 'training',
    title: 'Group Training',
    subtitle: 'Community, group energy, and fitness',
    startingPrice: 300000,
    priceFormatted: '₦300,000 – ₦800,000',
    priceNote: 'Starting at ₦300k',
    description: 'Energizing group dance masterclasses for friends, corporate departments, church groups, or fitness circles.',
  },
];

export const PERFORMERS_SERVICES: ServiceItem[] = [
  {
    id: 'perf-animation',
    category: 'performers',
    title: 'Dance Animation & Crowd Hype',
    subtitle: 'Engaging guests directly on the floor',
    startingPrice: 350000,
    priceFormatted: 'From ₦350,000',
    description: 'High-energy party starters and animators who get the entire crowd dancing and interacting.',
  },
  {
    id: 'perf-solo',
    category: 'performers',
    title: 'Solo Performance',
    subtitle: 'Spotlight feature act',
    startingPrice: 400000,
    priceFormatted: 'From ₦400,000',
    description: 'A dedicated solo artist or specialty act curated for focused spotlight moments.',
  },
  {
    id: 'perf-duo',
    category: 'performers',
    title: 'Duo Performance',
    subtitle: 'Synchronized partner spectacle',
    startingPrice: 700000,
    priceFormatted: 'From ₦700,000',
    description: 'Dynamic two-dancer synchronized routine tailored to your event soundtrack and style.',
  },
  {
    id: 'perf-group',
    category: 'performers',
    title: 'Group Performance (3–5 Dancers)',
    subtitle: 'Balanced stage presence & choreography',
    startingPrice: 500000,
    priceFormatted: '₦500,000 – ₦900,000',
    description: 'Our most popular setup for mid-sized stage shows, cultural showcases, and celebration peaks.',
    highlight: true,
  },
  {
    id: 'perf-troupe',
    category: 'performers',
    title: 'Troupe Performance (More than 6 Dancers)',
    subtitle: 'Full-scale stage production',
    startingPrice: 1000000,
    priceFormatted: 'From ₦1,000,000',
    description: 'Full theatrical production with 6+ dancers, stilt walkers, masquerades, or carnival spectacles.',
  },
];

export const CREATIVE_DIRECTION_OPTIONS: CreativeDirectionOption[] = [
  {
    id: 'none',
    title: 'No Extra Creative Direction',
    price: 0,
    priceFormatted: '₦0',
    description: 'Standard performance using established studio concepts and routines.',
    deliverables: ['Existing routine performance', 'Basic stage coordination'],
  },
  {
    id: 'lite',
    title: 'Creative Direction Lite',
    price: 350000,
    priceFormatted: '+₦350,000',
    description: 'Custom adaptation of our proven concepts specifically matched to your event.',
    deliverables: [
      'Adaptation of an existing performance concept',
      'Choreography customization for your event',
      'Styling and costume selection from existing collections',
      'Event day coordination'
    ],
  },
  {
    id: 'full',
    title: 'Full Creative Direction',
    price: 500000,
    priceFormatted: '+₦500,000',
    description: 'End-to-end original artistic production crafted exclusively for your brand or wedding.',
    deliverables: [
      'Original concept development',
      'Bespoke choreography built from scratch',
      'Music curation & audio editing',
      'Performance design & staging layout',
      'Creative supervision from rehearsal to live execution'
    ],
  },
];

export const ALL_SERVICES: ServiceItem[] = [
  ...CORPORATE_SERVICES,
  ...WEDDING_SERVICES,
  ...DANCE_TRAINING_SERVICES,
  ...PERFORMERS_SERVICES,
];

/**
 * Terms and Conditions Rules as stated in iDez official documents:
 */
export const TERMS_AND_CONDITIONS = {
  depositRequirement: '70% non-refundable deposit required to lock in dates.',
  balanceTiming: 'Balance is strictly payable before event date.',
  outsideAbuja: 'Events outside Abuja attract separate transportation, accommodation, and logistics charges.',
  rushFeePolicy: 'Projects requiring delivery within 7 days attract a 20%–50% rush fee.',
  customCostumes: 'Custom costumes, specialty props, and themed wardrobe requirements are quoted separately.',
  premiumDates: 'Premium and peak holiday dates attract higher rates.',
  pricingNote: 'Prices listed are starting rates and may vary based on exact event scope and requirements.',
};

/**
 * Video Showcase Data (Marketing Centerpiece)
 */
export const VIDEO_SHOWCASE_ITEMS: VideoShowcaseItem[] = [
  {
    id: 'vid-1',
    title: 'The Royal Wedding Entrance',
    category: 'wedding',
    duration: '2:14',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-dancing-at-a-party-41480-large.mp4',
    description: 'Breathtaking entrance with 6 synchronized iDez dancers accompanying the bride and groom into a packed Abuja ballroom.',
    highlights: ['Synchronized royal choreography', 'Custom regal costumes', 'Full audience hype'],
  },
  {
    id: 'vid-2',
    title: 'Corporate Gala Stage Spectacle',
    category: 'corporate',
    duration: '3:05',
    thumbnail: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-stage-lights-during-a-concert-performance-41584-large.mp4',
    description: 'Brand-themed theatrical performance opening the Annual Bankers Dinner at the Transcorp Hilton, Abuja.',
    highlights: ['Bespoke music mix', 'Lighting synchronization', 'Brand story integration'],
  },
  {
    id: 'vid-3',
    title: 'Couple\'s First Dance Surprise Mashup',
    category: 'wedding',
    duration: '1:48',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-couple-dancing-slowly-in-a-hall-42792-large.mp4',
    description: 'From a tender waltz into high-energy Afrobeats! Trained by iDez instructors in 4 private sessions.',
    highlights: ['Zero dance experience to pro', 'Crowd erupting moment', 'Flawless transition'],
  },
  {
    id: 'vid-4',
    title: 'Carnival & Stilt Walkers Showcase',
    category: 'performers',
    duration: '2:30',
    thumbnail: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-people-celebrating-at-a-carnival-parade-42510-large.mp4',
    description: 'Colourful masquerades, stilt walkers, and carnival-style cultural entertainment for an outdoor festival.',
    highlights: ['Intricate cultural costumes', 'Towering stilt acrobats', 'High guest engagement'],
  },
  {
    id: 'vid-5',
    title: 'Studio Rehearsal & Team Workshop',
    category: 'training',
    duration: '1:55',
    thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-group-of-dancers-practicing-in-a-studio-41484-large.mp4',
    description: 'A peek behind the scenes: corporate team building workshop and private rehearsal sessions in our studio.',
    highlights: ['Confidence building', 'Team coordination', 'Sweat & fun'],
  },
];

/**
 * Photo Gallery Items (Visual Spectacle)
 */
export const PHOTO_GALLERY_ITEMS: PhotoGalleryItem[] = [
  {
    id: 'photo-1',
    title: 'Regal Wedding Reception Entrance',
    category: 'wedding',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    caption: 'Leading the bride and groom with custom gold and white outfits at International Conference Centre, Abuja.',
  },
  {
    id: 'photo-2',
    title: 'Corporate Awards Opening Act',
    category: 'corporate',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
    caption: 'High-octane opening performance setting the tempo for the evening.',
  },
  {
    id: 'photo-3',
    title: 'First Dance Chemistry',
    category: 'wedding',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    caption: 'Graceful lift choreographed across 4 intensive studio sessions.',
  },
  {
    id: 'photo-4',
    title: 'Cultural Heritage Performance',
    category: 'performers',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80',
    caption: 'Authentic traditional dance presentation celebrating rich Nigerian culture.',
  },
  {
    id: 'photo-5',
    title: 'Bridal Train Formation',
    category: 'wedding',
    imageUrl: 'https://images.unsplash.com/photo-1546707012-c46675f12716?auto=format&fit=crop&w=1000&q=80',
    caption: 'Coordinated squad routine adding maximum joy to the reception dance floor.',
  },
  {
    id: 'photo-6',
    title: 'Studio Rehearsal Masterclass',
    category: 'training',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80',
    caption: 'Private training session with our head choreographer in Abuja studio.',
  },
];
