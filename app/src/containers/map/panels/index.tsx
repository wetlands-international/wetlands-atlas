"use client";

import { PropsWithChildren, Suspense, useState } from "react";

import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { LuChevronUp } from "react-icons/lu";
import { useMediaQuery } from "usehooks-ts";

import {
  locationsAtom,
  useSyncInsight,
  useSyncRegion,
} from "@/app/(frontend)/[locale]/(app)/store";

import { useCategories } from "@/hooks/use-categories";
import { useRegions } from "@/hooks/use-regions";

import { Loader } from "@/components/ui/loader";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const RegionName = () => {
  const [region] = useSyncRegion();
  const { data: regionsData } = useRegions();

  return regionsData.docs.find(({ id }) => id === region)?.name;
};

const CategoryName = () => {
  const [region] = useSyncRegion();
  const [insight] = useSyncInsight();
  const { data: categoriesData } = useCategories(region);

  return categoriesData.docs.find(({ id }) => id === insight)?.name;
};

/** The step the user is at: the regions, a region's categories, or a category's indicators */
const PanelsTitle = () => {
  const t = useTranslations("insights");
  const [region] = useSyncRegion();
  const [insight] = useSyncInsight();

  if (region && insight) {
    return <CategoryName />;
  }

  if (region) {
    return <RegionName />;
  }

  return t("title");
};

/**
 * The panels of the insights page: the regions, the categories and the indicators. In the page's sidebar on the large
 * screens. On the small ones, the map takes the whole screen and they're in a bottom sheet, which a bar with the
 * current step opens.
 */
export const MapPanels = ({ children }: PropsWithChildren) => {
  // Like the server's render, which can't know the screen's size: the sidebar
  const isDesktop = useMediaQuery("(min-width: 64rem)", {
    defaultValue: true,
    initializeWithValue: false,
  });
  const [open, setOpen] = useState(false);
  const { enabled: isSearching } = useAtomValue(locationsAtom);

  // While a region's categories load, only the panels wait: not the sheet, which would close and open again
  const panels = (
    <Suspense
      fallback={
        <div className="relative h-24">
          <Loader isLoading />
        </div>
      }
    >
      {children}
    </Suspense>
  );

  if (isDesktop) {
    // Hidden on the small screens until the sheet replaces them, after the hydration
    return <div className="hidden lg:contents">{panels}</div>;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* The search's results replace the panels while it's open */}
      {!isSearching && (
        <SheetTrigger asChild>
          <button
            type="button"
            // Above Mapbox's logo and attribution button, and below the legend's button
            className="bg-background fixed right-4 bottom-12 left-4 z-10 flex h-12 cursor-pointer items-center justify-between gap-2 rounded-4xl px-6 text-left shadow-lg"
          >
            <span className="font-display truncate text-xl text-blue-300">
              <Suspense>
                <PanelsTitle />
              </Suspense>
            </span>
            <LuChevronUp className="size-5 shrink-0" aria-hidden />
          </button>
        </SheetTrigger>
      )}

      <SheetContent
        side="bottom"
        // Without padding at the top, for the category's cover to reach the edge of the sheet. Always as high, for its
        // content not to resize it while the next step loads.
        className="h-[calc(100svh-5rem)] gap-0 rounded-t-4xl border-0"
        aria-describedby={undefined}
      >
        <SheetTitle className="sr-only">
          <Suspense>
            <PanelsTitle />
          </Suspense>
        </SheetTitle>
        {panels}
      </SheetContent>
    </Sheet>
  );
};
