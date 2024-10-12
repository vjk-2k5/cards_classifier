import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils"; // Assuming this is your utility function for classNames

const sections = [
  {
    title: "Getting Started",
    content: [
      {
        title: "Upload a Card",
        description: "Begin by uploading an image of the card you want to classify.",
      },
      {
        title: "Supported Card Types",
        description: "We support a variety of card types including playing cards, ID cards, business cards, and more.",
      },
      {
        title: "Processing Time",
        description: "Once you upload an image, it typically takes a few seconds to process and classify the card.",
      },
    ],
  },
  {
    title: "About Us",
    content: [
      {
        title: "Our Mission",
        description: "We aim to simplify card recognition through AI and advanced image processing technology.",
      },
      {
        title: "Technology",
        description: "Our system leverages deep learning models and computer vision to provide accurate card classifications.",
      },
      {
        title: "Vision",
        description: "Our vision is to expand card classification capabilities across various industries.",
      },
    ],
  },
  {
    title: "Follow Us",
    content: [
      {
        title: "Social Media",
        description: "Stay updated with our latest developments by following us on Twitter, LinkedIn, and Instagram.",
      },
      {
        title: "Newsletter",
        description: "Subscribe to our newsletter for regular updates on new features and advancements.",
      },
      {
        title: "Community",
        description: "Join our community forum to engage with other users and share feedback.",
      },
    ],
  },
];

export const MainNavBar = () => {
  return (<>


        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            {sections.map((section) => (
              <NavigationMenuItem key={section.title}>
                <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <div className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                          <div className="mb-2 mt-4 text-lg font-medium">
                            {section.title}
                          </div>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    {section.content.map((item, index) => (
                      <ListItem key={index} title={item.title}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        </>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <div
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </div>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default MainNavBar;
