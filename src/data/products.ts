import { Product } from "@/lib/types";

/**
 * Seed catalog. This is the single source of truth the whole UI renders from.
 * Swap this for a fetch() to a real API/JSON endpoint without touching components —
 * every component consumes the `Product[]` shape only.
 *
 * NOTE: exact copy/prices were approximated from the provided screenshots.
 * Pull final values from the Figma file (Inspect panel) before shipping.
 */
export const PRODUCTS: Product[] = [
  // ---------------- STEP 1: CAMERAS ----------------
  {
    id: "wyze-cam-v4",
    step: "cameras",
    category: "Cameras",
    title: "Wyze Cam v4",
    description: "The cheapest Wyze Cam ever made.",
    image: "/products/cam-v4-white.png",
    learnMoreUrl: "#",
    badge: "Save 20%",
    compareAtPrice: 35.98,
    price: 27.98,
    hasControl: true,
    variants: [
      {
        id: "wyze-cam-v4:white",
        label: "White",
        image: "/products/cam-v4-white.png",
        qty: 1,
      },
      {
        id: "wyze-cam-v4:grey",
        label: "Grey",
        image: "/products/cam-v4-grey.png",
        qty: 1,
      },
      {
        id: "wyze-cam-v4:black",
        label: "Black",
        image: "/products/cam-v4-black.png",
        qty: 0,
      },
    ],
  },
  {
    id: "wyze-cam-pan-v3",
    step: "cameras",
    category: "Cameras",
    title: "Wyze Cam Pan v3",
    description: "360° pan and 180° tilt with security camera.",
    image: "/products/cam-pan-v3.png",
    learnMoreUrl: "#",
    badge: "Save 15%",
    compareAtPrice: 39.98,
    price: 33.98,
    hasControl: true,
    variants: [
      {
        id: "wyze-cam-pan-v3:white",
        label: "White",
        image: "/products/cam-pan-v3-white.png",
        qty: 0,
      },
      {
        id: "wyze-cam-pan-v3:black",
        label: "Black",
        image: "/products/cam-pan-v3-black.png",
        qty: 0,
      },
    ],
  },
  {
    id: "wyze-cam-floodlight-v2",
    step: "cameras",
    category: "Cameras",
    title: "Wyze Cam Floodlight v2",
    description: "2K floodlight camera with a 180°-angle view for your garage.",
    image: "/products/floodlight-white.png",
    learnMoreUrl: "#",
    badge: "Save 20%",
    compareAtPrice: 99.98,
    price: 79.98,
    hasControl: true,
    variants: [
      {
        id: "wyze-cam-floodlight-v2:white",
        label: "White",
        image: "/products/cam-floodlight-white.png",
        qty: 0,
      },
      {
        id: "wyze-cam-floodlight-v2:black",
        label: "Black",
        image: "/products/cam-floodlight-black.png",
        qty: 0,
      },
    ],
  },
  {
    id: "wyze-duo-cam-doorbell",
    step: "cameras",
    category: "Cameras",
    title: "Wyze Duo Cam Doorbell",
    description: "Two cameras. See everything at the door. Double the porch protection.",
    image: "/products/duo-cam-doorbell.png",
    learnMoreUrl: "#",
    price: 69.98,
    hasControl: true,
    qty: 0,
  },
  {
    id: "wyze-battery-cam-pro",
    step: "cameras",
    category: "Cameras",
    title: "Wyze Battery Cam Pro",
    description:
      "Protect anywhere. See everything in 2.5K HDR. No power outlet or electrician needed.",
    image: "/products/battery-cam-pro-white.png",
    learnMoreUrl: "#",
    price: 89.98,
    hasControl: true,
    variants: [
      {
        id: "wyze-battery-cam-pro:white",
        label: "White",
        image: "/products/battery-cam-pro-white.png",
        qty: 0,
      },
      {
        id: "wyze-battery-cam-pro:black",
        label: "Black",
        image: "/products/battery-cam-pro-black.png",
        qty: 0,
      },
    ],
  },

  // ---------------- STEP 2: PLAN ----------------
  {
    id: "cam-unlimited",
    step: "plan",
    category: "Plan",
    title: "Cam Unlimited",
    description: "Unlimited cloud storage for every camera on your account.",
    image: "/products/plan-badge3.svg",
    price: 9.99,
    compareAtPrice: 19.99,
    priceSuffix: "/mo",
    hasControl: true,
    qty: 1,
  },

  // ---------------- STEP 3: SENSORS ----------------
  {
    id: "wyze-sense-motion-sensor",
    step: "sensors",
    category: "Sensors",
    title: "Wyze Sense Motion Sensor",
    description: "Detect motion in any room and get an instant alert.",
    image: "/products/motion-sensor.png",
    price: 19.98,
    compareAtPrice: 25.98,
    hasControl: true,
    qty: 1,
  },
  {
    id: "wyze-sense-hub",
    step: "sensors",
    category: "Sensors",
    title: "Wyze Sense Hub (Required)",
    description: "The brains of your sensor network. Required for sensors to work.",
    image: "/products/sense-hub.png",
    price: 29.92,
    freeLabel: "FREE",
    hasControl: false, // pre-populated, no add-control in this view
    qty: 1,
  },

  // ---------------- STEP 4: PROTECTION ----------------
  {
    id: "wyze-microsd-256",
    step: "protection",
    category: "Accessories",
    title: "Wyze MicroSD Card (256GB)",
    description: "Local backup storage for your cameras, no subscription required.",
    image: "/products/microsd.png",
    price: 34.98,
    compareAtPrice: 44.98,
    hasControl: true, // pre-populated, no add-control in this view
    qty: 1,
  },
];

export const SHIPPING = {
  label: "Fast Shipping",
  compareAtPrice: 5.99,
  price: 0,
  freeLabel: "FREE",
};


export const FINANCING = {
  label: "as low as $19.19/mo",
  provider: "Affirm",
};
