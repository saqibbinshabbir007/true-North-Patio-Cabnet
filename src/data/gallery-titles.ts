// Premium titles per category — client examples + variations for outdoor kitchen gallery
const TITLES: Record<string, string[]> = {
  Outdoor_Kitchen: [
    "Modern Backyard Kitchen – Calgary",
    "Full Outdoor Kitchen Installation",
    "Luxury Backyard Kitchen",
    "Outdoor Kitchen – Custom Design",
    "Complete Outdoor Kitchen Setup",
    "Premium Outdoor Kitchen",
    "Custom Outdoor Kitchen Installation",
    "Outdoor Kitchen with Grill Station",
  ],
  corner_kitchen: [
    "Corner Outdoor Kitchen Setup",
    "Corner Kitchen Installation",
    "L-Shaped Outdoor Kitchen",
    "Corner Cabinet Installation",
    "Space-Saving Corner Kitchen",
    "Corner Grill Station Setup",
  ],
  grill_station: [
    "Aluminum Cabinet Grill Station",
    "Grill Station Installation",
    "Built-in Grill Station",
    "Custom Grill Station Setup",
    "Premium Aluminum Grill Cabinet",
  ],
  Patio: [
    "Patio Cooking Area",
    "Patio Installation – Backyard",
    "Patio with Outdoor Kitchen",
    "Entertainment Patio Setup",
    "Luxury Patio Installation",
    "Backyard Patio – Alberta",
  ],
};

export const getGalleryTitle = (path: string, indexInCategory: number): string => {
  const match = path.match(/\/Gallery\/([^/]+)\//);
  const category = match ? match[1] : "";
  const titles = TITLES[category];
  if (!titles) return "Outdoor Cabinet Installation";
  return titles[indexInCategory % titles.length];
};
