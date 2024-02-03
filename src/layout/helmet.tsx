import { useLocation } from "@gatsbyjs/reach-router";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet as ReactHelmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Event, WithContext } from "schema-dts";
import { MENU } from "../navbar-menu";

export const Helmet: React.FC = () => {
  const { t } = useTranslation();
  const { pathname, href } = useLocation();

  const helmet = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          title
          image
        }
      }
    }
  `);

  const path = pathname.replace(/\/(fr|en)/, "");
  const pageTitle = MENU.find((menu) => path === menu.link)?.label;
  const title =
    pageTitle && path !== "/" ? t(`pages.${pageTitle}.name`) : "Devfest Nantes";

  const socialImage =
    helmet.site.siteMetadata.siteUrl + helmet.site.siteMetadata.image;

  const description = t("site.description");

  const eventGoogleData: WithContext<Event> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Devfest Nantes 2024",
    startDate: "2024-10-17T08:30+02:00",
    endDate: "2024-10-18T19:00+02:00",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Cité des congrès",
      address: {
        "@type": "PostalAddress",
        streetAddress: "5 rue de Valmy",
        addressLocality: "Nantes",
        postalCode: "44200",
        addressRegion: "Loire-Atlantique",
        addressCountry: "FR",
      },
    },
    performer: "90+ speakers",
    image: ["https://devfest2024.gdgnantes.com/images/social-share.jpg"],
    description,
    offers: {
      "@type": "Offer",
      url: "https://tickets.gdgnantes.com/",
      availability: "https://schema.org/LimitedAvailability",
      availabilityStarts: "2024-10-10T10:10+02:00",
      price: 99,
      priceCurrency: "EUR",
      validFrom: "2024-10-17T08:30+02:00",
    },
    organizer: {
      "@type": "Organization",
      name: "GDG Nantes",
      url: "https://gdgnantes.com",
    },
  };

  return (
    <ReactHelmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={helmet.site.siteMetadata.siteUrl} />
      <meta name="image" property="og:image" content={socialImage} />
      <meta property="og:site_name" content={helmet.site.siteMetadata.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <script type="application/ld+json">
        {JSON.stringify(eventGoogleData)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: helmet.site.siteMetadata.title,
          url: helmet.site.siteMetadata.siteUrl,
          description,
        })}
      </script>
      <script src="/scripts/redirect-language.js" />
    </ReactHelmet>
  );
};
