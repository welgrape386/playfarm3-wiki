import { createBrowserRouter } from "react-router";
import { Root } from "./layouts/Root";
import { Home } from "./pages/Home";
import { Cooking } from "./pages/Cooking";
import { Fishing } from "./pages/Fishing";
import { Mining } from "./pages/Mining";
import { Dungeon } from "./pages/Dungeon";
import { Lifestyle } from "./pages/Lifestyle";
import { Island } from "./pages/Island";
import { Costume } from "./pages/Costume";
import { Pet } from "./pages/Pet";
import { Help } from "./pages/Help";
import { MarketPrice } from "./pages/MarketPrice";
import { MinimumWage } from "./pages/MinimumWage";
import { Calculator } from "./pages/Calculator";
import { CookingCalculator } from "./pages/CookingCalculator";
import { Guide } from "./pages/Guide";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "cooking", Component: Cooking },
      { path: "fishing", Component: Fishing },
      { path: "mining", Component: Mining },
      { path: "dungeon", Component: Dungeon },
      { path: "lifestyle", Component: Lifestyle },
      { path: "lifestyle/island", Component: Island },
      { path: "lifestyle/costume", Component: Costume },
      { path: "lifestyle/pet", Component: Pet },
      { path: "help", Component: Help },
      { path: "market-price", Component: MarketPrice },
      { path: "minimum-wage", Component: MinimumWage },
      { path: "calculator", Component: Calculator },
      { path: "cooking-calc", Component: CookingCalculator },
      { path: "guide", Component: Guide },
    ],
  },
]);