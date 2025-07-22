import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const initializeSiteConfig = async () => {
  try {
    // Check if the site configuration already exists
    const existingConfig = await prisma.site_config.findFirst();
    if (!existingConfig) {
        // Create the initial site configuration
        await prisma.site_config.create({
            data: {
                
                    categories: [
                      "Agricultural Raw Materials",
                      "Forestry Products",
                      "Minerals & Metals",
                      "Energy & Fuels",
                      "Chemical Raw Materials",
                      "Textile Raw Materials",
                      "Construction Raw Materials",
                      "Animal Products (Non-Food Grade)",
                      "Plant Extracts & Bio-materials",
                      "Food-Grade Raw Materials"
                    ],
                    subCategories: {
                        "Agricultural Raw Materials": [
                            "Grains & Cereals",
                            "Oilseeds & Pulses",
                            "Fruits & Vegetables",
                            "Sugar & Sweeteners",
                            "Spices & Herbs"
                        ],
                        "Forestry Products": [
                            "Lumber & Timber",
                            "Pulp & Paper",
                            "Wood Pellets",
                            "Bamboo Products"
                        ],
                        "Minerals & Metals": [
                            "Metals (Iron, Copper, Aluminum)",
                            "Minerals (Salt, Gypsum, Limestone)",
                            "Precious Metals (Gold, Silver)"
                        ],
                        "Energy & Fuels": [
                            "Crude Oil & Petroleum Products",
                            "Natural Gas",
                            "Coal",
                            "Renewable Energy Sources"
                        ],
                        "Chemical Raw Materials": [
                            "Basic Chemicals (Acids, Alkalis)",
                            "Polymers & Plastics",
                            "Fertilizers & Agrochemicals"
                        ],
                        "Textile Raw Materials": [
                            "Cotton & Natural Fibers",
                            "Synthetic Fibers (Polyester, Nylon)",
                            "Dyes & Chemicals"
                        ],
                        "Construction Raw Materials": [
                            "Cement & Concrete",
                            "Aggregates (Sand, Gravel)",
                            "Steel Reinforcement"
                        ],
                        "Animal Products (Non-Food Grade)": [
                            "Leather & Hides",
                            "Wool & Animal Fibers"
                        ],
                        "Plant Extracts & Bio-materials": [
                            "Essential Oils",
                            "Herbal Extracts"
                        ],
                        "Food-Grade Raw Materials": [
                            "Food Additives",
                            "Preservatives"
                        ]
                    }
            }
        });
    }
                  
    
  } catch (error) {
    console.error('Error initializing site configuration:', error);
  } 
}

export default initializeSiteConfig;