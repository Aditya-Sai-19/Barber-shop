export interface Product {
    id: string;
    name: string;
    category: "Pro Tools" | "Styling" | "Cosmetics" | "Essentials";
    price: number;
    description: string;
    features: string[];
    image: string; // Placeholder for now
}

export const PRODUCTS: Product[] = [
    {
        id: "clipper-pro-x1",
        name: "STEALTH CLIPPER X1",
        category: "Pro Tools",
        price: 249.00,
        description: "Engineered for zero-gap precision. The Stealth X1 features a high-torque brushless motor and DLC-coated blades that stay cool during all-day use.",
        features: ["7200 RPM Digital Motor", "DLC Zero-Gap Blade", "4-Hour Runtime", "Ergonomic Aluminium Body"],
        image: "/Frames/ezgif-frame-045.png" // Reusing a high-quality frame from the sequence as a "product shot"
    },
    {
        id: "shear-master-7",
        name: "KATANA SHEAR 7.0",
        category: "Pro Tools",
        price: 399.00,
        description: "Hand-forged Japanese V-10 steel. Razor-sharp convex edge for effortless slide cutting and texturizing.",
        features: ["V-10 Cobalt Alloy", "Offset Handle", "Ball Bearing Tension", "Lifetime Warranty"],
        image: "/Frames/ezgif-frame-080.png"
    },
    {
        id: "trimmer-detail-z",
        name: "DETAIL Z-TRIMMER",
        category: "Pro Tools",
        price: 189.00,
        description: "The ultimate outlining tool. 360-degree exposed T-blade for total visibility and surgical lines.",
        features: ["Exposed T-Blade", "Whisper Quiet Motor", "USB-C Charging", "Skeleton Design"],
        image: "/Frames/ezgif-frame-065.png"
    },
    {
        id: "pomade-matte-clay",
        name: "STRUCTURE MATTE CLAY",
        category: "Styling",
        price: 28.00,
        description: "Strong hold with a natural matte finish. Water-soluble formula that washes out easily but holds all day.",
        features: ["Strong Hold / Matte Finish", "Water Based", "Sandalwood Scent", "No Flaking"],
        image: "/Frames/ezgif-frame-120.png"
    },
    {
        id: "powder-volume-boost",
        name: "VOLUME DUST",
        category: "Styling",
        price: 24.00,
        description: "Instant lift and texture. A weightless powder that transforms fine hair into thick, reworkable styles.",
        features: ["Instant Volume", "Matte Texture", "Gravity Defying", "Pump Dispenser"],
        image: "/Frames/ezgif-frame-125.png"
    },
    {
        id: "aftershave-tonic",
        name: "RECOVERY TONIC",
        category: "Cosmetics",
        price: 32.00,
        description: "Soothes and tightens pores after a close shave. Infused with witch hazel and aloe vera.",
        features: ["Alcohol-Free", "Cooling Effect", "Anti-Inflammatory", "Vintage Scent"],
        image: "/Frames/ezgif-frame-145.png"
    },
    {
        id: "beard-oil-elixir",
        name: "BEARD ELIXIR",
        category: "Cosmetics",
        price: 35.00,
        description: "Nourishes the skin and softens the beard. A premium blend of argan, jojoba, and grapeseed oils.",
        features: ["Comparison Blend", "Softens Coarse Hair", "Prevents Itch", "Woody Notes"],
        image: "/Frames/ezgif-frame-150.png"
    },
    {
        id: "cape-pro-black",
        name: "SILHOUETTE CAPE",
        category: "Essentials",
        price: 45.00,
        description: "Water-resistant, static-free, and oversized. The standard for professional barbershops.",
        features: ["Neoprene Neck Seal", "Water Resistant", "Static Free", "Extra Large Size"],
        image: "/Frames/ezgif-frame-010.png"
    }
];
