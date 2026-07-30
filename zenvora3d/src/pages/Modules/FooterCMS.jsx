import React from 'react';
import { PageShellContainer } from '../../components/PageShellContainer';

export const FooterCMS = () => {
  const footerRoadmap = [
    { title: 'Footer Brand Description', key: 'brandDescription' },
    { title: 'Quick Links & Column Headers', key: 'columnHeaders' },
    { title: 'Social Media Links & Handles', key: 'socialLinks' },
    { title: 'Copyright Notice & Legal Disclaimer', key: 'copyrightText' }
  ];

  return (
    <PageShellContainer
      pageTitle="Footer Global Section"
      pageSlug="#footer"
      pageKey="footer_cms"
      sectionsRoadmap={footerRoadmap}
    />
  );
};
